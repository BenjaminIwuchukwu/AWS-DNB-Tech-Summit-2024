echo "make-pymysql-layer-zip.sh START"

mkdir package
pip install pymysql --target package

cd package
zip -r ../pymysql.zip .

echo "make-pymysql-layer-zip.sh END"
