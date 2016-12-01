const AWS = require('aws-sdk');
const moment = require('moment');
const BlueBirdPromise = require('bluebird');
const __ = require('lodash');

AWS.config.setPromisesDependency(BlueBirdPromise);

class VpcClient {

  constructor(accessKey = '', secretKey = '', region = 'us-west-2') {

    this._accessKey = accessKey;
    this._secretKey = secretKey;
    this._region = region;
  }

  get _awsEc2Client() {

    if(!this._internalEc2Client) {
      let params = {
        accessKeyId: this._accessKey,
        secretAccessKey: this._secretKey,
        apiVersion: '2016-09-15',
        region: this._region
      };
      this._internalEc2Client = new AWS.EC2(params);
    }

    return this._internalEc2Client;
  }

  /**
   * Creates a VPC from a custom configuration JSON object
   * {
   *  name: <name of VPC>,
   *  cidrBlock: <this is a string of the cidrblock that represents the VPC>,
   *  subnets: [
   *    {
   *      name: <name of subnet>,
   *      availabilityZone: <string>,
   *      mapPublicIpOnLaunch: true | false
   *      cidrBlock: <this is a string of the cidrblock that represents the subnet>
   *    },
   *    ...
   *  ],
   *  networkAcls: [
   *    {
   *      name: <name of the network ACL>,
   *      rules: [
   *        {
   *        cidrBlock: '',
   *        egress: true | false,
   *        protocol: TCP | UDP | -1 (all protocols) ,
   *        ruleAction: 'allow' | 'deny',
   *        ruleNumber: a number 0 < x < big number?
   *        }
   *      ]
   *  ]
   * }
   * @param config
   */
  createVpcFromConfig(environment, config) {
    this.logMessage(`Executing createVpcFromConfig. [Environment: ${environment}] [Config: ${JSON.stringify(config)}]`);

    return this.getVpcIdFromName(config.name).then(existingVpcId => {
      if(existingVpcId) {
        this.logMessage(`Vpc already created.  Taking no action. [VpcName: ${config.name}] [ExistingVpcId: ${existingVpcId}]`);
        return existingVpcId;
      }
      else {
        let vpcId = '';
        let internetGatewayId = '';
        let subnetIds = [];
        let networkAclNameToIdLookup = {};
        let subnetNameToIdLookup = {};
        return this.createVpc(config.name, environment, config.cidrBlock).then(createdVpcId => {
          vpcId = createdVpcId;

          return;
        }).then(() => {
          let createNetworkAclPromises = [];

          //generates a function that takes the networkAclName
          let assignNetworkAclToLookup = (networkAclName) => {
            return (createdNetworkAclId) => {
              networkAclNameToIdLookup[networkAclName] = createdNetworkAclId;
            };
          };

          this.logMessage('Creating NetworkACLs');
          for(let networkAclIndex = 0; networkAclIndex < config.networkAcls.length; networkAclIndex++) {
            let networkAclObject = config.networkAcls[networkAclIndex];
            createNetworkAclPromises.push(this.createNetworkAclWithRules(vpcId, networkAclObject.name, environment, networkAclObject.rules).then(assignNetworkAclToLookup(networkAclObject.name)));
          }

          return BlueBirdPromise.all(createNetworkAclPromises);
        }).then(() => {

          this.logMessage(`Creating VPC Subnets. [VpcId: ${vpcId}]`);

          let assignSubnetIdToArray = (subnetName) => {
            return (createdSubnetId) => {
              subnetIds.push(createdSubnetId);
              subnetNameToIdLookup[subnetName] = createdSubnetId;
            };
          };

          let subnetPromises = [];
          for(let subnetIndex = 0; subnetIndex < config.subnets.length; subnetIndex++) {
            let subnetObject = config.subnets[subnetIndex];
            subnetPromises.push(this.createVpcSubnet(vpcId, subnetObject.name, environment, subnetObject.cidrBlock, subnetObject.availabilityZone, subnetObject.mapPublicIpOnLaunch).then(assignSubnetIdToArray(subnetObject.name)));
          }

          return BlueBirdPromise.all(subnetPromises);
        }).then(() => {
          let subnetToNetworkAclPromises = [];

          this.logMessage(`Associating VPC Subnets with Network Acl. [VpcId: ${vpcId}]`);
          for(let subnetIndex = 0; subnetIndex < config.subnets.length; subnetIndex++) {
            let subnetObject = config.subnets[subnetIndex];
            let subnetId = subnetNameToIdLookup[subnetObject.name];
            let networkAclId = networkAclNameToIdLookup[subnetObject.networkAclName];
            subnetToNetworkAclPromises.push(this.replaceNetworkAclAssociation(networkAclId, subnetId));
          }

          return BlueBirdPromise.all(subnetToNetworkAclPromises);
        }).then(() => {
          return this.createAndAttachInternetGateway(vpcId, `${config.name} - Internet Gateway`, environment).then(createdInternetGatewayId => {
            internetGatewayId = createdInternetGatewayId;
          });
        }).then(() => {
          //Create Route Table and associate it with Subnets
          let routeTableId = '';

          return this.createRouteTable(vpcId, `${config.name} - Route Table`, environment).then(createdRouteTableId => {
            routeTableId = createdRouteTableId;
          }).then(() => {
            return this.addInternetGatewayToRouteTable(internetGatewayId, routeTableId);
          }).then(() => {
            //associate subnets with route table
            let subnetAssociationPromises = [];
            for(let subnetIndex = 0; subnetIndex < subnetIds.length; subnetIndex++) {
              subnetAssociationPromises.push(this.associateSubnetWithRouteTable(routeTableId, subnetIds[subnetIndex]));
            }

            return BlueBirdPromise.all(subnetAssociationPromises);
          });
        }).then(() => {
          //finally return the vpcId of the newly created VPC
          return vpcId;
        });
      }
    });


  }

  /**
   * Creates a VPC with a name and environment tag; returns vpcId
   * @return Promise json object
   * data = {
       Vpc: {
         CidrBlock: "10.0.0.0/16",
         DhcpOptionsId: "dopt-7a8b9c2d",
         InstanceTenancy: "default",
         State: "pending",
         VpcId: "vpc-a01106c2"
       }
     }
   * @param name
   * @param cidrBlock The network range for the VPC, in CIDR notation. For example, 10.0.0.0/16
   */
  createVpc(name, environment, cidrBlock) {
    let params = {
      CidrBlock: cidrBlock, /* required */
      DryRun: false,
      InstanceTenancy: 'default'//'default | dedicated | host'
    };

    this.logMessage('Creating VPC');
    let createVpcPromise = this._awsEc2Client.createVpc(params).promise();

    let vpcId = '';
    return createVpcPromise
      .then(data => {
        vpcId = data.Vpc.VpcId;

        this.logMessage(`VPC Created [VpcId: ${vpcId}]`);
        let vpcAvailableParams = {
          VpcIds: [vpcId]
        };

        return this._awsEc2Client.waitFor('vpcAvailable', vpcAvailableParams).promise();
      }).then(() => {
        //assign tags
        let tags = [
          { Key: 'Name', Value: name },
          { Key: 'Environment', Value: environment },
        ];
        return this._createTags(vpcId, tags);
      }).then(() => {
        return this._modifyVpcAttributes(vpcId, true, true);
      }).then(() => {
        return vpcId;
      }).catch(err => {
        console.log(`CreateVPC Error: ${JSON.stringify(err)}`);
        throw err;
      });
  }

  /**
   * Returns the VpcId associated with the name
   * @param name
   * @return {Promise.<TResult>}
   */
  getVpcIdFromName(name) {
    let params = {
      DryRun: false,
      Filters: [
        {
          Name: 'tag:Name',
          Values: [ name ],
        }
      ]
    };

    this.logMessage(`Looking up VPC by name. [Vpc Name: ${name}]`);
    return this._awsEc2Client.describeVpcs(params).promise().then(result => {
      if(result && result.Vpcs && result.Vpcs.length > 0) {
        return result.Vpcs[0].VpcId;
      } else {
        return '';
      }
    });
  }

  /**
   * Returns list of SubnetIds
   * @param vpcId
   * @param subnetNames
   * @return {Promise.<TResult>}
   */
  getSubnetIdsFromSubnetName(vpcId, subnetNames) {

    let lookupValues = subnetNames;
    if(!__.isArray(subnetNames)) {
      lookupValues = [subnetNames];
    }

    let params = {
      DryRun: false,
      Filters: [
        {
          Name: 'tag:Name',
          Values: lookupValues
        },
        {
          Name: 'vpc-id',
          Values: [vpcId]
        }
      ]
    };

    this.logMessage(`Looking up Subnets by name. [VpcId: ${vpcId}] [SubnetName Lookup Values: ${JSON.stringify(lookupValues)}]`);
    return this._awsEc2Client.describeSubnets(params).promise().then(result => {
      if(result && result.Subnets && result.Subnets.length > 0) {
        let subnetIds = [];
        for(let itemIndex = 0; itemIndex < result.Subnets.length; itemIndex++) {
          subnetIds.push(result.Subnets[itemIndex].SubnetId);
        }
        return subnetIds;
      } else {
        return [];
      }
    });
  }

  /**
   * Returns the SubnetId
   * @param vpcId
   * @param name
   * @param environment
   * @param cidrBlock
   * @param availabilityZone
   * @param mapPublicIpOnLaunch
   * @return
   */
  createVpcSubnet(vpcId, name, environment, cidrBlock, availabilityZone, mapPublicIpOnLaunch = true) {
    this.logMessage(`Creating Vpc Subnet. [VpcId: ${vpcId}] [VpcSubnetName: ${name}] [Environment: ${environment}] [CidrBlock: ${cidrBlock}] [AvailabilityZone: ${availabilityZone}]`);
    let params = {
      CidrBlock: cidrBlock,
      AvailabilityZone: availabilityZone,
      VpcId: vpcId,
      DryRun: false
    };
    let createSubnetPromise = this._awsEc2Client.createSubnet(params).promise();

    let subnetId = '';
    return createSubnetPromise.then(result => {
      subnetId = result.Subnet.SubnetId;
      this.logMessage(`Creating Vpc Subnet Id. [SubnetId: ${subnetId}]`);
      //assign tags
      let tags = [
        { Key: 'Name', Value: name },
        { Key: 'Environment', Value: environment },
      ];
      return this._createTags(subnetId, tags);
    }).then(() => {
      return this._setMapPublicIpOnLaunchAttribute(subnetId, mapPublicIpOnLaunch);
    }).then(() => {
      return subnetId;
    });
  }

  /**
   * Returns InternetGatewayId
   * @param vpcId
   * @param name
   * @param environment
   * @returns {Promise.<TResult>}
   */
  createAndAttachInternetGateway(vpcId, name, environment) {
    let params = {};

    this.logMessage(`Creating Internet Gateway. [VpcId: ${vpcId}]`);
    let createInternetGatewayPromise = this._awsEc2Client.createInternetGateway(params).promise();

    let internetGatewayId = '';
    return createInternetGatewayPromise.then(result => {
      internetGatewayId = result.InternetGateway.InternetGatewayId;

      let tags = [
        { Key: 'Name', Value: name },
        { Key: 'Environment', Value: environment },
      ];
      return this._createTags(internetGatewayId, tags);
    }).then(() => {
      this.logMessage(`Attaching InternetGateway to VPC. [VpcId: ${vpcId}] [InternetGatewayId: ${internetGatewayId}]`);

      let params = {
        InternetGatewayId: internetGatewayId,
        VpcId: vpcId
      };
      return this._awsEc2Client.attachInternetGateway(params).promise();
    }).then(() => {
      return internetGatewayId;
    });
  }

  /**
   *
   * @param vpcId
   * @param name
   * @param environment
   * @returns {Promise.<TResult>}
   */
  createRouteTable(vpcId, name, environment) {
    let params = {
      VpcId: vpcId
    };

    this.logMessage(`Creating RouteTable. [VpcId: ${vpcId}] [RouteTableName: ${name}]`);
    let createRouteTablePromise = this._awsEc2Client.createRouteTable(params).promise();

    let routeTableId = '';
    return createRouteTablePromise.then(result => {
      routeTableId = result.RouteTable.RouteTableId;

      //assign tags
      let tags = [
        { Key: 'Name', Value: name },
        { Key: 'Environment', Value: environment },
      ];

      return this._createTags(routeTableId, tags);
    }).then(() => {
      return routeTableId;
    });
  }

  /**
   * Associates the Internet Gateway with a specific Route Table
   * @param internetGatewayId
   * @param routeTableId
   * @returns {Promise<EC2.Types.CreateRouteResult>}
   */
  addInternetGatewayToRouteTable(internetGatewayId, routeTableId) {
    let params = {
      DestinationCidrBlock: '0.0.0.0/0',
      GatewayId: internetGatewayId,
      RouteTableId: routeTableId
    };
    let createRoutePromise = this._awsEc2Client.createRoute(params).promise();

    this.logMessage(`Adding Internet Gateway to RouteTable. [RouteTableId: ${routeTableId}] [InternetGatewayId: ${internetGatewayId}]`);
    return createRoutePromise;
  }

  /**
   *
   * @param routeTableId
   * @param subnetId
   * @returns {Promise<EC2.Types.AssociateRouteTableResult>}
   */
  associateSubnetWithRouteTable(routeTableId, subnetId) {
    let params = {
      RouteTableId: routeTableId, /* required */
      SubnetId: subnetId, /* required */
      DryRun: false
    };

    this.logMessage(`Associating Subnet with RouteTable. [RouteTableId: ${routeTableId}] [SubnetId: ${subnetId}]`);
    let associateRouteTablePromise = this._awsEc2Client.associateRouteTable(params).promise();

    return associateRouteTablePromise;
  }

  /**
   *
   * @param vpcId
   * @param name
   * @param environment
   * @param networkAclRules
   * @returns {Promise.<TResult>}
   */
  createNetworkAclWithRules(vpcId, name, environment, networkAclRules) {
    let params = {
      VpcId: vpcId
    };

    this.logMessage(`Creating NetworkAcl. [VpcId: ${vpcId}] [Name: ${name}]`);
    let createNetworkAclPromise = this._awsEc2Client.createNetworkAcl(params).promise();

    let networkAclId = '';
    return createNetworkAclPromise.then(result => {
      networkAclId = result.NetworkAcl.NetworkAclId;

      //assign tags
      let tags = [
        { Key: 'Name', Value: name },
        { Key: 'Environment', Value: environment },
      ];

      return this._createTags(networkAclId, tags);
    }).then(() => {

      let createNetworkAclEntryPromises = [];
      //create rules on NetworkAcl
      for(let networkAclRuleIndex = 0; networkAclRuleIndex < networkAclRules.length; networkAclRuleIndex++) {
        let ruleObject = networkAclRules[networkAclRuleIndex];
        createNetworkAclEntryPromises.push(this.createNetworkAclRule(networkAclId, ruleObject.cidrBlock, ruleObject.egress, ruleObject.protocol, ruleObject.ruleAction, ruleObject.ruleNumber));
      }

      return BlueBirdPromise.all(createNetworkAclEntryPromises);
    }).then(() => {
      return networkAclId;
    });
  }

  /**
   *
   * @param networkAclId This is the networkAclId that the rule will be added to
   * @param cidrBlock This is the CIDR Block where the rule will be applied
   * @param egress If false, applies to inbound, if true, applies to outbound traffic
   * @param protocol -1 means all protocols
   * @param ruleAction This is a string which can be 'allow | deny'
   * @param ruleNumber This is the rule number
   */
  createNetworkAclRule(networkAclId, cidrBlock, egress, protocol, ruleAction, ruleNumber) {

    /*
      egress = true => outbound
      egress = false => inbound
     */
    let params = {
      CidrBlock: cidrBlock, /* required */
      Egress: egress, /* required */
      NetworkAclId: networkAclId, /* required */
      Protocol: protocol, /* required */
      RuleAction: ruleAction, /* required */
      RuleNumber: ruleNumber, /* required */
      DryRun: false,
      PortRange: {
        From: 0,
        To: 0
      }
    };

    return this._awsEc2Client.createNetworkAclEntry(params).promise();
  }

  /**
   * Replaces a subnet's Network ACL associate with the given network ACL
   * @param networkAclId
   * @param subnetId
   * @return {Promise.<TResult>|*}
   */
  replaceNetworkAclAssociation(networkAclId, subnetId) {

    let getNetworkAclAssociationId = this._findCurrentNetworkAclAssociationIdForSubnetId(subnetId);

    return getNetworkAclAssociationId.then(associationId => {
      let params = {
        AssociationId: associationId, /* required */
        NetworkAclId: networkAclId, /* required */
        DryRun: false
      };

      this.logMessage(`Replacing NetworkAcl Association for Subnet. [SubnetId: ${subnetId}] [AssociationId: ${associationId}] [New NetworkAclId: ${networkAclId}]`);
      return this._awsEc2Client.replaceNetworkAclAssociation(params).promise();
    });


  }

  /**
   * Finds the NetworkAclAssociationId associated with the subnet
   * @param subnetId
   * @return {Promise.<TResult>}
   * @private
   */
  _findCurrentNetworkAclAssociationIdForSubnetId(subnetId) {
    let params = {
      DryRun: false,
      Filters: [
        {
          Name: 'association.subnet-id',
          Values: [ subnetId ]
        }
      ]
    };

    let describeNetworkAclsPromise = this._awsEc2Client.describeNetworkAcls(params).promise();

    this.logMessage(`Looking up NetworkAclAssociationId for Subnet. [SubnetId: ${subnetId}]`);
    return describeNetworkAclsPromise.then(result => {

      let returnValue = '';
      this.logMessage(`Subnet NetworkAcls Lookup. [Result: ${JSON.stringify(result)}]`);
      if(result && result.NetworkAcls && result.NetworkAcls.length > 0) {
        let networkAclAssociations = result.NetworkAcls[0].Associations;
        let subnetAssociationObject = __.find(networkAclAssociations, {'SubnetId': subnetId});
        if(subnetAssociationObject) {
          returnValue = subnetAssociationObject.NetworkAclAssociationId;
        }
      }

      return returnValue;
    });

  }

  /**
   *
   * @param subnetId
   * @param value This is the flag to set for the MapPublicIpOnLaunch. True sets the value to yes, false sets the value to no
   * @return {Promise<{}>}
   * @private
   */
  _setMapPublicIpOnLaunchAttribute(subnetId, value = true) {
    let params = {
      SubnetId: subnetId, /* required */
      MapPublicIpOnLaunch: {
        Value: value
      }
    };

    let modifySubnetAttributePromise = this._awsEc2Client.modifySubnetAttribute(params).promise();

    return modifySubnetAttributePromise;
  }

  /**
   *
   * @param vpcId
   * @param enableDnsHostnames
   * @param enableDnsSupport
   * @return {*}
   * @private
   */
  _modifyVpcAttributes(vpcId, enableDnsHostnames = true, enableDnsSupport = true) {
    let enableDnsHostnamesParams = {
      VpcId: vpcId, /* required */
      EnableDnsHostnames: {
        Value: enableDnsHostnames
      }
    };

    let enableDnsSupportParams = {
      VpcId: vpcId, /* required */
      EnableDnsSupport: {
        Value: enableDnsSupport
      }
    };


    this.logMessage(`Setting VPC Attributes. [VpcId: ${vpcId}] [EnableDnsHostnames: ${enableDnsHostnames}] [EnableDnsSupport: ${enableDnsSupport}]`);
    let modifyDnsHostnamesPromise = this._awsEc2Client.modifyVpcAttribute(enableDnsHostnamesParams).promise();
    let modifyDnsSupportPromise = this._awsEc2Client.modifyVpcAttribute(enableDnsSupportParams).promise();

    return BlueBirdPromise.all([modifyDnsHostnamesPromise, modifyDnsSupportPromise]);
  }

  /**
   *
   * @param resourceId
   * @param tags Array of objects which contain a Key and Value key
   * @param addCreatedTag
   * @returns {Promise.<TResult>}
   * @private
   */
  _createTags(resourceId, tags, addCreatedTag = true) {

    let localTags = tags;
    if(!__.isArray(localTags)) {
      localTags = [];
    }

    if(addCreatedTag) {
      localTags.push({ Key: 'Created', Value:  moment().format()});
    }

    //assign tags
    let createTagParams = {
      Resources: [ resourceId ],
      Tags: localTags,
      DryRun: false
    };

    this.logMessage(`Assigning Tags to ResourceId. [ResourceId: ${resourceId}] [Tags: ${JSON.stringify(localTags)}]`);
    return this._awsEc2Client.createTags(createTagParams).promise();
  }

  /**
   * Logs messages
   * @param msg
   */
  logMessage(msg) {
    console.log(msg);
  }
}


module.exports = VpcClient;
