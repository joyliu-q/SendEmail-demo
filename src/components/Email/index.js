import { Container, ContainerInner } from "@/globalStyles";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "./styles";
import "./styles.css";
import { Colors, Typography, Form } from "@/styles";

import { API, graphqlOperation } from "aws-amplify";
import { listNewsletters } from "../../graphql/queries";
import { getAccount } from "./functions.js";

// Editor: WIP
import Editor from "../Editor";

const AWS = require("aws-sdk");

// ReactQuill
const ReactQuill = require("react-quill");
require("react-quill/dist/quill.snow.css");

const fetchStudentsInfo = async () => {
  try {
    var studentList = [];
    //var studentDestinations = [];
    var nextToken = null;
    do {
      const studentData = await API.graphql(
        graphqlOperation(listNewsletters, { nextToken })
      );
      studentList = studentList.concat(studentData.data.listNewsletters.items);
      nextToken = studentData.data.listNewsletters.nextToken;
    } while (nextToken != null);
    //updateStudents(studentList);
  } catch (error) {
    console.log("error on fetching students", error);
  }

  const studentDestinations = studentList.map((student) => {
    const container = {
      Destination: {
        ToAddresses: [student.email],
      },
      ReplacementTemplateData: '{ "name":"' + student.first_name + '"}',
    };
    return container;
  });
  return studentDestinations;
};

const updateEmailTemplate = (subject, content, logo) => {
  AWS.config.region = "us-west-2";
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-west-2:7cfb5c42-5177-4fc0-a45a-7e2ab2e1a345",
  });

  const SES = new AWS.SES();

  // Old Markdown Stuff
  /*var params = {
        Template: {
        TemplateName: 'wave_test_template',
        SubjectPart: '[Wave] Automatic Test Email',
        TextPart: `Dear {{name}},
            This is an automatic test email sent out by Wave. Thank you again and have a nice day!`
        }
    };*/

  /*let markdownToHTML = converter.makeHtml(content)
    let html = `
    <body>` + markdownToHTML + `</body>
    `*/

  // SES defaults to using <p></p> with double space
  // Drop all <p> and replace </p> with </br> to prevent this issue

  //content = content.replaceAll('<p>', '');
  //content = content.replaceAll('</p>', '');

  console.log(content);

  let html =
    `
    <body>` +
    content +
    `</body>`;

  console.log("LOGO: " + logo);
  if (logo == true) {
    html =
      html +
      '<img src="https://trello-attachments.s3.amazonaws.com/5a64de93a3ce5a4385d18c69/1029x99/0b74d83d010262a761eefa2e524dfc33/logo.png" alt="Wave Learning Festival" width="300px"/>';
  }

  var params = {
    Template: {
      TemplateName: "wave_test_template",
      SubjectPart: subject,
      TextPart: content,
      HtmlPart: html,
    },
  };

  SES.updateTemplate(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};

const sendBulkEmails = async (recipients) => {
  AWS.config.region = "us-west-2";
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-west-2:7cfb5c42-5177-4fc0-a45a-7e2ab2e1a345",
  });

  const SES = new AWS.SES();

  // Reset fields
  let unsuccessfulEmails = [];
  let successfulMessageId = {};

  let displayErrEmails = "";
  let emails = recipients.split(/\r\n|\r|\n/);
  // format: {"bob@wavelf.org": []}
  const accounts = {};
  emails.forEach((email) => {
    try {
      // if there is information on the name, extract it
      // TODO: more adv extraction
      /*let info = email.split(" ");
            console.log("Address: " + info[0]);
            console.log("Name: " + info[1]);*/

      // In the actual Wave feature, it gets the emails based of the functions.js, but here as a project, only joy@wavelf.org is available

      //let sourceEmail = getAccount(email.toLowerCase());
      let sourceEmail = "hello@hackor.org"; //:D
      if (Object.keys(accounts).includes(sourceEmail)) {
        accounts[sourceEmail].push({
          Destination: {
            ToAddresses: [email],
          },
          ReplacementTemplateData: '{ "name":"Wave User"}',
        });
      } else {
        accounts[sourceEmail] = [
          {
            Destination: {
              ToAddresses: [email],
            },
            ReplacementTemplateData: '{ "name":"Wave User"}',
          },
        ];
      }
    } catch (error) {
      displayErrEmails += "Something went wrong with address: " + email + "\n";
      unsuccessfulEmails.push(email[0]);
      console.error(error);
    }
  });
  for (let sourceEmail in accounts) {
    let destinations = accounts[sourceEmail];
    // Split destinations into batches of 50
    var batched_destination = [];
    while (destinations[0]) {
      batched_destination.push(destinations.splice(0, 50));
    }
    console.log(batched_destination);
    for (const batch in batched_destination) {
      var sendEmailParams = {
        ConfigurationSetName: "email_config_set",
        DefaultTags: [
          {
            Name: "email_cloudwatch_data",
            Value: "Null",
          },
        ],
        Source: "hello@hackor.org",
        Template: "wave_test_template",
        Destinations: batched_destination[batch],
        DefaultTemplateData: '{ "name":"Hackor"}',
      };
      let sendPromise = SES.sendBulkTemplatedEmail(sendEmailParams).promise();
      await sendPromise
        .then(function (data) {
          data.Status.forEach(function (status, i) {
            console.log("Status: " + status.Status);
            // If no MessageId, send is unsuccessful
            if (typeof status.MessageId === "undefined") {
              console.log("Error: " + status.Error);
              unsuccessfulEmails.push({
                email: batched_destination[batch][i].Destination.ToAddresses,
                error: status.Error,
              });
            }
            // Else, send is successful
            else {
              successfulMessageId[
                batched_destination[batch][i].Destination.ToAddresses
              ] = status.MessageId;
            }
          });
        })
        .catch(function (err) {
          console.error(err, err.stack);
        });
      // Wait 1 second
      //console.log("Wait 3 second patience")
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("Starting new batch. . .");
    }
  }
  console.log("Unsuccessful Emails");
  console.log(unsuccessfulEmails);
  console.log("Successful Emails and MessageId");
  console.log(successfulMessageId);

  if (unsuccessfulEmails.length > 0) {
    alert(
      "All emails sent with some email issues (e.g. not an actual email, etc). Check console.log for more info."
    );
    unsuccessfulEmails.forEach((email) => {
      console.log(email);
    });
  } else {
    alert("All emails sent!");
  }
};
const sendBulkEmails_auto = async (recipient) => {
  var destinations;
  AWS.config.region = "us-west-2";
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-west-2:7cfb5c42-5177-4fc0-a45a-7e2ab2e1a345",
  });

  const SES = new AWS.SES();
  switch (recipient) {
    case "students":
      destinations = await fetchNewsletterInfo();
      break;
    case "internal":
      destinations = await fetchWaveTeamInfo();
    default:
      alert("Database is down so method not available");
      console.error("OWO");
      break;
  }

  console.log(destinations);

  // Override destinations for testing
  destinations = [
    {
      Destination: {
        ToAddresses: ["joyliu.q@gmail.com"],
      },
      ReplacementTemplateData: '{ "name":"Joy"}',
    },
    {
      Destination: {
        ToAddresses: ["joyliu@wharton.upenn.edu"],
      },
      ReplacementTemplateData: '{ "name":"Epic Gamer"}',
    },
  ];
  var sendEmailParams = {
    Source: "joy@wavelf.org",
    Template: "wave_test_template",
    Destinations: destinations,
    DefaultTemplateData: '{ "name":"Wave User"}',
  };
  console.log(sendEmailParams);

  // Testing Snip above
  console.log("sending to " + destinations.length + " emails.");

  // Split destinations into batches of 50
  var batched_destination = [];
  while (destinations[0]) {
    batched_destination.push(destinations.splice(0, 50));
  }
  console.log(batched_destination);

  for (const batch in batched_destination) {
    var sendEmailParams = {
      Source: "joy@wavelf.org",
      Template: "wave_test_template",
      Destinations: batched_destination[batch],
      DefaultTemplateData: '{ "name":"Wave User"}',
    };
    console.log("Sending batch #" + batch);
    console.log(sendEmailParams);
    SES.sendBulkTemplatedEmail(sendEmailParams).promise();
  }

  console.log("send function executed");
};
/* Database stuff:
    1. fetch list of students
    2. find email/names from list of students
    3. create SES ReplacementTemplateData from #2
    4. when sendEmail button clicked: send email to all these ppl
*/

export const SendEmail_manual = () => {
  const initialEmailData = Object.freeze({
    recipient: "",
    subject: "",
    uselogo: false,
  });

  const [formData, updateFormData] = React.useState(initialEmailData);
  const [contentData, updateContentData] = React.useState("");

  const getContent = (childData) => {
    updateContentData({ content: childData });
    return childData;
  };

  const handleChange = (event) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [event.target.name]: event.target.value.trim(),
    });
    console.log(formData);
    console.log(contentData);
  };

  const handleCheck = (event) => {
    updateFormData({
      ...formData,
      ["uselogo"]: event.currentTarget.checked,
    });
  };

  const submitEmailForm = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log("Content");
    console.log(contentData);
    if (
      formData.subject != "" &&
      contentData.content != "" &&
      formData.recipient != ""
    ) {
      updateEmailTemplate(
        formData.subject,
        contentData.content,
        formData.uselogo
      );
      sendBulkEmails(formData.recipient);
      alert("Sending emails. Please wait.");
    } else {
      alert("Form fields cannot be blank");
    }
  };

  return (
    <form>
      <Typography.Header2 fontSize="24px">Recipients</Typography.Header2>
      <Form.BigInput
        id="emailRecipient"
        name="recipient"
        onChange={handleChange}
        placeholder="List of emails, separatec by commas (no space). Example: bob@gmail.com,jim@gmail.com
                "
      />
      <hr />
      <Typography.Header2 fontSize="24px">Email Content</Typography.Header2>
      <Typography.Header2 fontSize="16px">
        Note: due to the database being currently down, using {"{{name}}"}
        in the email content would return the user's name "Wave User" rather
        than the name itself.
      </Typography.Header2>
      <Form.Input
        name="subject"
        placeholder="Email Subject"
        onChange={handleChange}
      />
      <Editor name="content" onChangeContent={getContent} />
      <br />
      <input
        type="checkbox"
        id="checklogo"
        name="uselogo"
        value="false"
        checked={formData.uselogo}
        onClick={handleCheck}
      />
      <label for="checklogo">include wave logo</label>
      <Button type="submit" onClick={submitEmailForm}>
        <p>Send to All Recipients</p>
      </Button>
      <br />
      <hr />
      <Typography.Header2 id="error" color={Colors.WLF_ORANGE} />
      <div id="response" />
    </form>
  );
};

export const SendEmail_auto = () => {
  const initialEmailData = Object.freeze({
    subject: "",
    content: "",
    uselogo: false,
  });

  const [formData, updateFormData] = React.useState(initialEmailData);
  const [emailRecipient, updateRecipient] = React.useState("students");

  const handleChange = (event) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleQuill = (event) => {
    updateFormData({
      ...formData,

      content: event,
    });
    console.log(formData);
  };
  const handleCheck = (event) => {
    updateFormData({
      ...formData,
      ["uselogo"]: event.currentTarget.checked,
    });
  };

  const handleDropdown = (event) => {
    updateRecipient(event.target.value);
    console.log("dropdown changed: " + event.target.value);
  };

  const submitEmailForm = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log("recipient: " + emailRecipient);
    if (formData.subject != "" && formData.content != "") {
      updateEmailTemplate(formData.subject, formData.content, formData.uselogo);
      sendBulkEmails_auto(emailRecipient);
      alert("Sending emails. Please wait.");
    } else {
      alert("Form fields cannot be blank");
      document.getElementById("emailContent").focus();
    }
  };

  return (
    <form>
      <Typography.Header2 fontSize="24px">
        Send email to
        <Form.HeaderDropdown onChange={(event) => handleDropdown(event)}>
          <option value="students">Students</option>
          <option value="instructors">Instructors</option>
          <option value="tutors">Tutors</option>
          <option value="all">Students, Instructors, Tutors</option>
          <option value="internal">Internal: Wave Team Members</option>
        </Form.HeaderDropdown>
      </Typography.Header2>
      <Form.Input
        id="emailSubject"
        name="subject"
        placeholder="Email Subject"
        onChange={handleChange}
      />
      <ReactQuill
        name="content"
        value={formData.content}
        placeholder="For name customization, use {{name}} in the place of the customized first name of the recipient."
        className="emailContent"
        onChange={handleQuill}
      />
      <br />
      <input
        type="checkbox"
        id="checklogo"
        name="uselogo"
        value="false"
        checked={formData.uselogo}
        onClick={handleCheck}
      />
      <label for="checklogo">include wave logo</label>
      <Button type="submit" onClick={submitEmailForm}>
        <p>Send to All Students</p>
      </Button>
    </form>
  );
};

const fetchNewsletterInfo = async () => {
  try {
    var studentList = [];
    //var studentDestinations = [];
    var nextToken = null;
    do {
      const studentData = await API.graphql(
        graphqlOperation(listNewsletters, { nextToken })
      );
      studentList = studentList.concat(studentData.data.listNewsletters.items);
      //console.log('studentData', studentData)
      nextToken = studentData.data.listNewsletters.nextToken;
      //console.log('studentList', studentList)
    } while (nextToken != null);
    //updateStudents(studentList);
  } catch (error) {
    console.log("error on fetching students", error);
  }

  const studentDestinations = studentList.map((student) => {
    const container = {
      Destination: {
        ToAddresses: [student.email],
      },
      ReplacementTemplateData: '{ "name":"' + student.first_name + '"}',
    };
    return container;
  });
  return studentDestinations;
};

const fetchWaveTeamInfo = async () => {
  var docClient = new AWS.DynamoDB.DocumentClient();
  const waveTeamDestinations = [];
  var params = {
    TableName: "WaveTeamEmails",
  };
  docClient.scan(params, onScan);
  function onScan(err, data) {
    if (err) {
      console.log(
        "Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2)
      );
    } else {
      data.Items.forEach(function (member) {
        waveTeamDestinations.push({
          Destination: {
            ToAddresses: [member.email],
          },
          ReplacementTemplateData: '{ "name":"' + member.name + '"}',
        });
      });
      params.ExclusiveStartKey = data.LastEvaluatedKey;
    }
  }
  return waveTeamDestinations;
};
