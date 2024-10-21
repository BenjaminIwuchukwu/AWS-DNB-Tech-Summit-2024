var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB();

const tableName = process.env.DynamoDBTableName;

exports.handler = function (event, context, callback) {
  var location_id = event.body.location.id;
  var offer_id = event.body.offer.id;

  var params = {
    Item: {
      PK: {
        S: location_id,
      },
      SK: {
        S: offer_id,
      },
    },
    TableName: tableName,
  };
  dynamo.putItem(params, callback);

  params = {
    ExpressionAttributeNames: {
      "#H": "hasOffer",
    },
    ExpressionAttributeValues: {
      ":h": {
        BOOL: true,
      },
    },
    Key: {
      PK: {
        S: location_id,
      },
      SK: {
        S: location_id,
      },
    },
    TableName: tableName,
    UpdateExpression: "SET #H = :h",
  };
  dynamo.updateItem(params, callback);

  params = {
    ExpressionAttributeNames: {
      "#L": "locationsTotal",
    },
    ExpressionAttributeValues: {
      ":l": {
        N: "1",
      },
    },
    Key: {
      PK: {
        S: offer_id,
      },
      SK: {
        S: offer_id,
      },
    },
    TableName: tableName,
    UpdateExpression: "SET #L = #L + :l",
  };
  dynamo.updateItem(params, callback);

  callback(null, { Success: "true" });
};
