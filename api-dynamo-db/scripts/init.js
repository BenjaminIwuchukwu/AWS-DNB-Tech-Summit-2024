var response = require("./cfn-response");
var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB();
var tableName = "LocationsAndOffers";

exports.handler = function (event, context) {
  if (event.RequestType == "Create" || event.RequestType == "Update") {
    if (event.ResourceProperties.Dtype == "location") {
      var params = {
        Item: {
          PK: {
            S: event.ResourceProperties.Did,
          },
          SK: {
            S: event.ResourceProperties.Did,
          },
          address: {
            S: event.ResourceProperties.Daddress,
          },
          brandId: {
            S: event.ResourceProperties.DbrandId,
          },
          hasOffer: {
            BOOL: false,
          },
        },
        TableName: tableName,
      };
    } else {
      var params = {
        Item: {
          PK: {
            S: event.ResourceProperties.Did,
          },
          SK: {
            S: event.ResourceProperties.Did,
          },
          name: {
            S: event.ResourceProperties.Dname,
          },
          brandId: {
            S: event.ResourceProperties.DbrandId,
          },
          locationsTotal: {
            N: "0",
          },
        },
        TableName: tableName,
      };
    }

    dynamo.putItem(params, function (err, data) {
      if (err) {
        response.send(event, context, "FAILED", { params: params, err: err });
      } else {
        response.send(event, context, "SUCCESS", { params: params });
      }
    });
  }

  if (event.RequestType == "Delete") {
    response.send(event, context, "SUCCESS", {});
  }
};
