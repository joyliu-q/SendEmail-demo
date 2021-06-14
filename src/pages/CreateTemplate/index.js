import React, { useState, useContext, useEffect, forwardRef } from "react";
import Navbar from "../../components/Navbar";
import { Container, ContainerInner } from "../../globalStyles";
import { Colors, Typography, Form } from "../../styles";
import { Button, Header, Title, Heading } from "./styles";
import { useToasts } from "react-toast-notifications";

//Email import
import { SendEmail_manual } from "../../components/Email";
import { HACKOR_LIME } from "@/styles/Colors";
import { createEmailTemplate } from "../../functions/templates";
import { TemplatesGallery } from "../../components/Templates";
import Editor from "../../components/Editor";

import parse from "html-react-parser";

const CreateTemplate = () => {
  // State to store uploaded file
  const [file, setFile] = React.useState("");
  const [templateHTML, setTemplateHTML] = React.useState("");

  const [templateName, setTemplateName] = React.useState("");
  const [templateSubject, setTemplateSubject] = React.useState("");
  const [templatePlaintext, setTemplatePlaintext] = React.useState("");

  const { addToast } = useToasts();

  const getContent = (childData) => {
    setTemplateHTML(childData);
    return childData;
  };

  const submitForm = (event) => {
    console.log(event);
    event.preventDefault();
    if (templateHTML != "" && templateName != "" && templatePlaintext != "") {
      try {
        createEmailTemplate(
          templateName,
          templateSubject,
          WRAPPER_FRONT + templateHTML + WRAPPER_BACK,
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
          <Typography.Header>Create Email Template</Typography.Header>
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
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  width: "50%",
                  maxWidth: "calc(100% - 600px) + 50px",
                  margin: "0 50px 0 0",
                }}
              >
                <Editor name="content" onChangeContent={getContent} />
                <Form.BigInput
                  id="plaintext"
                  name="plaintext"
                  placeholder="Including a plaintext version of your email will increase email accessibility and credibility :D"
                  value={templatePlaintext}
                  onChange={(e) => setTemplatePlaintext(e.target.value)}
                />
              </div>
              <div
                style={{
                  width: "50%",
                  maxWidth: "600px",
                  resize: "horizontal",
                  overflow: "auto",
                }}
              >
                {parse(WRAPPER_FRONT + templateHTML + WRAPPER_BACK)}
              </div>
            </div>

            <br />
            <hr />
            <label>All done?</label>
            <Form.Submit
              type="submit"
              value="Create Email Template and Upload"
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

export default CreateTemplate;

const WRAPPER_FRONT = `
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
	<title> </title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style type="text/css">
	#outlook a {
		padding: 0;
	}

	.ReadMsgBody {
		width: 100%;
	}

	.ExternalClass {
		width: 100%;
	}

	.ExternalClass * {
		line-height: 100%;
	}

	body {
		margin: 0;
		padding: 0;
		-webkit-text-size-adjust: 100%;
		-ms-text-size-adjust: 100%;
	}

	table,
	td {
		border-collapse: collapse;
		mso-table-lspace: 0pt;
		mso-table-rspace: 0pt;
	}

	img {
		border: 0;
		height: auto;
		line-height: 100%;
		outline: none;
		text-decoration: none;
		-ms-interpolation-mode: bicubic;
	}

	p {
		display: block;
		margin: 13px 0;
		font-family: 'Open Sans', sans-serif;
		font-size: 15px;
  }

  a {
    color: #07B494;
  }
	</style>
	<style type="text/css">
	@media only screen and (max-width:480px) {
		@-ms-viewport {
			width: 320px;
		}
		@viewport {
			width: 320px;
		}
	}
	</style>
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
	<style type="text/css">
	@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
	@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
	</style>
	<style type="text/css">
	@media only screen and (min-width:480px) {
		.mj-column-per-100 {
			width: 100% !important;
			max-width: 100%;
		}
	}
	</style>
	<style type="text/css">
	@media only screen and (max-width:480px) {
		table.full-width-mobile {
			width: 100% !important;
		}
		td.full-width-mobile {
			width: auto !important;
		}
	}
	</style>
	<style type="text/css">
	.hide_on_mobile {
		display: none !important;
	}

	@media only screen and (min-width: 480px) {
		.hide_on_mobile {
			display: block !important;
		}
	}

	.hide_section_on_mobile {
		display: none !important;
	}

	@media only screen and (min-width: 480px) {
		.hide_section_on_mobile {
			display: table !important;
		}
		div.hide_section_on_mobile {
			display: block !important;
		}
	}

	.hide_on_desktop {
		display: block !important;
	}

	@media only screen and (min-width: 480px) {
		.hide_on_desktop {
			display: none !important;
		}
	}

	.hide_section_on_desktop {
		display: table !important;
	}

	@media only screen and (min-width: 480px) {
		.hide_section_on_desktop {
			display: none !important;
		}
	}

	[owa] .mj-column-per-100 {
		width: 100%!important;
	}

	[owa] .mj-column-per-50 {
		width: 50%!important;
	}

	[owa] .mj-column-per-33 {
		width: 33.333333333333336%!important;
	}

	p,
	h1,
	h2,
	h3 {
		margin: 0px;
	}

	a {
		text-decoration: none;
	}

	@media only print and (min-width:480px) {
		.mj-column-per-100 {
			width: 100%!important;
		}
		.mj-column-per-40 {
			width: 40%!important;
		}
		.mj-column-per-60 {
			width: 60%!important;
		}
		.mj-column-per-50 {
			width: 50%!important;
		}
		mj-column-per-33 {
			width: 33.333333333333336%!important;
		}
	}
	</style>
</head>

<body style="background-color:#07B494;">
	<div style="background-color:#07B494;">
		<div style="background:#FFFAF3;background-color:#FFFAF3;Margin:0px auto;max-width:600px;">
			<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFAF3;background-color:#FFFAF3;width:100%;">
				<tbody>
					<tr>
						<td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
							<div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
								<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
									<tr>
										<td align="center" style="font-size:0px;padding:24px 0px 24px 0px;word-break:break-word;">
											<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
												<tbody>
													<tr>
														<td style="width:180px;"> <img height="auto" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/609af31c8e93f/1620768731.jpg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="180"> </td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</table>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFAF3;background-color:#FFFAF3;width:100%;">
				<tbody>
					<tr>
						<td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
							<div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
								<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
									<tr>
										<td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
											<div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
`;

const WRAPPER_BACK = `
</div>
										</td>
									</tr>
								</table>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div style="background:#C3DB63;background-color:#C3DB63;Margin:0px auto;max-width:600px;">
			<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#C3DB63;background-color:#C3DB63;width:100%;">
				<tbody>
					<tr>
						<td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
							<div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
								<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
									<tr>
										<td align="center" vertical-align="middle" style="font-size:0px;padding:20px 20px 0px 20px;word-break:break-word;">
											<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:auto;line-height:100%;">
												<tr>
													<td align="center" bgcolor="#FFFAF3" role="presentation" style="border:0px solid #000;border-radius:24px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#FFFAF3;" valign="middle"> <a href="https://hackor.org" style="display: inline-block; background: #FFFAF3; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: normal; line-height: 100%; Margin: 0; text-decoration: none; text-transform: none; padding: 9px 26px 9px 26px; mso-padding-alt: 0px; border-radius: 24px;" target="_blank">
              Visit the HackOR Website
            </a> </td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td align="center" style="font-size:0px;padding:10px 10px 10px 10px;word-break:break-word;">
											<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
												<tr>
													<td style="padding:4px;">
														<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:35px;">
															<tr>
																<td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
																	<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/thehackor" target="_blank" style="color: #0F997F;"> <img alt="facebook" height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/ikony-black/outlinedblack/facebook.png" style="border-radius:3px;display:block;" width="35"> </a>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
												<tr>
													<td style="padding:4px;">
														<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:35px;">
															<tr>
																<td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
																	<a href="https://www.instagram.com/thehackor" target="_blank" style="color: #0F997F;"> <img alt="instagram" height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/ikony-black/outlinedblack/instagram.png" style="border-radius:3px;display:block;" width="35"> </a>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
												<tr>
													<td style="padding:4px;">
														<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:35px;">
															<tr>
																<td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
																	<a href="https://www.linkedin.com/company/hackor" target="_blank" style="color: #0F997F;"> <img alt="linkedin" height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/ikony-black/outlinedblack/linkedin.png" style="border-radius:3px;display:block;" width="35"> </a>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
												<tr>
													<td style="padding:4px;">
														<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:35px;">
															<tr>
																<td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
																	<a href="https://www.youtube.com/channel/UCIzlR0MkGYlPj0iGTDDVtLg/videos?view=57" target="_blank" style="color: #0F997F;"> <img height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/ikony-black/outlinedblack/youtube.png" style="border-radius:3px;display:block;" width="35"> </a>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</body>

</html>
`;
