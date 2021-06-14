import React, { useContext, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  AboutDescription,
  MetaContainer,
  SubHeaderContainer,
  Error,
  Popup,
} from "./styles";
import { Colors, Typography, Form } from "@/styles";

import "./styles.css";
import * as Assets from "./assets";
import Amplify, { API, graphqlOperation } from "aws-amplify";

const About = () => {
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [nameError, toggleName] = useState(false);
  const [emailError, toggleEmail] = useState(false);
  const [subscribed, toggleSubscribed] = useState(false);

  const subscribe = () => {
    toggleEmail(false);
    toggleName(false);
    let valid = true;

    if (name.length === 0) {
      toggleName(true);
      valid = false;
    }
    if (email.length === 0) {
      toggleEmail(true);
      valid = false;
    }
  };

  return (
    <MetaContainer>
      <Navbar />
      <div style={{ width: "100%", minHeight: "65vh", maxWidth: "1024px" }}>
        <AboutDescription>
          <div>
            <Typography.Header>Email System</Typography.Header>
            <SubHeaderContainer>
              <Typography.BodyText>Welcome, Admin.</Typography.BodyText>
            </SubHeaderContainer>
          </div>
        </AboutDescription>
      </div>
    </MetaContainer>
  );
};

export default About;
