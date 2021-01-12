import React, { useState, useContext, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import {
  NavbarContainer,
  NavbarInner,
  BrandText,
  Links,
  Button,
  NavItem,
  Hamburger,
  Bar,
  SideBar,
  Brand,
  NavbarDropdown,
  DropdownItem
} from './styles'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Logo from './logo.svg'
import LogoTextFull from './logo with type (1).svg'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

const Navbar = () => {
  const [emailShow, setEmailShow] = useState(false)
  const [slide, toggleSlide] = useState(false)

  return (
    <NavbarContainer>
      <NavbarInner>
        <BrandText onClick={() => window.location.href = '/'}src={LogoTextFull} />
        <Brand onClick={() => window.location.href = '/'} src={Logo} />
        <Links>
          <NavItem onMouseEnter={() => setEmailShow(true)}
            onMouseLeave={() => setEmailShow(false)}>
            <Link>Send Email</Link>
            {emailShow && (<NavbarDropdown>
              <Link to="/email/manual">
                <DropdownItem>
                  Custom Recipients
                </DropdownItem>
              </Link>
              <Link to="/email/auto">
                <DropdownItem>
                  Send to Newsletter Lists
                </DropdownItem>
              </Link>
            </NavbarDropdown>
            )}
          </NavItem>
          <AmplifySignOut button-text="Custom Text"></AmplifySignOut>
          {/*<NavItem>
            <Link to="/logout">Logout</Link>
          </NavItem>*/}
          {/* <NavItem>
            <Link to="/blog">Blog</Link>
          </NavItem> */}
          {/* <NavItem style={{ border: 'none' }}>
            {accountStatus}
          </NavItem> */}
        </Links>
        <Hamburger slide={slide} onClick={() => toggleSlide(!slide)}>
          <div style={{ backgroundColor: 'rgb(240,240,240)', width: 40, height: 40, borderRadius: 20, marginLeft: -5, marginTop: -4, position: 'absolute', zIndex: 1 }}></div>
          <Bar num={0} rotate1={slide && true} slide={slide} style={{ position: 'relative', zIndex: 2 }}/>
          <Bar num={2} rotate2={slide && true} slide={slide} style={{ position: 'relative', zIndex: 3 }}/>
          <Bar num={1} rotate3={slide && true} slide={slide} style={{ position: 'relative', zIndex: 2 }}/>
        </Hamburger>

        <SideBar show={slide}>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/login">Login</Link>
          </NavItem>
          {/*
          <NavItem>
            <Link to="/courses">Courses</Link>
          </NavItem>
          <NavItem>
            <Link to="/speakers">Speakers</Link>
          </NavItem>
          */}
          <NavItem>
            <Link to="/email/manual">Email: Custom Recipients</Link>
          </NavItem>
          <NavItem>
            <Link to="/email/auto">Email: Send to Newsletter List</Link>
          </NavItem>
          {/*}
          <NavItem>
            <Link to="/sign-in">Dashboard</Link>
          </NavItem>
          */}
        </SideBar>
      </NavbarInner>
    </NavbarContainer>
  )
}

export default Navbar
