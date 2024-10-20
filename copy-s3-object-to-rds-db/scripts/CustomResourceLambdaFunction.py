import boto3, cfnresponse

s3 = boto3.resource('s3')

def handler(event, context):
    responseData={}
    try:
        if event['RequestType'] == 'Delete':
            Bucket=event['ResourceProperties']['Bucket']
            delete_notification(Bucket)
            print("Sending response to custom resource after " + event['RequestType'] + " request.")
        elif event['RequestType'] == 'Create' or event['RequestType'] == 'Update':
            LambdaArn=event['ResourceProperties']['LambdaArn']
            Bucket=event['ResourceProperties']['Bucket']
            add_notification(LambdaArn, Bucket)
            responseData={'Bucket': Bucket}
            print("Sending response to custom resource after " + event['RequestType'] + " request.")
        responseStatus = 'SUCCESS'
    except Exception as e:
        print('Failed to process:', e)
        responseStatus = 'FAILED'
        responseData = {'error': e}
    cfnresponse.send(event, context, responseStatus, responseData)

def add_notification(LambdaArn, Bucket):
    s3.BucketNotification(Bucket).put(
        NotificationConfiguration={
            'LambdaFunctionConfigurations': [
                {
                    'LambdaFunctionArn': LambdaArn,
                    'Events': [
                        's3:ObjectCreated:*'
                    ]
                }
            ]
        }
    )
    print("Add request completed.")

def delete_notification(Bucket):
    s3.BucketNotification(Bucket).put(
        NotificationConfiguration={}
    )
    print("Delete request completed.")
