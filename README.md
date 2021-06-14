# SendMail Demo
SendMail Demo is a web-based platform for sending custom newsletters using Amazon Webserice's Simple Email Services (AWS SES).

##### Table of Contents  
- [Installation](#installation)
- [Usage](#usage)
  * [Making an Email](#making-an-email)
    + [Upload Template](#upload-template)
    + [Create Template](#create-template)
    + [Email Template Gallery](#email-template-gallery)
  * [Sending an Email](#sending-an-email)
    + [Newsletters](#newsletters)
    + [Custom Recipients](#custom-recipients)
  * [Example Screenshots](#example-screenshots)
    + [Login Screen](#login-screen)
    + [Upload Template Example](#upload-template-example)
    + [Create Template Example](#create-template-example)
    + [Email Template Gallery](#email-template-gallery-1)
    + [Send to Newsletter Recipients](#send-to-newsletter-recipients)
    + [Send to Custom Recipients](#send-to-custom-recipients)
- [Contributing](#contributing)
- [License](#license)

# Installation
- To run the deployed version of SendMail Demo, feel free to [reach out to me](joyliu@seas.upenn.edu) for the demo username & password :D
- To run this project locally, clone this Github project and run `npm start`

# Usage
## Making an Email
### Upload Template
**Description**: Upload a prewritten `.html` email template and provide the necessary parameters - template name, subject, plaintext
Currently, just the `.html` format is supported in this sandbox. However, ideally in the future, SendMail should be able to accomodate formats such as markdown or pug.

### Create Template
**Description**: Too lazy to code an entire `.html` email? You can use our CreateTemplate page to write and style a template by typing into the **rich text editor**. CreateTemplate takes your input from rich text (live) and add them into a new template draft. After hitting "submit", a new email template will be created, including all of the default components (e.g. header, footer, logo, default email style). 

### Email Template Gallery
**Description**: Wireframe email template gallery component, showing all of the templates used & created (minimally styled so far) 

## Sending an Email
There are two types of emails: templates to a regular audience/known recipients (e.g. newsletters) and emails to unknown/individuals who haven't subscribed yet (e.g. marketing & outreach emails). For the first type, the recipients are stored in a database on the cloud, and we only need to call a function that grabs all of their data. For the second type, information about the recipients (e.g. name) are often less known or more difficult to consolidate. Additionally, you may only need to email them once: it would be inefficient to store it on a database. 

### Newsletters
**Description**: Send emails to your newsletter recipients/hackathon attendees/long-term users. Input the email template name & select the group of newsletter receipients (e.g. students, users, etc).

### Custom Recipients
**Description**: Send emails to unsubscribed recipients/custom list/one-time emails. Input the email template name & a list of email addresses you want to send to. Currently, this method is less developed and doesn't support too much email customization (e.g. "Dear Joy" instead of "Dear User"). Ideally, customization can be done by doing a csv upload instead of textbox input for recipients or by having multiple columns for recipients (with customization fields being generated specific to fields used in the email template).

## Example Screenshots
### Login Screen
![image](https://user-images.githubusercontent.com/34288846/121840319-d40e5c80-cc90-11eb-9f26-fbfe1332ce5b.png)
### Upload Template Example
![image](https://user-images.githubusercontent.com/34288846/121838996-eb981600-cc8d-11eb-8ad6-45e31cefdaf0.png)
### Create Template Example
Credit: [Summer photo created by freepik](https://www.freepik.com/photos/summer')
![image](https://user-images.githubusercontent.com/34288846/121838937-d28f6500-cc8d-11eb-8e57-ba2a029462a1.png)
### Email Template Gallery
![image](https://user-images.githubusercontent.com/34288846/121838148-0bc6d580-cc8c-11eb-9449-7d3374486860.png)
### Send to Newsletter Recipients
Screenshot not shown due to private user information.
### Send to Custom Recipients
![image](https://user-images.githubusercontent.com/34288846/121839123-43cf1800-cc8e-11eb-8028-97a564d9e8ec.png)

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# License
[MIT](https://choosealicense.com/licenses/mit/)
