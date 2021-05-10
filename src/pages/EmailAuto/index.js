import React, { useState, useContext, useEffect, forwardRef } from "react";
import Navbar from "../../components/Navbar";
import { Container, ContainerInner } from "../../globalStyles";
import "./styles.css";
import { Colors, Typography } from "../../styles";
import { Button, Header, Title, Heading } from "./styles";

//Email import
import { SendEmail_auto } from "../../components/Email";

const Auto = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <ContainerInner>
          <SendEmail_auto />
        </ContainerInner>
      </Container>
    </div>
  );
};

export default Auto;
