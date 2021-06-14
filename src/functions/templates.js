const AWS = require("aws-sdk");
AWS.config.region = "us-west-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-west-2:7cfb5c42-5177-4fc0-a45a-7e2ab2e1a345",
});

export const createEmailTemplate = (
  templateName,
  templateSubject,
  templateHTML,
  templatePlaintext
) => {
  const SES = new AWS.SES();

  console.log(templateHTML);

  var params = {
    Template: {
      TemplateName: templateName,
      SubjectPart: templateSubject,
      HtmlPart: templateHTML,
      TextPart: templatePlaintext,
    },
  };

  SES.createTemplate(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      alert(err, err.stack);
    }
  });
};

export const listEmailTemplates = () => {
  const SES = new AWS.SES();

  const templatesPromise = SES.listTemplates({ MaxItems: 10 }).promise();

  return templatesPromise;
};

export const addSubscribers = () => {
  const fs = require("fs");
  const csv = require("csv-parser");

  const client = new AWS.DynamoDB.DocumentClient();
  const table = "HackOR";

  fs.createReadStream("input.csv")
    .pipe(csv())
    .on("data", (row) => {
      console.log(row);

      const params = {
        TableName: table,
        Item: {
          id: row.email,
          email: row.email,
          first: row.first,
          last: row.last,
        },
      };
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
};
