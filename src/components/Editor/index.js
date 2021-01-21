import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";

// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "This is a test email from Wave. Please ignore."
    };
  }

  modules = {
    // #3 Add "image" to the toolbar
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'font': [] }],
      ["bold", "italic", "underline"],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],    
      [{ 'align': [] }],
      ["image"]
    ],
    // # 4 Add module and upload function
    imageUploader: {
      upload: file => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          fetch(
            "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
            {
              method: "POST",
              body: formData
            }
          )
            .then(response => response.json())
            .then(result => {
              console.log(result);
              resolve(result.data.url);
            })
            .catch(error => {
              reject("Upload failed");
              console.error("Error:", error);
            });
        });
      }
    }
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot" // #5 Optinal if using custom formats
  ];

  handleQuill = (event) => {
    this.setState({
      content: event
    })
    this.props.onChangeContent(event);
    //console.log(event)
  }
  
  render() {
    return (
      <ReactQuill
        theme="snow"
        modules={this.modules}
        formats={this.formats}

        name="content"
        value={this.state.content}
        placeholder="For name customization, use {{name}} in the place of the customized first name of the recipient."
        className="emailContent"
        onChange={this.handleQuill}
      />
    );
  }
}

export default Editor;
