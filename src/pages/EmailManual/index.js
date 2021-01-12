import React, { useState, useContext, useEffect, forwardRef } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Container, ContainerInner } from '../../globalStyles'
import './styles.css'
import { Colors, Typography, } from '../../styles'
import { Button, Header, Title, Heading } from './styles'

//Email import
import { SendEmail_manual } from '../../components/Email'

const OK = () => {
  return (
    <div>
      <Navbar/>
      <Container>
        <ContainerInner>
          <SendEmail_manual/>
        </ContainerInner>
      </Container>
    </div>
  )
}

export default OK
