# Copy-S3-Object-to-RDS-DB

Contains files that are necessary for IaC deployment of a solution which copies objects from S3 to RDS MySQL database

## Architecture Design

An AWS solution is required to automate the copying of objects from S3 to an SQL-like database whenever an object is uploaded to the S3 bucket. The key of the object in the SQL database should be the object key in the S3 bucket.

For this solution, a serverless implementation making use of lambdas would be preferable. This is because of the simplicity of using lambdas and time of the uploads could vary. We only want to run this operation whenever there is an upload instead of having a server instance running constantly or managing a server by ourselves.

A MySQL database is chosen as this is currently the least expensive database choice (And the AWS free tier covers all the cost if using the configuration of db.t2.micro with 20GB of storage).

<a href="https://github.com/BenjaminIwuchukwu/AWS-DNB-Tech-Summit-2024/blob/main/copy-s3-object-to-rds-db/images/AWS_architecture.jpg"><img src="https://github.com/BenjaminIwuchukwu/AWS-DNB-Tech-Summit-2024/blob/main/copy-s3-object-to-rds-db/images/AWS_architecture.jpg?raw=true" alt="AWS Architecture Diagram" border="0"></a>

python3.10 function runtime is used for the lambda functions

_NOTE: Details and description of each cloudformation parameter can be found in each parameter's description property._

## How to deploy

To deploy the stack:

1. Navigate to the cloudformation service on the AWS console
2. Upload the cloudformation template file
3. Fill in all the necessary cloudformation parameters and deploy stack

The stack can also be deployed using the **AWS CLI**.

> aws cloudformation deploy --stack-name {your stack name} --template-file file://CloudFormationStack.yml --parameter-overrides DBName={The MySQL Database name} ...

4. Upload test json files to S3 Data bucket to verify successful deployment
5. Retrieve the endpoint of the RDS MySQL database from the RDS service on the AWS console
6. Login to MySQL database to view all available data in the database
