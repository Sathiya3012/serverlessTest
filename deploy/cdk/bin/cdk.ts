#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaTestStack } from '../lib/lambdaTest-stack';

const app = new cdk.App();
new LambdaTestStack(app, 'LambdaTestStack');