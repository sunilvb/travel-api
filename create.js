import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
        // The attributes of the item to be created
        userid: event.requestContext.identity.cognitoIdentityId, // The id of the author
        bookingid: uuid.v1(), // A unique uuid
        fname: data.fname, // Parsed from request body
        lname: data.lname, // Parsed from request body
        email: data.email, // Parsed from request body
        phone: data.phone, // Parsed from request body
        stdate: data.stdate, // Parsed from request body
        endate: data.endate, // Parsed from request body
        adults: data.adult,
        child: data.child,
        type: data.type,
        createdAt: Date.now(), // Current Unix timestamp
      },
  };

  await dynamoDb.put(params);

  return params.Item;
});