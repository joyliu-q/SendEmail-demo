import React, { useState, useContext, useEffect, forwardRef } from "react";
import Navbar from "../../components/Navbar";
import { Container, ContainerInner } from "../../globalStyles";
import "./styles.css";
import { Colors, Typography, Form } from "../../styles";
import { Button, Header, Title, Heading } from "./styles";
import { useToasts } from "react-toast-notifications";

//Email import
import { SendEmail_manual } from "../../components/Email";
import { HACKOR_LIME } from "@/styles/Colors";
import { createEmailTemplate } from "../../functions/templates";
import { TemplatesGallery } from "../../components/Templates";

const fs = require("fs");

const UploadTemplate = () => {
  // State to store uploaded file
  const [file, setFile] = React.useState("");
  const [templateHTML, setTemplateHTML] = React.useState("");

  const [templateName, setTemplateName] = React.useState("");
  const [templateSubject, setTemplateSubject] = React.useState("");
  const [templatePlaintext, setTemplatePlaintext] = React.useState("");

  const { addToast } = useToasts();

  // Handles file upload event and updates state
  function handleUpload(event) {
    const file = event.target.files[0];

    if (file) {
      setFile(file);

      const obj_url = URL.createObjectURL(event.target.files[0]);
      const iframe = document.getElementById("viewer");
      iframe.setAttribute("src", obj_url);
      URL.revokeObjectURL(obj_url);

      // Read HTML
      const reader = new FileReader();
      reader.onload = (function (file) {
        return function (e) {
          const content = e.target.result;
          setTemplateHTML(content);
          console.log(content);
        };
      })(file);
      reader.readAsText(file);
    }
  }

  const submitForm = (event) => {
    console.log(event);
    event.preventDefault();
    if (templateHTML != "" && templateName != "" && templatePlaintext != "") {
      try {
        createEmailTemplate(
          templateName,
          templateSubject,
          templateHTML,
          templatePlaintext
        );
      } catch (error) {
        addToast(
          `An error occurred when creating this email template. Check console for more info.`,
          {
            appearance: "failure",
          }
        );
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
      addToast(`Successfully created email template, ${templateName}`, {
        appearance: "success",
      });
    } else {
      addToast(`Failed to create email template. Form fields cannot be blank`, {
        appearance: "failure",
      });
    }
  };
  return (
    <div>
      <Navbar />
      <Container>
        <ContainerInner>
          <Typography.Header>Upload Email Template</Typography.Header>
          <form onSubmit={submitForm}>
            <Typography.Header2 fontSize="24px">
              Template Name
            </Typography.Header2>
            <Form.Input
              type="text"
              name="name"
              placeholder="Email Template Name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <hr />
            <Typography.Header2 fontSize="24px">
              Email Subject
            </Typography.Header2>
            <Form.Input
              type="text"
              name="name"
              placeholder="Email Subject"
              value={templateSubject}
              onChange={(e) => setTemplateSubject(e.target.value)}
            />

            <Typography.Header2 fontSize="24px">
              Email Content
            </Typography.Header2>
            <div id="upload-box">
              <input type="file" accept=".html" onChange={handleUpload} />
              <p>File type: {file.type}</p>
              <p>File size: {file.size} bytes</p>
              <iframe
                id="viewer"
                width="100%"
                height="500px"
                style={{
                  border: `2px solid ${Colors.HACKOR_LIME}`,
                  borderRadius: "10px",
                  display: templateHTML !== "" ? "block" : "none",
                }}
              />
            </div>
            <Typography.Header2 fontSize="24px">
              Plaintext Content
            </Typography.Header2>
            <Form.BigInput
              id="plaintext"
              name="plaintext"
              placeholder="Including a plaintext version of your email will increase email accessibility and credibility :D"
              value={templatePlaintext}
              onChange={(e) => setTemplatePlaintext(e.target.value)}
            />
            <br />
            <hr />
            <label>All done?</label>
            <Form.Submit
              type="submit"
              value="Upload Email Template to AWS"
              disabled={
                templateHTML == "" ||
                templateName == "" ||
                templatePlaintext == ""
              }
            />
            <br />
            <Typography.Header2 id="error" color={Colors.HACKOR_LIME} />
            <div id="response" />
          </form>
          <TemplatesGallery />
        </ContainerInner>
      </Container>
    </div>
  );
};

export default UploadTemplate;
