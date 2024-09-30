import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';

export class LambdaTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloFunction = new lambda.Function(this, 'HelloLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'handler.hello',           
      code: lambda.Code.fromAsset('./lib/lambda'),
    });

    const httpApi = new apigatewayv2.HttpApi(this, 'dev-lambdaTest');

    httpApi.addRoutes({
      path: '/',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration('LambdaIntegration', helloFunction),
    });
  }
}
