import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { Promise as BluebirdPromise } from 'bluebird';



const sampleConfig1 = require('./sampleConfigs/sampleConfig.js');

describe('Deployer', function() {
  let sandbox;
  let defaultMocks;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    
    defaultMocks = {
      './s3Client': sandbox.stub(),
      './ecsClient.js': sandbox.stub(),
      './elbClient.js': sandbox.stub(),
      './ec2Client.js': sandbox.stub(),
      './lambdaClient.js': sandbox.stub(),
      './autoScalingClient.js': sandbox.stub(),
      './route53Client.js': sandbox.stub(),
      './cloudFrontClient.js': sandbox.stub(),
      './apiGatewayClient': sandbox.stub(),
      './applicationAutoScalingClient.js': sandbox.stub(),
      './cloudWatchClient.js': sandbox.stub()
    };
    
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('constructor', () => {
    it('should pass accessKey, secretKey, and region to VPC client', () => {
      //Arrange
      let vpcClientStub = sandbox.stub();
      const mocks = {
        ...defaultMocks,
        './vpcClient.js': vpcClientStub
      };

      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-3';

      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      //Act
      const deployerInstance = new Deployer(deployerParams);

      //Assert
      expect(vpcClientStub.args[0][0]).to.be.equal(accessKey);
      expect(vpcClientStub.args[0][1]).to.be.equal(secretKey);
      expect(vpcClientStub.args[0][2]).to.be.equal(region);
    });

    it('should pass accessKey, secretKey, and region to EC2 client', () => {
      //Arrange
      let ec2ClientStub = sandbox.stub();
      const mocks = {
        ...defaultMocks,
        './ec2Client.js': ec2ClientStub
      };

      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-3';

      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      //Act
      const deployerInstance = new Deployer(deployerParams);
      //Assert
      expect(ec2ClientStub.args[0][0]).to.be.equal(accessKey);
      expect(ec2ClientStub.args[0][1]).to.be.equal(secretKey);
      expect(ec2ClientStub.args[0][2]).to.be.equal(region);
    });

    it('should pass accessKey, secretKey, and region to ECS client', () => {
      //Arrange
      let ecsClientStub = sandbox.stub();
      const mocks = {
        ...defaultMocks,
        './ecsClient.js': ecsClientStub
      };

      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-3';

      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      //Act
      const deployerInstance = new Deployer(deployerParams);

      //Assert
      expect(ecsClientStub.args[0][0]).to.be.equal(accessKey);
      expect(ecsClientStub.args[0][1]).to.be.equal(secretKey);
      expect(ecsClientStub.args[0][2]).to.be.equal(region);
    });

    it('should pass accessKey, secretKey, and region to ELB client', () => {
      //Arrange
      let elbClientStub = sandbox.stub();
      const mocks = {
        ...defaultMocks,
        './elbClient.js': elbClientStub
      };

      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-3';

      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      //Act
      const deployerInstance = new Deployer(deployerParams);
      //Assert
      expect(elbClientStub.args[0][0]).to.be.equal(accessKey);
      expect(elbClientStub.args[0][1]).to.be.equal(secretKey);
      expect(elbClientStub.args[0][2]).to.be.equal(region);
    });

    it('should pass accessKey, secretKey, and region to AutoScaling client', () => {
      //Arrange
      let autoScalingClientStub = sandbox.stub();
      const mocks = {'./autoScalingClient.js': autoScalingClientStub};

      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-3';

      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      //Act
      const deployerInstance = new Deployer(deployerParams);

      //Assert
      expect(autoScalingClientStub.args[0][0]).to.be.equal(accessKey);
      expect(autoScalingClientStub.args[0][1]).to.be.equal(secretKey);
      expect(autoScalingClientStub.args[0][2]).to.be.equal(region);
    });

    it('should pass accessKey, secretKey, and region to Route53 client', () => {
      //Arrange
      let route53ClientMock = sandbox.stub();
      const mocks = {
        ...defaultMocks,
        './route53Client.js': route53ClientMock
      };

      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-3';

      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      //Act
      const deployerInstance = new Deployer(deployerParams);

      //Assert
      expect(route53ClientMock.args[0][0]).to.be.equal(accessKey);
      expect(route53ClientMock.args[0][1]).to.be.equal(secretKey);
      expect(route53ClientMock.args[0][2]).to.be.equal(region);
    });

    it('should pass accessKey and secretKey to CloudFront client', () => {
      //Arrange
      let cloudFrontClientMock = sandbox.stub();
      const mocks = {
        ...defaultMocks,
        './cloudFrontClient.js': cloudFrontClientMock
      };

      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-4';

      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      //Act
      const deployerInstance = new Deployer(deployerParams);

      //Assert
      expect(cloudFrontClientMock.args[0][0]).to.be.equal(accessKey);
      expect(cloudFrontClientMock.args[0][1]).to.be.equal(secretKey);
    });

    it('should pass accessKey, secretKey, and region to CloudWatch client', () => {
      //Arrange
      let cloudWatchClientStub = sandbox.stub();
      const mocks = {
        ...defaultMocks,
        './cloudWatchClient.js': cloudWatchClientStub
      };

      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-3';

      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      //Act
      const deployerInstance = new Deployer(deployerParams);

      //Assert
      expect(cloudWatchClientStub.args[0][0]).to.be.equal(accessKey);
      expect(cloudWatchClientStub.args[0][1]).to.be.equal(secretKey);
      expect(cloudWatchClientStub.args[0][2]).to.be.equal(region);
    });

    it('should pass accessKey, secretKey, and region to ApplicationAutoScaling client', () => {
      //Arrange
      let applicationAutoScalingStub = sandbox.stub();
      const mocks = {
        ...defaultMocks,
        './applicationAutoScalingClient.js': applicationAutoScalingStub
      };

      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-3';

      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      //Act
      const deployerInstance = new Deployer(deployerParams);

      //Assert
      expect(applicationAutoScalingStub.args[0][0]).to.be.equal(accessKey);
      expect(applicationAutoScalingStub.args[0][1]).to.be.equal(secretKey);
      expect(applicationAutoScalingStub.args[0][2]).to.be.equal(region);
    });
  });

  describe('_createSecurityGroup', () =>{
    let vpcClientStub;
    let ec2ClientStub;
    let ecsClientStub;
    let elbClientStub;
    let autoScaleClientStub;
    let route53ClientStub;
    let mocks;
    let deployerClient;
    beforeEach(() => {

      vpcClientStub = {
        createVpcFromConfig: sandbox.stub().resolves({}),
        getVpcIdFromName: sandbox.stub().resolves()
      };

      ecsClientStub = {
        createCluster: sandbox.stub().resolves({})
      };

      ec2ClientStub = {
        createSecurityGroupFromConfig: sandbox.stub()
      };
      elbClientStub = sandbox.stub();
      autoScaleClientStub = sandbox.stub();
      route53ClientStub = sandbox.stub();

      mocks = {
        ...defaultMocks,
        './vpcClient.js': function() {
          return vpcClientStub;
        },
        './elbClient.js': elbClientStub,
        './autoScalingClient.js': autoScaleClientStub,
        './ec2Client.js': function() {
          return ec2ClientStub;
        },
        './ecsClient.js': function() {
          return ecsClientStub;
        },
        './route53Client.js': route53ClientStub
      };

      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      deployerClient = new Deployer(deployerParams);
    });

    it('should call _vpcClient.getVpcIdFromName once', async () => {
      // Arrange
      const environment = 'myEnv';
      const securityGroupConfig = {};

      // Act
      await deployerClient._createSecurityGroup(environment, securityGroupConfig);

      // Assert
      expect(vpcClientStub.getVpcIdFromName.callCount).to.be.equal(1);
    });

    it('should call _ec2Client.createSecurityGroupFromConfig once', async () => {
      // Arrange
      const environment = 'myEnv';
      const securityGroupConfig = {};

      // Act
      await deployerClient._createSecurityGroup(environment, securityGroupConfig);

      // Assert
      expect(ec2ClientStub.createSecurityGroupFromConfig.callCount).to.be.equal(1);
    });

    it('should attach return VPC Id to params for _ec2Client.createSecurityGroupFromConfig', async () => {
      // Arrange
      vpcClientStub.getVpcIdFromName = sandbox.stub().resolves('returnedId');
      const environment = 'myEnv';
      const securityGroupConfig = {};

      // Act
      await deployerClient._createSecurityGroup(environment, securityGroupConfig);

      // Assert
      expect(ec2ClientStub.createSecurityGroupFromConfig.args[0][0]).to.be.equal('myEnv');
      expect(ec2ClientStub.createSecurityGroupFromConfig.args[0][1]).to.be.deep.equal({ vpcId: 'returnedId' });
    });
  });

  describe('_createOrUpdateLaunchConfiguration', () => {
    let vpcClientStub;
    let ec2ClientStub;
    let ecsClientStub;
    let elbClientStub;
    let autoScaleClientStub;
    let route53ClientStub;
    let mocks;
    let deployerClient;
    let config;
    let ecsClusterName;
    beforeEach(() => {

      vpcClientStub = {
        createVpcFromConfig: sandbox.stub().resolves({}),
        getVpcIdFromName: sandbox.stub().resolves('returnedVpcId')
      };

      ecsClientStub = {
        createCluster: sandbox.stub().resolves({})
      };

      ec2ClientStub = {
        createSecurityGroupFromConfig: sandbox.stub().resolves(),
        getSecurityGroupIdFromName: sandbox.stub().resolves('returnedSecurityGroupId')
      };
      elbClientStub = sandbox.stub();
      autoScaleClientStub = {
        createOrUpdateLaunchConfigurationFromConfig: sandbox.stub().resolves()
      };
      route53ClientStub = sandbox.stub();

      mocks = {
        './vpcClient.js': function () {
          return vpcClientStub;
        },
        './elbClient.js': elbClientStub,
        './autoScalingClient.js': function() {
          return autoScaleClientStub;
        },
        './ec2Client.js': function () {
          return ec2ClientStub;
        },
        './ecsClient.js': function () {
          return ecsClientStub;
        },
        './route53Client.js': route53ClientStub
      };

      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      deployerClient = new Deployer(deployerParams);

      config = {
        vpcName: 'myVpc',
        securityGroupName: 'mySecurityGroup',
        securityGroupId: 'mySecurityGroupId',
      };
      ecsClusterName = 'myCluster';
    });

    it('should call _vpcClient.getVpcIdFromName once', async () => {
      // Arrange

      // Act
      await deployerClient._createOrUpdateLaunchConfiguration(config, ecsClusterName);

      // Assert
      expect(vpcClientStub.getVpcIdFromName.callCount).to.be.equal(1);
    });

    it('should pass vpcName to _vpcClient.getVpcIdFromName', async () => {
      // Act
      await deployerClient._createOrUpdateLaunchConfiguration(config, ecsClusterName);

      // Assert
      expect(vpcClientStub.getVpcIdFromName.args[0][0]).to.be.equal(config.vpcName);
    });

    it('should call _ec2Client.getSecurityGroupIdFromName once', async () => {
      // Act
      await deployerClient._createOrUpdateLaunchConfiguration(config, ecsClusterName);

      // Assert
      expect(ec2ClientStub.getSecurityGroupIdFromName.callCount).to.be.equal(1);
    });

    it('should pass params to _ec2Client.getSecurityGroupIdFromName', async () => {
      // Act
      await deployerClient._createOrUpdateLaunchConfiguration(config, ecsClusterName);

      // Assert
      expect(ec2ClientStub.getSecurityGroupIdFromName.args[0][0]).to.be.equal(config.securityGroupName);
      expect(ec2ClientStub.getSecurityGroupIdFromName.args[0][1]).to.be.equal('returnedVpcId');
    });

    it('should call _autoScalingClient.createOrUpdateLaunchConfigurationFromConfig once', async () => {
      // Act
      await deployerClient._createOrUpdateLaunchConfiguration(config, ecsClusterName);

      // Assert
      expect(autoScaleClientStub.createOrUpdateLaunchConfigurationFromConfig.callCount).to.be.equal(1);
    });

    it('should pass launch config to _autoScalingClient.createOrUpdateLaunchConfigurationFromConfig', async () => {
      // Arrange
      const expected = {
        ...config,
        securityGroupId: 'returnedSecurityGroupId',
        ecsClusterName
      };

      // Act
      await deployerClient._createOrUpdateLaunchConfiguration(config, ecsClusterName);

      // Assert
      expect(autoScaleClientStub.createOrUpdateLaunchConfigurationFromConfig.args[0][0]).to.be.deep.equal(expected);
    });

    it('should return result of _autoScalingClient.createOrUpdateLaunchConfigurationFromConfig', async () => {
      // Arrange
      autoScaleClientStub.createOrUpdateLaunchConfigurationFromConfig = sandbox.stub().resolves({});

      // Act
      const result = await deployerClient._createOrUpdateLaunchConfiguration(config, ecsClusterName);

      // Assert
      expect(result).to.be.deep.equal({});
    });
  });

  describe('_createTargetGroup', () => {
    let vpcClientStub;
    let ec2ClientStub;
    let ecsClientStub;
    let elbClientStub;
    let autoScaleClientStub;
    let route53ClientStub;
    let mocks;
    let deployerClient;
    let config;
    let environment;
    beforeEach(() => {

      vpcClientStub = {
        getVpcIdFromName: sandbox.stub().resolves('returnedVpcId')
      };

      ecsClientStub = sandbox.stub();
      ec2ClientStub = sandbox.stub();
      elbClientStub = {
        createTargetGroup: sandbox.stub().resolves()
      };
      autoScaleClientStub = sandbox.stub();
      route53ClientStub = sandbox.stub();

      mocks = {
        './vpcClient.js': function () {
          return vpcClientStub;
        },
        './elbClient.js': function () {
          return elbClientStub;
        },
        './autoScalingClient.js': autoScaleClientStub,
        './ec2Client.js': ec2ClientStub,
        './ecsClient.js': ecsClientStub,
        './route53Client.js': route53ClientStub
      };

      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      deployerClient = new Deployer(deployerParams);

      config = {
        name: 'myName',
        vpcName: 'myVpc',
        port: 80,
        protocol: 'something',
        securityGroupName: 'mySecurityGroup',
        securityGroupId: 'mySecurityGroupId',
      };
      environment = 'myEnv';
    });

    it('should call _vpcClient.getVpcIdFromName once', async () => {
      // Act
      await deployerClient._createTargetGroup(environment, config);

      // Assert
      expect(vpcClientStub.getVpcIdFromName.callCount).to.be.equal(1);
    });

    it('should pass params to _vpcClient.getVpcIdFromName', async () => {
      // Act
      await deployerClient._createTargetGroup(environment, config);

      // Assert
      expect(vpcClientStub.getVpcIdFromName.args[0][0]).to.be.equal(config.vpcName);
    });

    it('should call _elbClient.createTargetGroup once', async () => {
      // Act
      await deployerClient._createTargetGroup(environment, config);

      // Assert
      expect(elbClientStub.createTargetGroup.callCount).to.be.equal(1);
    });

    it('should pass params to _elbClient.createTargetGroup', async () => {
      // Act
      await deployerClient._createTargetGroup(environment, config);

      // Assert
      expect(elbClientStub.createTargetGroup.args[0][0]).to.be.equal(environment);
      expect(elbClientStub.createTargetGroup.args[0][1]).to.be.equal(config.name);
      expect(elbClientStub.createTargetGroup.args[0][2]).to.be.equal(config.port);
      expect(elbClientStub.createTargetGroup.args[0][3]).to.be.equal(config.protocol);
      expect(elbClientStub.createTargetGroup.args[0][4]).to.be.equal('returnedVpcId');
      expect(elbClientStub.createTargetGroup.args[0][5]).to.be.deep.equal({ HealthCheckPath: '/health' });
    });

    it('should return result from _elbClient.createTargetGroup', async () => {
      // Arrange
      elbClientStub.createTargetGroup = sandbox.stub().resolves({});

      // Act
      const result = await deployerClient._createTargetGroup(environment, config);

      // Assert
      expect(result).to.be.deep.equal({});
    });
  });

  describe('_createOrUpdateAutoScaleGroup', () => {
    let vpcClientStub;
    let ec2ClientStub;
    let ecsClientStub;
    let elbClientStub;
    let autoScaleClientStub;
    let route53ClientStub;
    let mocks;
    let deployerClient;
    let asgConfig;
    let environment;
    let launchConfigToDelete;
    beforeEach(() => {

      vpcClientStub = {
        getVpcIdFromName: sandbox.usingPromise(BluebirdPromise).stub().resolves('returnedVpcId'),
        getSubnetIdsFromSubnetName: sandbox.usingPromise(BluebirdPromise).stub().resolves(['123', '456'])
      };

      ecsClientStub = sandbox.stub();
      ec2ClientStub = sandbox.stub();
      elbClientStub = {
        getTargetGroupArnFromName: sandbox.stub().resolves('returnedTargetGroupArn'),
      };
      autoScaleClientStub = {
        createOrUpdateAutoScalingGroup: sandbox.stub()
      };
      route53ClientStub = sandbox.stub();

      mocks = {
        './vpcClient.js': function () {
          return vpcClientStub;
        },
        './elbClient.js': function () {
          return elbClientStub;
        },
        './autoScalingClient.js': function () {
          return autoScaleClientStub;
        },
        './ec2Client.js': ec2ClientStub,
        './ecsClient.js': ecsClientStub,
        './route53Client.js': route53ClientStub
      };

      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      deployerClient = new Deployer(deployerParams);

      asgConfig = {
        name: 'myName',
        vpcName: 'myVpcName',
        launchConfigurationName: 'myLaunchConfigurationName',
        targetGroupName: 'myTargetGroupName',
        minSize: 0,
        maxSize: 2,
        desiredSize: 1,
        vpcSubnets: 'mySubnets'
      };
      environment = 'myEnv';
      launchConfigToDelete = 'deleteThisOne';
    });

    it('should call _vpcClient.getVpcIdFromName once', async () => {
      // Act
      await deployerClient._createOrUpdateAutoScaleGroup(environment, asgConfig, launchConfigToDelete);

      // Assert
      expect(vpcClientStub.getVpcIdFromName.callCount).to.be.equal(1);
    });

    it('should pass vpcName to _vpeClient.getVpcIdFromName', async () => {
      // Act
      await deployerClient._createOrUpdateAutoScaleGroup(environment, asgConfig, launchConfigToDelete);

      // Assert
      expect(vpcClientStub.getVpcIdFromName.args[0][0]).to.be.equal(asgConfig.vpcName);
    });

    it('should call _vpcClient.getSubnetIdsFromSubnetName once', async () => {
      // Act
      await deployerClient._createOrUpdateAutoScaleGroup(environment, asgConfig, launchConfigToDelete);

      // Assert
      expect(vpcClientStub.getSubnetIdsFromSubnetName.callCount).to.be.equal(1);
    });

    it('should pass vpcId and vpcSubnets to getSubnetIdsFromSubnetName', async () => {
      // Act
      await deployerClient._createOrUpdateAutoScaleGroup(environment, asgConfig, launchConfigToDelete);

      // Assert
      expect(vpcClientStub.getSubnetIdsFromSubnetName.args[0][0]).to.be.equal('returnedVpcId');
      expect(vpcClientStub.getSubnetIdsFromSubnetName.args[0][1]).to.be.equal(asgConfig.vpcSubnets);
    });

    it('should call _elbClient.getTargetGroupArnFromName once', async () => {
      // Act
      await deployerClient._createOrUpdateAutoScaleGroup(environment, asgConfig, launchConfigToDelete);

      // Assert
      expect(elbClientStub.getTargetGroupArnFromName.callCount).to.be.equal(1);
    });

    it('should pass targetGroupName to _elbClient.getTargetGroupArnFromName', async () => {
      // Act
      await deployerClient._createOrUpdateAutoScaleGroup(environment, asgConfig, launchConfigToDelete);

      // Assert
      expect(elbClientStub.getTargetGroupArnFromName.args[0][0]).to.be.equal(asgConfig.targetGroupName);
    });

    it('should call _autoScalingClient.createOrUpdateAutoScalingGroup once', async () => {
      // Act
      await deployerClient._createOrUpdateAutoScaleGroup(environment, asgConfig, launchConfigToDelete);

      // Assert
      expect(autoScaleClientStub.createOrUpdateAutoScalingGroup.callCount).to.be.equal(1);
    });

    it('should pass params and launchConfigToDelete to _autoScalingClient.createOrUpdateAutoScalingGroup', async () => {
      // Arrange
      const expected = {
        environment: 'myEnv',
        name: 'myName',
        launchConfigurationName: 'myLaunchConfigurationName',
        minSize: 0,
        maxSize: 2,
        desiredCapacity: 1,
        targetGroupArns: ['returnedTargetGroupArn'],
        vpcSubnets: '123,456'
      };

      // Act
      await deployerClient._createOrUpdateAutoScaleGroup(environment, asgConfig, launchConfigToDelete);

      // Assert
      expect(autoScaleClientStub.createOrUpdateAutoScalingGroup.args[0][0]).to.be.deep.equal(expected);
    });

    it('should return the result of _autoScalingClient.createOrUpdateAutoScalingGroup', async () => {
      // Arrange
      autoScaleClientStub.createOrUpdateAutoScalingGroup = sandbox.stub().resolves({});

      // Act
      const result = await deployerClient._createOrUpdateAutoScaleGroup(environment, asgConfig, launchConfigToDelete);

      // Assert
      expect(result).to.be.deep.equal({});
    });
  });

  describe('_createApplicationLoadBalancer', () => {
    let vpcClientStub;
    let ec2ClientStub;
    let ecsClientStub;
    let elbClientStub;
    let autoScaleClientStub;
    let route53ClientStub;
    let mocks;
    let deployerClient;
    let lbConfig;
    let environment;
    beforeEach(() => {

      vpcClientStub = {
        getVpcIdFromName: sandbox.usingPromise(BluebirdPromise).stub().resolves('returnedVpcId'),
        getSubnetIdsFromSubnetName: sandbox.usingPromise(BluebirdPromise).stub().resolves(['123', '456'])
      };

      ecsClientStub = sandbox.stub();
      ec2ClientStub = {
        getSecurityGroupIdFromName: sandbox.stub().resolves('returnedSecurityGroupId')
      };
      elbClientStub = {
        createApplicationLoadBalancer: sandbox.stub().resolves()
      };
      autoScaleClientStub = {
        createOrUpdateAutoScalingGroup: sandbox.stub()
      };
      route53ClientStub = sandbox.stub();

      mocks = {
        './vpcClient.js': function () {
          return vpcClientStub;
        },
        './elbClient.js': function () {
          return elbClientStub;
        },
        './autoScalingClient.js': function () {
          return autoScaleClientStub;
        },
        './ec2Client.js': function () {
          return ec2ClientStub;
        },
        './ecsClient.js': ecsClientStub,
        './route53Client.js': route53ClientStub
      };

      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      deployerClient = new Deployer(deployerParams);

      lbConfig = {
        name: 'myName',
        vpcName: 'myVpcName',
        launchConfigurationName: 'myLaunchConfigurationName',
        targetGroupName: 'myTargetGroupName',
        securityGroupName: 'mySecurityGroup',
        minSize: 0,
        maxSize: 2,
        desiredSize: 1,
        vpcSubnets: 'mySubnets',
        scheme: 'myScheme'
      };
      environment = 'myEnv';
    });

    it('should call _vpcClient.getVpcIdFromName once', async () => {
      // Act
      await deployerClient._createApplicationLoadBalancer(environment, lbConfig);

      // Assert
      expect(vpcClientStub.getVpcIdFromName.callCount).to.be.equal(1);
    });

    it('should pass vpcName to _vpcClient.getVpcIdFromName', async () => {
      // Act
      await deployerClient._createApplicationLoadBalancer(environment, lbConfig);

      // Assert
      expect(vpcClientStub.getVpcIdFromName.args[0][0]).to.be.equal('myVpcName');
    });

    it('should call _vpcClient.getSubnetIdsFromSubnetName once', async () => {
      // Act
      await deployerClient._createApplicationLoadBalancer(environment, lbConfig);

      // Assert
      expect(vpcClientStub.getSubnetIdsFromSubnetName.callCount).to.be.equal(1);
    });

    it('should pass vpcId and vpcSubnets to _vpcClient.getSubnetIddsFromSubnetName', async () => {
      // Act
      await deployerClient._createApplicationLoadBalancer(environment, lbConfig);

      // Assert
      expect(vpcClientStub.getSubnetIdsFromSubnetName.args[0][0]).to.be.equal('returnedVpcId');
      expect(vpcClientStub.getSubnetIdsFromSubnetName.args[0][1]).to.be.equal('mySubnets');
    });

    it('should call ec2Client.getSecurityGroupIdFromName once', async () => {
      // Act
      await deployerClient._createApplicationLoadBalancer(environment, lbConfig);

      // Assert
      expect(ec2ClientStub.getSecurityGroupIdFromName.callCount).to.be.equal(1);
    });

    it('should pass params to ec2Client.getSecurityGroupIdFromName', async () => {
      // Act
      await deployerClient._createApplicationLoadBalancer(environment, lbConfig);

      // Assert
      expect(ec2ClientStub.getSecurityGroupIdFromName.args[0][0]).to.be.equal('mySecurityGroup');
      expect(ec2ClientStub.getSecurityGroupIdFromName.args[0][1]).to.be.equal('returnedVpcId');
    });

    it('should call _elbClient.createApplicationLoadBalancer once', async () => {
      // Act
      await deployerClient._createApplicationLoadBalancer(environment, lbConfig);

      // Assert
      expect(elbClientStub.createApplicationLoadBalancer.callCount).to.be.equal(1);
    });

    it('should pass params to elbClient.createApplicationLoadBalancer', async() => {
      // Act
      await deployerClient._createApplicationLoadBalancer(environment, lbConfig);

      expect(elbClientStub.createApplicationLoadBalancer.args[0][0]).to.be.equal('myEnv');
      expect(elbClientStub.createApplicationLoadBalancer.args[0][1]).to.be.equal('myName');
      expect(elbClientStub.createApplicationLoadBalancer.args[0][2]).to.be.deep.equal(['123', '456']);
      expect(elbClientStub.createApplicationLoadBalancer.args[0][3]).to.be.equal('myScheme');
      expect(elbClientStub.createApplicationLoadBalancer.args[0][4]).to.be.deep.equal(['returnedSecurityGroupId']);
    });
  });

  describe('_createECSService', () => {
    let vpcClientStub;
    let ec2ClientStub;
    let ecsClientStub;
    let elbClientStub;
    let autoScaleClientStub;
    let route53ClientStub;
    let cloudWatchClientStub;
    let mocks;
    let deployerClient;
    let serviceConfig;
    let putScalingPolicyStub;
    beforeEach(() => {

      putScalingPolicyStub = sandbox.stub();
      putScalingPolicyStub.onCall(0).resolves({ PolicyARN: 'myScaleOutResponse' });
      putScalingPolicyStub.onCall(1).resolves({ PolicyARN: 'myScaleInResponse' });
      vpcClientStub = {
        getVpcIdFromName: sandbox.usingPromise(BluebirdPromise).stub().resolves('returnedVpcId'),
        getSubnetIdsFromSubnetName: sandbox.usingPromise(BluebirdPromise).stub().resolves(['123', '456'])
      };

      ecsClientStub = {
        createOrUpdateService: sandbox.stub().resolves()
      };
      ec2ClientStub = {
        getSecurityGroupIdFromName: sandbox.stub().resolves('returnedSecurityGroupId')
      };
      elbClientStub = {
        createApplicationLoadBalancer: sandbox.stub().resolves(),
        getTargetGroupArnFromName: sandbox.stub().resolves('returnedTargetGroupArn')
      };
      autoScaleClientStub = {
        createOrUpdateAutoScalingGroup: sandbox.stub().resolves(),
        registerScalableTarget: sandbox.stub().resolves(),
        putScalingPolicy: putScalingPolicyStub
      };
      route53ClientStub = sandbox.stub();

      cloudWatchClientStub = {
        putMetricAlarm: sandbox.stub().resolves()
      };

      mocks = {
        './vpcClient.js': function () {
          return vpcClientStub;
        },
        './elbClient.js': function () {
          return elbClientStub;
        },
        './applicationAutoScalingClient.js': function () {
          return autoScaleClientStub;
        },
        './ec2Client.js': function () {
          return ec2ClientStub;
        },
        './ecsClient.js': function () {
          return ecsClientStub;
        },
        './route53Client.js': route53ClientStub,
        './cloudWatchClient.js': function () {
          return cloudWatchClientStub;
        }
      };

      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      deployerClient = new Deployer(deployerParams);

      serviceConfig = {
        name: 'myName',
        vpcName: 'myVpcName',
        launchConfigurationName: 'myLaunchConfigurationName',
        targetGroupName: 'myTargetGroupName',
        securityGroupName: 'mySecurityGroup',
        serviceName: 'myServiceName',
        clusterName: 'myClusterName',
        desiredCount: 999,
        taskName:'myTaskName',
        containerName: 'myContainerName',
        containerPort: 'myContainerPort',
        registerScalableTargetParams: 'myParams',
        serviceScaleOutPolicyParams: 'myScaleOutParams',
        serviceScaleInPolicyParams: 'myScaleInParams',
        putAlarmScaleOutParams: {
          AlarmActions: []
        },
        putAlarmScaleInParams: {
          AlarmActions: []
        }
      };
    });

    it('should call _elbClient.getTargetGroupArnFromName once', async () => {
      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(elbClientStub.getTargetGroupArnFromName.callCount).to.be.equal(1);
    });

    it('should pass targetGroupName from serviceConfig to getTargetGroupArnFromName', async () => {
      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(elbClientStub.getTargetGroupArnFromName.args[0][0]).to.be.equal('myTargetGroupName');
    });

    it('should call _ecsClient.createOrUpdateService once', async () => {
      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(ecsClientStub.createOrUpdateService.callCount).to.be.equal(1);
    });

    it('should pass params to _ecsClient.createOrUpdateService', async () => {
      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(ecsClientStub.createOrUpdateService.args[0][0]).to.be.equal('myClusterName');
      expect(ecsClientStub.createOrUpdateService.args[0][1]).to.be.equal('myServiceName');
      expect(ecsClientStub.createOrUpdateService.args[0][2]).to.be.equal('myTaskName');
      expect(ecsClientStub.createOrUpdateService.args[0][3]).to.be.equal(999);
      expect(ecsClientStub.createOrUpdateService.args[0][4]).to.be.equal('myContainerName');
      expect(ecsClientStub.createOrUpdateService.args[0][5]).to.be.equal('myContainerPort');
      expect(ecsClientStub.createOrUpdateService.args[0][6]).to.be.equal('returnedTargetGroupArn');
    });

    it('should call _applicationAutoScalingClient.registerScalableTarget once', async () => {
      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(autoScaleClientStub.registerScalableTarget.callCount).to.be.equal(1);
    });

    it('should pass params to _applicationAutoScalingClient.registerScalableTarget', async () => {
      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(autoScaleClientStub.registerScalableTarget.args[0][0]).to.be.equal('myParams');
    });

    it('should call _applicationAutoScalingClient.putScalingPolicy TWICE', async () => {
      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(autoScaleClientStub.putScalingPolicy.callCount).to.be.equal(2);
    });

    it('should pass serviceScaleOutPolicyParams to _applicationAutoScalingClient.putScalingPolicy on first call', async () => {
      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(autoScaleClientStub.putScalingPolicy.args[0][0]).to.be.equal('myScaleOutParams');
    });

    it('should pass serviceScaleInPolicyParams to _applicationAutoScalingClient.putScalingPolicy on second call', async () => {
      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(autoScaleClientStub.putScalingPolicy.args[1][0]).to.be.equal('myScaleInParams');
    });

    it('should call _cloudWatchClient.putMetricAlarm TWICE', async () => {
      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(cloudWatchClientStub.putMetricAlarm.callCount).be.equal(2);
    });

    it('should pass PolicyARN returned from first call to putScalingPolicy on first call to putMetricAlarm', async () => {
      // Assert
      const expected = {
        AlarmActions: ['myScaleOutResponse']
      };

      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(cloudWatchClientStub.putMetricAlarm.args[0][0]).to.be.deep.equal(expected);
    });

    it('should pass PolicyArn returned from second call to putScalingPOlicy on second call to putMetricAlarm', async () => {
      // Assert
      const expected = {
        AlarmActions: ['myScaleInResponse']
      };

      // Act
      await deployerClient._createECSService(serviceConfig);

      // Assert
      expect(cloudWatchClientStub.putMetricAlarm.args[1][0]).to.be.deep.equal(expected);
    });
  });

  describe('createInfrastructure', () => {
    let vpcClientStub;
    let ec2ClientStub;
    let ecsClientStub;
    let elbClientStub;
    let autoScaleClientStub;
    let route53ClientStub;
    let mocks;
    beforeEach(() => {

      vpcClientStub = {
        createVpcFromConfig: sandbox.stub().resolves({}),
        getVpcIdFromName: sandbox.stub().resolves({})
      };

      ecsClientStub = {
        createCluster: sandbox.stub().resolves({})
      };

      ec2ClientStub = sandbox.stub();
      elbClientStub = sandbox.stub();
      autoScaleClientStub = sandbox.stub();
      route53ClientStub = sandbox.stub();

      mocks = {
        './vpcClient.js': function() {
          return vpcClientStub;
        },
        './elbClient.js': elbClientStub,
        './autoScalingClient.js': autoScaleClientStub,
        './ec2Client.js': ec2ClientStub,
        './ecsClient.js': function() {
          return ecsClientStub;
        },
        './route53Client.js': route53ClientStub
      };
    });

    it('should call _vpcClient.createVpcConfig once', () => {

      //Arrange
      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      let _createOrUpdateLaunchConfigurationStub = { newLaunchConfigName: 'new', oldLaunchConfigName: 'old' };

      let deployerClient = new Deployer(deployerParams);
      deployerClient._createSecurityGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateLaunchConfiguration = sandbox.stub().resolves(_createOrUpdateLaunchConfigurationStub);
      deployerClient.createS3BucketIfNecessary = sandbox.stub().resolves({});
      deployerClient._createTargetGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateAutoScaleGroup = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancer = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancerListener = sandbox.stub().resolves({});
      deployerClient._createDNSEntryForApplicationLoadBalancer = sandbox.stub().resolves({});


      //Act
      let resultPromise = deployerClient.createInfrastructure(sampleConfig1);


      //Assert
      return resultPromise.then(() => {
        expect(vpcClientStub.createVpcFromConfig.calledOnce).to.be.true;
      });
    });

    it('should call _createOrUpdateLaunchConfiguration once', () => {
      //Arrange
      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      let _createOrUpdateLaunchConfigurationStub = { newLaunchConfigName: 'new', oldLaunchConfigName: 'old' };

      let deployerClient = new Deployer(deployerParams);
      deployerClient._createSecurityGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateLaunchConfiguration = sandbox.stub().resolves(_createOrUpdateLaunchConfigurationStub);
      deployerClient.createS3BucketIfNecessary = sandbox.stub().resolves({});
      deployerClient._createTargetGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateAutoScaleGroup = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancer = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancerListener = sandbox.stub().resolves({});
      deployerClient._createDNSEntryForApplicationLoadBalancer = sandbox.stub().resolves({});


      //Act
      let resultPromise = deployerClient.createInfrastructure(sampleConfig1);


      //Assert
      return resultPromise.then(() => {
        expect(deployerClient._createOrUpdateLaunchConfiguration.calledOnce).to.be.true;
      });
    });

    it('should call _createTargetGroup once', () => {
      //Arrange
      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      let _createOrUpdateLaunchConfigurationStub = { newLaunchConfigName: 'new', oldLaunchConfigName: 'old' };

      let deployerClient = new Deployer(deployerParams);
      deployerClient._createSecurityGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateLaunchConfiguration = sandbox.stub().resolves(_createOrUpdateLaunchConfigurationStub);
      deployerClient.createS3BucketIfNecessary = sandbox.stub().resolves({});
      deployerClient._createTargetGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateAutoScaleGroup = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancer = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancerListener = sandbox.stub().resolves({});
      deployerClient._createDNSEntryForApplicationLoadBalancer = sandbox.stub().resolves({});


      //Act
      let resultPromise = deployerClient.createInfrastructure(sampleConfig1);


      //Assert
      return resultPromise.then(() => {
        expect(deployerClient._createTargetGroup.calledOnce).to.be.true;
      });
    });

    it('should call _createOrUpdateAutoScaleGroup once', () => {
      //Arrange
      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      let _createOrUpdateLaunchConfigurationStub = { newLaunchConfigName: 'new', oldLaunchConfigName: 'old' };

      let deployerClient = new Deployer(deployerParams);
      deployerClient._createSecurityGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateLaunchConfiguration = sandbox.stub().resolves(_createOrUpdateLaunchConfigurationStub);
      deployerClient.createS3BucketIfNecessary = sandbox.stub().resolves({});
      deployerClient._createTargetGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateAutoScaleGroup = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancer = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancerListener = sandbox.stub().resolves({});
      deployerClient._createDNSEntryForApplicationLoadBalancer = sandbox.stub().resolves({});


      //Act
      let resultPromise = deployerClient.createInfrastructure(sampleConfig1);


      //Assert
      return resultPromise.then(() => {
        expect(deployerClient._createOrUpdateAutoScaleGroup.calledOnce).to.be.true;
      });
    });

    it('should call _createApplicationLoadBalancer once', () => {
      //Arrange
      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      let _createOrUpdateLaunchConfigurationStub = { newLaunchConfigName: 'new', oldLaunchConfigName: 'old' };

      let deployerClient = new Deployer(deployerParams);
      deployerClient._createSecurityGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateLaunchConfiguration = sandbox.stub().resolves(_createOrUpdateLaunchConfigurationStub);
      deployerClient.createS3BucketIfNecessary = sandbox.stub().resolves({});
      deployerClient._createTargetGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateAutoScaleGroup = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancer = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancerListener = sandbox.stub().resolves({});
      deployerClient._createDNSEntryForApplicationLoadBalancer = sandbox.stub().resolves({});


      //Act
      let resultPromise = deployerClient.createInfrastructure(sampleConfig1);


      //Assert
      return resultPromise.then(() => {
        expect(deployerClient._createApplicationLoadBalancer.calledOnce).to.be.true;
      });
    });

    it('should call _createApplicationLoadBalancerListener once', () => {
      //Arrange
      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      let _createOrUpdateLaunchConfigurationStub = { newLaunchConfigName: 'new', oldLaunchConfigName: 'old' };

      let deployerClient = new Deployer(deployerParams);
      deployerClient._createSecurityGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateLaunchConfiguration = sandbox.stub().resolves(_createOrUpdateLaunchConfigurationStub);
      deployerClient.createS3BucketIfNecessary = sandbox.stub().resolves({});
      deployerClient._createTargetGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateAutoScaleGroup = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancer = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancerListener = sandbox.stub().resolves({});
      deployerClient._createDNSEntryForApplicationLoadBalancer = sandbox.stub().resolves({});


      //Act
      let resultPromise = deployerClient.createInfrastructure(sampleConfig1);


      //Assert
      return resultPromise.then(() => {
        expect(deployerClient._createApplicationLoadBalancerListener.calledOnce).to.be.true;
      });
    });

    it('should call _createDNSEntryForApplicationLoadBalancer once', () => {
      //Arrange
      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      let _createOrUpdateLaunchConfigurationStub = { newLaunchConfigName: 'new', oldLaunchConfigName: 'old' };

      let deployerClient = new Deployer(deployerParams);
      deployerClient._createSecurityGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateLaunchConfiguration = sandbox.stub().resolves(_createOrUpdateLaunchConfigurationStub);
      deployerClient.createS3BucketIfNecessary = sandbox.stub().resolves({});
      deployerClient._createTargetGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateAutoScaleGroup = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancer = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancerListener = sandbox.stub().resolves({});
      deployerClient._createDNSEntryForApplicationLoadBalancer = sandbox.stub().resolves({});


      //Act
      let resultPromise = deployerClient.createInfrastructure(sampleConfig1);


      //Assert
      return resultPromise.then(() => {
        expect(deployerClient._createDNSEntryForApplicationLoadBalancer.calledOnce).to.be.true;
      });
    });

    it('should call _ecsClient.createCluster once', () => {
      //Arrange
      //Setting up Deployer clients
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      let _createOrUpdateLaunchConfigurationStub = { newLaunchConfigName: 'new', oldLaunchConfigName: 'old' };

      let deployerClient = new Deployer(deployerParams);
      deployerClient._createSecurityGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateLaunchConfiguration = sandbox.stub().resolves(_createOrUpdateLaunchConfigurationStub);
      deployerClient.createS3BucketIfNecessary = sandbox.stub().resolves({});
      deployerClient._createTargetGroup = sandbox.stub().resolves({});
      deployerClient._createOrUpdateAutoScaleGroup = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancer = sandbox.stub().resolves({});
      deployerClient._createApplicationLoadBalancerListener = sandbox.stub().resolves({});
      deployerClient._createDNSEntryForApplicationLoadBalancer = sandbox.stub().resolves({});


      //Act
      let resultPromise = deployerClient.createInfrastructure(sampleConfig1);


      //Assert
      return resultPromise.then(() => {
        expect(ecsClientStub.createCluster.calledOnce).to.be.true;
      });
    });
  });

  describe('_createApplicationLoadBalancerListener', () => {
    describe('should handle listenerConfig which is a single object', () => {
      let vpcClientStub;
      let ec2ClientStub;
      let ecsClientStub;
      let elbClientStub;
      let autoScaleClientStub;
      let route53ClientStub;
      let cloudfrontClientStub;
      let mocks;
      beforeEach(() => {

        vpcClientStub = sandbox.stub();
        ecsClientStub = sandbox.stub();
        ec2ClientStub = sandbox.stub();
        elbClientStub = {
          getApplicationLoadBalancerArnFromName: sandbox.stub().resolves({}),
          getTargetGroupArnFromName: sandbox.stub().resolves({}),
          createListener: sandbox.stub().resolves({})
        };
        autoScaleClientStub = sandbox.stub();
        route53ClientStub = sandbox.stub();
        cloudfrontClientStub = sandbox.stub();

        mocks = {
          './vpcClient.js': vpcClientStub,
          './elbClient.js': function() {
            return elbClientStub;
          },
          './cloudFrontClient.js': cloudfrontClientStub,
          './autoScalingClient.js': autoScaleClientStub,
          './ec2Client.js': ec2ClientStub,
          './ecsClient.js': ecsClientStub,
          './route53Client.js': route53ClientStub
        };

      });

      it('should call getApplicationLoadBalancerArnFromName once', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = {
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        };

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getApplicationLoadBalancerArnFromName.calledOnce).to.be.true;
        });
      });

      it('should pass loadBalancer name to getApplicationLoadBalancerArnFromName', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = {
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        };

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getApplicationLoadBalancerArnFromName.args[0][0]).to.be.equal(listenerConfig.loadBalancerName);
        });
      });

      it('should call getTargetGroupArnFromName once', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = {
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        };

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getTargetGroupArnFromName.calledOnce).to.be.true;
        });
      });

      it('should pass targetGroupName name to getTargetGroupArnFromName', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = {
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        };

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getTargetGroupArnFromName.args[0][0]).to.be.equal(listenerConfig.targetGroupName);
        });
      });

      it('should call createListener once', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = {
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        };

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.createListener.calledOnce).to.be.true;
        });
      });

      it('should pass loadBalancerArn, targetGroupArn, protocol, and port to createListener', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = {
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        };

        let loadBalanceArn = 'somethingArn';
        elbClientStub.getApplicationLoadBalancerArnFromName = sandbox.stub();
        elbClientStub.getApplicationLoadBalancerArnFromName.withArgs(listenerConfig.loadBalancerName).resolves(loadBalanceArn);

        let targetGroupArn = 'targetGroupArn';
        elbClientStub.getTargetGroupArnFromName = sandbox.stub();
        elbClientStub.getTargetGroupArnFromName.withArgs(listenerConfig.targetGroupName).resolves(targetGroupArn);


        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.createListener.args[0][0]).to.be.equal(loadBalanceArn);
          expect(elbClientStub.createListener.args[0][1]).to.be.equal(targetGroupArn);
          expect(elbClientStub.createListener.args[0][2]).to.be.equal(listenerConfig.protocol);
          expect(elbClientStub.createListener.args[0][3]).to.be.equal(listenerConfig.port);
        });
      });

      it('should pass empty array for certificates when certificateArn is empty to createListener if exist', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = {
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80,
          certificateArn: ''
        };

        let loadBalanceArn = 'somethingArn';
        elbClientStub.getApplicationLoadBalancerArnFromName = sandbox.stub();
        elbClientStub.getApplicationLoadBalancerArnFromName.withArgs(listenerConfig.loadBalancerName).resolves(loadBalanceArn);

        let targetGroupArn = 'targetGroupArn';
        elbClientStub.getTargetGroupArnFromName = sandbox.stub();
        elbClientStub.getTargetGroupArnFromName.withArgs(listenerConfig.targetGroupName).resolves(targetGroupArn);


        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.createListener.args[0][4]).to.be.deep.equal([]);
        });
      });

      it('should pass valid array for certificates when certificateArn is populated to createListener if exist', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = {
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80,
          certificateArn: 'arn:aws:acm:us-west-2:a123213123:certificate/904-20bc-dddd-82a3-eeeeeee'
        };

        let loadBalanceArn = 'somethingArn';
        elbClientStub.getApplicationLoadBalancerArnFromName = sandbox.stub();
        elbClientStub.getApplicationLoadBalancerArnFromName.withArgs(listenerConfig.loadBalancerName).resolves(loadBalanceArn);

        let targetGroupArn = 'targetGroupArn';
        elbClientStub.getTargetGroupArnFromName = sandbox.stub();
        elbClientStub.getTargetGroupArnFromName.withArgs(listenerConfig.targetGroupName).resolves(targetGroupArn);


        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          let expectedValue = [
            {CertificateArn: listenerConfig.certificateArn}
          ];

          expect(elbClientStub.createListener.args[0][4]).to.be.deep.equal(expectedValue);
        });
      });
    });

    describe('should handle listenerConfig that is an array of a single object', () => {
      let vpcClientStub;
      let ec2ClientStub;
      let ecsClientStub;
      let elbClientStub;
      let autoScaleClientStub;
      let route53ClientStub;
      let mocks;
      beforeEach(() => {

        vpcClientStub = sandbox.stub();
        ecsClientStub = sandbox.stub();
        ec2ClientStub = sandbox.stub();
        elbClientStub = {
          getApplicationLoadBalancerArnFromName: sandbox.stub().resolves({}),
          getTargetGroupArnFromName: sandbox.stub().resolves({}),
          createListener: sandbox.stub().resolves({})
        };
        autoScaleClientStub = sandbox.stub();
        route53ClientStub = sandbox.stub();


        mocks = {
          './vpcClient.js': vpcClientStub,
          './elbClient.js': function() {
            return elbClientStub;
          },
          './autoScalingClient.js': autoScaleClientStub,
          './ec2Client.js': ec2ClientStub,
          './ecsClient.js': ecsClientStub,
          './route53Client.js': route53ClientStub
        };

      });

      it('should call getApplicationLoadBalancerArnFromName once', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        }];

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getApplicationLoadBalancerArnFromName.calledOnce).to.be.true;
        });
      });

      it('should pass loadBalancer name to getApplicationLoadBalancerArnFromName', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        }];

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getApplicationLoadBalancerArnFromName.args[0][0]).to.be.equal(listenerConfig[0].loadBalancerName);
        });
      });

      it('should call getTargetGroupArnFromName once', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        }];

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getTargetGroupArnFromName.calledOnce).to.be.true;
        });
      });

      it('should pass targetGroupName name to getTargetGroupArnFromName', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        }];

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getTargetGroupArnFromName.args[0][0]).to.be.equal(listenerConfig[0].targetGroupName);
        });
      });

      it('should call createListener once', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        }];

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.createListener.calledOnce).to.be.true;
        });
      });

      it('should pass loadBalancerArn, targetGroupArn, protocol, and port to createListener', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        }];

        let loadBalanceArn = 'somethingArn';
        elbClientStub.getApplicationLoadBalancerArnFromName = sandbox.stub();
        elbClientStub.getApplicationLoadBalancerArnFromName.withArgs(listenerConfig[0].loadBalancerName).resolves(loadBalanceArn);

        let targetGroupArn = 'targetGroupArn';
        elbClientStub.getTargetGroupArnFromName = sandbox.stub();
        elbClientStub.getTargetGroupArnFromName.withArgs(listenerConfig[0].targetGroupName).resolves(targetGroupArn);


        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.createListener.args[0][0]).to.be.equal(loadBalanceArn);
          expect(elbClientStub.createListener.args[0][1]).to.be.equal(targetGroupArn);
          expect(elbClientStub.createListener.args[0][2]).to.be.equal(listenerConfig[0].protocol);
          expect(elbClientStub.createListener.args[0][3]).to.be.equal(listenerConfig[0].port);
        });
      });

      it('should pass empty array for certificates when certificateArn is empty to createListener if exist', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80,
          certificateArn: ''
        }];

        let loadBalanceArn = 'somethingArn';
        elbClientStub.getApplicationLoadBalancerArnFromName = sandbox.stub();
        elbClientStub.getApplicationLoadBalancerArnFromName.withArgs(listenerConfig.loadBalancerName).resolves(loadBalanceArn);

        let targetGroupArn = 'targetGroupArn';
        elbClientStub.getTargetGroupArnFromName = sandbox.stub();
        elbClientStub.getTargetGroupArnFromName.withArgs(listenerConfig.targetGroupName).resolves(targetGroupArn);


        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.createListener.args[0][4]).to.be.deep.equal([]);
        });
      });

      it('should pass valid array for certificates when certificateArn is populated to createListener if exist', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80,
          certificateArn: 'arn:aws:acm:us-west-2:a123213123:certificate/904-20bc-dddd-82a3-eeeeeee'
        }];

        let loadBalanceArn = 'somethingArn';
        elbClientStub.getApplicationLoadBalancerArnFromName = sandbox.stub();
        elbClientStub.getApplicationLoadBalancerArnFromName.withArgs(listenerConfig.loadBalancerName).resolves(loadBalanceArn);

        let targetGroupArn = 'targetGroupArn';
        elbClientStub.getTargetGroupArnFromName = sandbox.stub();
        elbClientStub.getTargetGroupArnFromName.withArgs(listenerConfig.targetGroupName).resolves(targetGroupArn);


        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          let expectedValue = [
            {CertificateArn: listenerConfig[0].certificateArn}
          ];

          expect(elbClientStub.createListener.args[0][4]).to.be.deep.equal(expectedValue);
        });
      });
    });

    describe('should handle a listenerConfig that is an array of multiple objects', () => {
      let vpcClientStub;
      let ec2ClientStub;
      let ecsClientStub;
      let elbClientStub;
      let autoScaleClientStub;
      let route53ClientStub;
      let mocks;
      beforeEach(() => {

        vpcClientStub = sandbox.stub();
        ecsClientStub = sandbox.stub();
        ec2ClientStub = sandbox.stub();
        elbClientStub = {
          getApplicationLoadBalancerArnFromName: sandbox.stub().resolves({}),
          getTargetGroupArnFromName: sandbox.stub().resolves({}),
          createListener: sandbox.stub().resolves({})
        };
        autoScaleClientStub = sandbox.stub();
        route53ClientStub = sandbox.stub();

        mocks = {
          './vpcClient.js': vpcClientStub,
          './elbClient.js': function() {
            return elbClientStub;
          },
          './autoScalingClient.js': autoScaleClientStub,
          './ec2Client.js': ec2ClientStub,
          './ecsClient.js': ecsClientStub,
          './route53Client.js': route53ClientStub
        };

      });

      it('should call getApplicationLoadBalancerArnFromName once for each listenerConfig', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        },{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTPS',
          port: 443
        }];

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getApplicationLoadBalancerArnFromName.callCount).to.be.equal(2);
        });
      });

      it('should pass loadBalancer name to getApplicationLoadBalancerArnFromName for each listener', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        },{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTPS',
          port: 443
        }];

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getApplicationLoadBalancerArnFromName.args[0][0]).to.be.equal(listenerConfig[0].loadBalancerName);
          expect(elbClientStub.getApplicationLoadBalancerArnFromName.args[1][0]).to.be.equal(listenerConfig[1].loadBalancerName);
        });
      });

      it('should call getTargetGroupArnFromName once for each listenerConfig', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        },{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTPS',
          port: 443
        }];

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getTargetGroupArnFromName.callCount).to.be.equal(2);
        });
      });

      it('should pass targetGroupName name to getTargetGroupArnFromName for each listener', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        },{
          loadBalancerName: 'testName2',
          targetGroupName: 'testTargetGroupName2',
          protocol: 'HTTPS',
          port: 443
        }];

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.getTargetGroupArnFromName.args[0][0]).to.be.equal(listenerConfig[0].targetGroupName);
          expect(elbClientStub.getTargetGroupArnFromName.args[1][0]).to.be.equal(listenerConfig[1].targetGroupName);
        });
      });

      it('should call createListener once for each listenerConfig', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTP',
          port: 80
        },{
          loadBalancerName: 'testName',
          targetGroupName: 'testTargetGroupName',
          protocol: 'HTTPS',
          port: 443
        }];

        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.createListener.callCount).to.be.equal(2);
        });
      });

      it('should pass loadBalancerArn, targetGroupArn, protocol, and port to createListener for each listenerConfig', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName1',
          targetGroupName: 'testTargetGroupName1',
          protocol: 'HTTP',
          port: 80
        },{
          loadBalancerName: 'testName2',
          targetGroupName: 'testTargetGroupName2',
          protocol: 'HTTPS',
          port: 443
        }];

        let loadBalanceArn1 = 'somethingArn1';
        let loadBalanceArn2 = 'somethingArn2';
        elbClientStub.getApplicationLoadBalancerArnFromName = sandbox.stub();
        elbClientStub.getApplicationLoadBalancerArnFromName.withArgs(listenerConfig[0].loadBalancerName).resolves(loadBalanceArn1);
        elbClientStub.getApplicationLoadBalancerArnFromName.withArgs(listenerConfig[1].loadBalancerName).resolves(loadBalanceArn2);

        let targetGroupArn1 = 'targetGroupArn1';
        let targetGroupArn2 = 'targetGroupArn2';
        elbClientStub.getTargetGroupArnFromName = sandbox.stub();
        elbClientStub.getTargetGroupArnFromName.withArgs(listenerConfig[0].targetGroupName).resolves(targetGroupArn1);
        elbClientStub.getTargetGroupArnFromName.withArgs(listenerConfig[1].targetGroupName).resolves(targetGroupArn2);


        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.createListener.args[0][0]).to.be.equal(loadBalanceArn1);
          expect(elbClientStub.createListener.args[0][1]).to.be.equal(targetGroupArn1);
          expect(elbClientStub.createListener.args[0][2]).to.be.equal(listenerConfig[0].protocol);
          expect(elbClientStub.createListener.args[0][3]).to.be.equal(listenerConfig[0].port);

          expect(elbClientStub.createListener.args[1][0]).to.be.equal(loadBalanceArn2);
          expect(elbClientStub.createListener.args[1][1]).to.be.equal(targetGroupArn2);
          expect(elbClientStub.createListener.args[1][2]).to.be.equal(listenerConfig[1].protocol);
          expect(elbClientStub.createListener.args[1][3]).to.be.equal(listenerConfig[1].port);
        });
      });

      it('should pass empty array for certificates when certificateArn is empty to createListener if exist', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName1',
          targetGroupName: 'testTargetGroupName1',
          protocol: 'HTTP',
          port: 80
        },{
          loadBalancerName: 'testName2',
          targetGroupName: 'testTargetGroupName2',
          protocol: 'HTTPS',
          port: 443
        }];

        let loadBalanceArn = 'somethingArn';
        elbClientStub.getApplicationLoadBalancerArnFromName = sandbox.stub();
        elbClientStub.getApplicationLoadBalancerArnFromName.withArgs(listenerConfig.loadBalancerName).resolves(loadBalanceArn);

        let targetGroupArn = 'targetGroupArn';
        elbClientStub.getTargetGroupArnFromName = sandbox.stub();
        elbClientStub.getTargetGroupArnFromName.withArgs(listenerConfig.targetGroupName).resolves(targetGroupArn);


        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          expect(elbClientStub.createListener.args[0][4]).to.be.deep.equal([]);

          expect(elbClientStub.createListener.args[1][4]).to.be.deep.equal([]);
        });
      });

      it('should pass valid array for certificates when certificateArn is populated to createListener if exist', () => {
        //Arrange
        //Setting up Deployer clients
        const accessKey = 'acckey';
        const secretKey = 'secret';
        const region = 'us-west-2';

        const Deployer = proxyquire('../src/index', mocks);
        const deployerParams = {
          accessKey: accessKey,
          secretKey: secretKey,
          region: region
        };

        let deployerClient = new Deployer(deployerParams);
        let listenerConfig = [{
          loadBalancerName: 'testName1',
          targetGroupName: 'testTargetGroupName1',
          protocol: 'HTTP',
          port: 80
        },{
          loadBalancerName: 'testName2',
          targetGroupName: 'testTargetGroupName2',
          protocol: 'HTTPS',
          port: 443,
          certificateArn: 'arn:aws:acm:us-west-2:a123213123:certificate/904-20bc-dddd-82a3-eeeeeee'
        }];

        let loadBalanceArn = 'somethingArn';
        elbClientStub.getApplicationLoadBalancerArnFromName = sandbox.stub();
        elbClientStub.getApplicationLoadBalancerArnFromName.withArgs(listenerConfig.loadBalancerName).resolves(loadBalanceArn);

        let targetGroupArn = 'targetGroupArn';
        elbClientStub.getTargetGroupArnFromName = sandbox.stub();
        elbClientStub.getTargetGroupArnFromName.withArgs(listenerConfig.targetGroupName).resolves(targetGroupArn);


        //Act
        let resultPromise = deployerClient._createApplicationLoadBalancerListener(listenerConfig);

        //Assert
        return resultPromise.then(() => {
          let expectedValue = [
            {CertificateArn: listenerConfig[1].certificateArn}
          ];

          expect(elbClientStub.createListener.args[0][4]).to.be.deep.equal([]);

          expect(elbClientStub.createListener.args[1][4]).to.be.deep.equal(expectedValue);
        });
      });
    });
  });

  describe('lookupApiGatewayURL', () => {
    let vpcClientStub;
    let ec2ClientStub;
    let ecsClientStub;
    let elbClientStub;
    let autoScaleClientStub;
    let route53ClientStub;
    let apiClientStub;
    let mocks;
    let deployerClient;
    beforeEach(() => {

      vpcClientStub = sandbox.stub();
      ecsClientStub = sandbox.stub();
      ec2ClientStub = sandbox.stub();
      elbClientStub = sandbox.stub();
      apiClientStub = {
        lookupApiGatewayURL: sandbox.stub()
      };
      autoScaleClientStub = sandbox.stub();
      route53ClientStub = sandbox.stub();

      mocks = {
        './vpcClient.js': vpcClientStub,
        './elbClient.js': function() {
          return elbClientStub;
        },
        './autoScalingClient.js': autoScaleClientStub,
        './ec2Client.js': ec2ClientStub,
        './ecsClient.js': ecsClientStub,
        './route53Client.js': route53ClientStub,
        './apiGatewayClient': function() {
          return apiClientStub;
        }
      };

      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      deployerClient = new Deployer(deployerParams);
    });

    it('should call _apiGatewayClient.lookupApiGatewayURL once', async () => {
      // Arrange
      const apiName = 'myAPI';
      const stageName = 'myStage';

      // Act
      await deployerClient.lookupApiGatewayURL(apiName, stageName);

      // Assert
      expect(apiClientStub.lookupApiGatewayURL.callCount).to.be.equal(1);
    });

    it('should pass params to _apiGatewayClient.lookupApiGatewayURL', async () => {
      // Arrange
      const apiName = 'myAPI';
      const stageName = 'myStage';

      // Act
      await deployerClient.lookupApiGatewayURL(apiName, stageName);

      // Assert
      expect(apiClientStub.lookupApiGatewayURL.args[0][0]).to.be.equal(apiName);
      expect(apiClientStub.lookupApiGatewayURL.args[0][1]).to.be.equal(stageName);
    });
  });

  describe('lookupApiGatewayDomainName', () => {
    let vpcClientStub;
    let ec2ClientStub;
    let ecsClientStub;
    let elbClientStub;
    let autoScaleClientStub;
    let route53ClientStub;
    let apiClientStub;
    let mocks;
    let deployerClient;
    beforeEach(() => {

      vpcClientStub = sandbox.stub();
      ecsClientStub = sandbox.stub();
      ec2ClientStub = sandbox.stub();
      elbClientStub = sandbox.stub();
      apiClientStub = {
        lookupApiGatewayDomainName: sandbox.stub()
      };
      autoScaleClientStub = sandbox.stub();
      route53ClientStub = sandbox.stub();

      mocks = {
        './vpcClient.js': vpcClientStub,
        './elbClient.js': function() {
          return elbClientStub;
        },
        './autoScalingClient.js': autoScaleClientStub,
        './ec2Client.js': ec2ClientStub,
        './ecsClient.js': ecsClientStub,
        './route53Client.js': route53ClientStub,
        './apiGatewayClient': function() {
          return apiClientStub;
        }
      };

      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region
      };

      deployerClient = new Deployer(deployerParams);
    });

    it('should call _apiGatewayClient.lookupApiGatewayURL once', async () => {
      // Arrange
      const apiName = 'myAPI';

      // Act
      await deployerClient.lookupApiGatewayDomainName(apiName);

      // Assert
      expect(apiClientStub.lookupApiGatewayDomainName.callCount).to.be.equal(1);
    });

    it('should pass API name to _apiGatewayClient.lookupApiGatewayURL', async () => {
      // Arrange
      const apiName = 'myAPI';

      // Act
      await deployerClient.lookupApiGatewayDomainName(apiName);

      // Assert
      expect(apiClientStub.lookupApiGatewayDomainName.args[0][0]).to.be.equal(apiName);
    });
  });

  describe('lookupApiGatewayByName', () => {
    let vpcClientStub;
    let ec2ClientStub;
    let ecsClientStub;
    let elbClientStub;
    let autoScaleClientStub;
    let route53ClientStub;
    let apiClientStub;
    let mocks;
    beforeEach(() => {

      vpcClientStub = sandbox.stub();
      ecsClientStub = sandbox.stub();
      ec2ClientStub = sandbox.stub();
      elbClientStub = sandbox.stub();
      apiClientStub = {
        lookupApiGatewayByName: sandbox.stub()
      };
      autoScaleClientStub = sandbox.stub();
      route53ClientStub = sandbox.stub();

      mocks = {
        './vpcClient.js': vpcClientStub,
        './elbClient.js': function() {
          return elbClientStub;
        },
        './autoScalingClient.js': autoScaleClientStub,
        './ec2Client.js': ec2ClientStub,
        './ecsClient.js': ecsClientStub,
        './route53Client.js': route53ClientStub,
        './apiGatewayClient': function() {
          return apiClientStub;
        }
      };

    });
    it('should call lookupApiGatewayByName', () => {
      //Arrange
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      let deployerClient = new Deployer(deployerParams);
      //Act
      deployerClient.lookupApiGatewayByName('name');

      //Assert
      expect(apiClientStub.lookupApiGatewayByName.calledOnce).to.be.true;
    });

    it('should pass name param to lookupApiGatewayByName', () => {
      //Arrange
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      let deployerClient = new Deployer(deployerParams);

      //Act
      deployerClient.lookupApiGatewayByName('name');

      expect(apiClientStub.lookupApiGatewayByName.args[0][0]).to.equal('name');
    });
  });

  describe('createOrOverwriteApiSwagger', () => {
    let vpcClientStub;
    let ec2ClientStub;
    let ecsClientStub;
    let elbClientStub;
    let autoScaleClientStub;
    let route53ClientStub;
    let apiClientStub;
    let mocks;

    beforeEach(() => {

      vpcClientStub = sandbox.stub();
      ecsClientStub = sandbox.stub();
      ec2ClientStub = sandbox.stub();
      elbClientStub = sandbox.stub();
      apiClientStub = {
        createOrOverwriteApiSwagger: sandbox.stub()
      };
      autoScaleClientStub = sandbox.stub();
      route53ClientStub = sandbox.stub();


      mocks = {
        './vpcClient.js': vpcClientStub,
        './elbClient.js': function() {
          return elbClientStub;
        },
        './autoScalingClient.js': autoScaleClientStub,
        './ec2Client.js': ec2ClientStub,
        './ecsClient.js': ecsClientStub,
        './route53Client.js': route53ClientStub,
        './apiGatewayClient': function() {
          return apiClientStub;
        }
      };

    });
    
    it('should call createOrOverwriteApiSwagger', () => {
      //Arrange
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      const  deployerClient = new Deployer(deployerParams);
      
      //Act
      deployerClient.createOrOverwriteApiSwagger('name');
      
      //Assert
      expect(apiClientStub.createOrOverwriteApiSwagger.calledOnce).to.be.true;
    });

    it('should pass name param to createOrOverwriteApiSwagger', () => {
      //Arrange
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';

      const Deployer = proxyquire('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };

      let deployerClient = new Deployer(deployerParams);
      //Act
      deployerClient.createOrOverwriteApiSwagger({info: {title: 'dang'}});

      expect(apiClientStub.createOrOverwriteApiSwagger.args[0][0]).to.deep.equal({info: {title: 'dang'}});
    });
  });
  
  describe('upsertApiGatewayCustomDomainName', () => {
    
    let deployerClient;
    
    beforeEach(() => {
      //Arrange
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';
      
      const mocks = {
        ...defaultMocks
      };
  
      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };
  
      deployerClient = new Deployer(deployerParams);
      
      //default stubs
      deployerClient._apiGatewayClient.upsertCustomDomainName = sandbox.stub().resolves({});
      deployerClient._apiGatewayClient.upsertBasePathMapping = sandbox.stub().resolves({});
    });
    
    it('should call upsertCustomDomainName once', async () => {
      //Arrange
      const params = {
        apiGatewayId: '1231321312',
        domainName: 'something.something.com',
        basePath: '/',
        stage: 'dev'
      };
      
      //Act
      await deployerClient.upsertApiGatewayCustomDomainName(params);
      
      //Assert
      const stub = deployerClient._apiGatewayClient.upsertCustomDomainName;
      expect(stub.calledOnce).to.be.true;
    });
    
    it('should pass domainName to upsertApiGatewayCustomDomainName', async () => {
      //Arrange
      const params = {
        apiGatewayId: '1231321312',
        domainName: 'something.something.com',
        basePath: '/',
        stage: 'dev',
        regionalCertificateArn: 'fdsafadsf'
      };
  
      //Act
      await deployerClient.upsertApiGatewayCustomDomainName(params);
  
      //Assert
      const stub = deployerClient._apiGatewayClient.upsertCustomDomainName;
      expect(stub.args[0][0]).to.be.deep.equal(params.domainName);
    });
  
    it('should pass regionalCertificateArn to upsertApiGatewayCustomDomainName', async () => {
      //Arrange
      const params = {
        apiGatewayId: '1231321312',
        domainName: 'something.something.com',
        basePath: '/',
        stage: 'dev',
        regionalCertificateArn: 'fdsafadsf'
      };
  
      //Act
      await deployerClient.upsertApiGatewayCustomDomainName(params);
  
      //Assert
      const stub = deployerClient._apiGatewayClient.upsertCustomDomainName;
      expect(stub.args[0][1]).to.be.deep.equal(params.regionalCertificateArn);
    });
  
    it('should pass endpointConfiguration to upsertApiGatewayCustomDomainName', async () => {
      //Arrange
      const params = {
        apiGatewayId: '1231321312',
        domainName: 'something.something.com',
        basePath: '/',
        stage: 'dev',
        regionalCertificateArn: 'fdsafadsf'
      };
  
      //Act
      await deployerClient.upsertApiGatewayCustomDomainName(params);
  
      //Assert
      const stub = deployerClient._apiGatewayClient.upsertCustomDomainName;
      expect(stub.args[0][2]).to.be.deep.equal('REGIONAL');
    });
    
    it('should call upsertBasePathMapping once', async () => {
      //Arrange
      const params = {
        apiGatewayId: '1231321312',
        domainName: 'something.something.com',
        basePath: '/',
        stage: 'dev',
        regionalCertificateArn: 'fdsafadsf'
      };
  
      //Act
      await deployerClient.upsertApiGatewayCustomDomainName(params);
  
      //Assert
      const stub = deployerClient._apiGatewayClient.upsertBasePathMapping;
      expect(stub.calledOnce).to.be.true;
    });
    
    it('should pass domainName to upsertApiGatewayCustomDomainName', async () => {
      //Arrange
      const params = {
        apiGatewayId: '1231321312',
        domainName: 'something.something.com',
        basePath: '/',
        stage: 'dev',
        regionalCertificateArn: 'fdsafadsf'
      };
  
      //Act
      await deployerClient.upsertApiGatewayCustomDomainName(params);
  
      //Assert
      const stub = deployerClient._apiGatewayClient.upsertBasePathMapping;
      expect(stub.args[0][0]).to.be.deep.equal(params.domainName);
    });
  
    it('should pass apiGatewayId to upsertApiGatewayCustomDomainName', async () => {
      //Arrange
      const params = {
        apiGatewayId: '1231321312',
        domainName: 'something.something.com',
        basePath: '/',
        stage: 'dev',
        regionalCertificateArn: 'fdsafadsf'
      };
  
      //Act
      await deployerClient.upsertApiGatewayCustomDomainName(params);
  
      //Assert
      const stub = deployerClient._apiGatewayClient.upsertBasePathMapping;
      expect(stub.args[0][1]).to.be.deep.equal(params.apiGatewayId);
    });
    
    it('should pass basePath to upsertApiGatewayCustomDomainName', async () => {
      //Arrange
      const params = {
        apiGatewayId: '1231321312',
        domainName: 'something.something.com',
        basePath: '/',
        stage: 'dev',
        regionalCertificateArn: 'fdsafadsf'
      };
  
      //Act
      await deployerClient.upsertApiGatewayCustomDomainName(params);
  
      //Assert
      const stub = deployerClient._apiGatewayClient.upsertBasePathMapping;
      expect(stub.args[0][2]).to.be.deep.equal(params.basePath);
    });
  
    it('should pass stage to upsertApiGatewayCustomDomainName', async () => {
      //Arrange
      const params = {
        apiGatewayId: '1231321312',
        domainName: 'something.something.com',
        basePath: '/',
        stage: 'dev',
        regionalCertificateArn: 'fdsafadsf'
      };
  
      //Act
      await deployerClient.upsertApiGatewayCustomDomainName(params);
  
      //Assert
      const stub = deployerClient._apiGatewayClient.upsertBasePathMapping;
      expect(stub.args[0][3]).to.be.deep.equal(params.stage);
    });
  });
  
  describe('associateCustomDomainWithCName', () => {
  
    let deployerClient;
  
    beforeEach(() => {
      //Arrange
      const accessKey = 'acckey';
      const secretKey = 'secret';
      const region = 'us-west-2';
    
      const mocks = {
        ...defaultMocks
      };
    
      const Deployer = proxyquire.noCallThru()('../src/index', mocks);
      const deployerParams = {
        accessKey: accessKey,
        secretKey: secretKey,
        region: region,
        logLevel: 'info'
      };
    
      deployerClient = new Deployer(deployerParams);
    
      //default stubs
      deployerClient._apiGatewayClient.getCustomDomainCname = sandbox.stub().resolves('fdsajlfkdjfkla');
      deployerClient._route53Client.associateCustomDomainWithCName = sandbox.stub().resolves({});
    });
    
    it('should call getCustomDomainCname once', async () => {
      //Arrange
      const domainName = 'afdsfsafdsaf.internal.something';
      
      //Act
      await deployerClient.associateCustomDomainWithCName(domainName);
      
      
      //Assert
      const stub = deployerClient._apiGatewayClient.getCustomDomainCname;
      expect(stub.calledOnce).to.be.true;
    });
    
    it('should pass domainName to getCustomDomainCname', async () => {
      //Arrange
      const domainName = 'afdsfsafdsaf.internal.something';
  
      //Act
      await deployerClient.associateCustomDomainWithCName(domainName);
      
      //Assert
      const stub = deployerClient._apiGatewayClient.getCustomDomainCname;
      expect(stub.args[0][0]).to.be.deep.equal(domainName);
    });
  
    it('should NOT call associateCustomDomainWithCName if result from getCustomDomainCname is empty', async () => {
      //Arrange
      const domainName = 'afdsfsafdsaf.internal.something';
  
      deployerClient._apiGatewayClient.getCustomDomainCname = sandbox.stub().resolves('');
      
      //Act
      await deployerClient.associateCustomDomainWithCName(domainName);
  
  
      //Assert
      const stub = deployerClient._route53Client.associateCustomDomainWithCName;
      expect(stub.callCount).to.be.equal(0);
    });
    
    it('should call associateCustomDomainWithCName once', async () => {
      //Arrange
      const domainName = 'afdsfsafdsaf.internal.something';
      
      //Act
      await deployerClient.associateCustomDomainWithCName(domainName);
  
  
      //Assert
      const stub = deployerClient._route53Client.associateCustomDomainWithCName;
      expect(stub.calledOnce).to.be.true;
    });
    
    it('should pass domainName to associateCustomDomainWithCName', async () => {
      //Arrange
      const domainName = 'afdsfsafdsaf.internal.something';
      
      //Act
      await deployerClient.associateCustomDomainWithCName(domainName);
  
  
      //Assert
      const stub = deployerClient._route53Client.associateCustomDomainWithCName;
      expect(stub.args[0][0]).to.be.deep.equal('afdsfsafdsaf.internal.something');
    });
    
    it('should pass customDomainCname to associateCustomDomainWithCName', async () => {
      //Arrange
      const domainName = 'afdsfsafdsaf.internal.something';
  
      //Act
      await deployerClient.associateCustomDomainWithCName(domainName);
  
  
      //Assert
      const stub = deployerClient._route53Client.associateCustomDomainWithCName;
      expect(stub.args[0][1]).to.be.deep.equal('fdsajlfkdjfkla');
    });
  });
});
