const AWS = require("aws-sdk");
AWS.config.region = "us-west-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-west-2:7cfb5c42-5177-4fc0-a45a-7e2ab2e1a345",
});

addSubscribers = () => {
  const fs = require("fs");
  const csv = require("csv-parser");

  const client = new AWS.DynamoDB.DocumentClient();
  const table = "HackOR";

  fs.createReadStream("input.csv")
    .pipe(csv())
    .on("data", (row) => {
      const params = {
        TableName: table,
        Item: {
          id: row.email,
          email: row.email,
          first: row.first,
          last: row.last,
        },
      };

      console.log(params);

      client.put(params, function (err, data) {
        if (err) {
          console.error(
            "Unable to add item. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
        }
      });
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
};

addSubscribers();
