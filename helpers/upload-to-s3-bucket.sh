echo "upload-to-s3.sh START"

source_file=${1}
s3_bucket_name=${2}
aws s3 cp ${source_file} "s3://${s3_bucket_name}/${source_file}"

echo "upload-to-s3.sh END"
