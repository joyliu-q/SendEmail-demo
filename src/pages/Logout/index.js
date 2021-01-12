import React, { useState, useContext, useEffect, forwardRef } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Container, ContainerInner } from '../../globalStyles'
import './styles.css'
import { Colors, Typography, } from '../../styles'
import { Button, Header, Title, Heading } from './styles'

const Students = () => {
  return (
    <div>
      <Navbar/>
      <Container>
        <ContainerInner>
          Bye
        </ContainerInner>
      </Container>
    </div>
  )
}

export default Students
