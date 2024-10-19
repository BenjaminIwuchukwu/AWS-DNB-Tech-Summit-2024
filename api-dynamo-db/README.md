# Api-Dynamo-DB

Contains files that are necessary for Iac deployment of an api which is connected to dynamo database

Nodejs18 function runtime is used for the lambda functions

## How to deploy

To deploy the stack:

1. Navigate to the cloudformation service on the AWS console
2. Upload the cloudformation template file
3. Fill in all the necessary cloudformation parameters and deploy stack

The stack can also be deployed using the **AWS CLI**.

> aws cloudformation deploy --stack-name {your stack name} --template-body file://CloudFormationStack.yml --parameter-overrides S3LambdaBucket={S3 bucket that stores the lambda scripts} ...

The API endpoint can be retrieved from the output in ApiGatewayInvokeURL.

4. To test, send a POST request to the API endpoint
