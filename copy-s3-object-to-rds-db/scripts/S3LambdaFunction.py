import os, boto3
import urllib.parse
import pymysql

DBName = os.environ['DBName']
DBUsername = os.environ['DBUsername']
DBPassword = os.environ['DBPassword']
DBHost = os.environ['DBHost']

try:
    conn = pymysql.connect(host=DBHost, user=DBUsername, password=DBPassword, database=DBName)
except pymysql.MySQLError as e:
    print('Error connecting to database.')
    raise e

s3 = boto3.client('s3')

def handler(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        response_body = response['Body']
        data_body = response_body.read()
        with conn.cursor() as cur:
            cur.execute("create table if not exists data_table (filename varchar(99) NOT NULL, data json, PRIMARY KEY (filename))")
            cur.execute("insert into data_table values(%s, %s)", (key, data_body))
        conn.commit()
    except Exception as e:
        print('Error copying object {} from bucket {} to database.'.format(key, bucket))
        raise e
