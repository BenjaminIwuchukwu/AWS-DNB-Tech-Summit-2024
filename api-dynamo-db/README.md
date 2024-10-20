# Api-Dynamo-DB

Contains files that are necessary for Iac deployment of an api which is connected to dynamo database

## Architecture Design

An AWS solution is required to save the available offers in a particular location of an e-commerce platform to a key-value database by making a POST API call to an API endpoint.

For this solution, a serverless implementation making use of lambdas would be preferable. This is because of the simplicity of using lambdas and the offers do not have a regular period for updates. We only want to save the details when there is an offer instead of having a server instance running constantly or managing a server by ourselves.

<a href="https://github.com/BenjaminIwuchukwu/AWS-DNB-Tech-Summit-2024/blob/main/api-dynamo-db/images/AWS_architecture.jpg"><img src="https://github.com/BenjaminIwuchukwu/AWS-DNB-Tech-Summit-2024/blob/main/api-dynamo-db/images/AWS_architecture.jpg?raw=true" alt="AWS Architecture Diagram" border="0"></a>

Nodejs18 function runtime is used for the lambda functions

## How to deploy

To deploy the stack:

1. Navigate to the cloudformation service on the AWS console
2. Upload the cloudformation template file
3. Fill in all the necessary cloudformation parameters and deploy stack

The stack can also be deployed using the **AWS CLI**.

> aws cloudformation deploy --stack-name {your stack name} --template-body file://CloudFormationStack.yml --parameter-overrides ApiResourcePath={Resource path for AWS API Gateway} ...

The API endpoint can be retrieved from the output in ApiGatewayInvokeURL.

4. To test, send a POST request to the API endpoint
