import React, { useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const NavbarHeader = (props) => {
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);
  return (
    <>
    <style jsx>
    {`
      .active {
        color: white;
      },

    `}
  </style>
    <Navbar color="light" light expand="md">
    <Link href="/">
      <NavbarBrand className="clickable word">myLevel</NavbarBrand>
    </Link>
    <NavbarToggler onClick={toggle} />

    <Collapse isOpen={isOpen} navbar>
      <Nav className="ml-auto" navbar pills>
        {!props.user ? (
          <>
            <NavItem>  <NavLink> <Link href="/login">Login </Link> </NavLink> </NavItem>
            <NavItem > <NavLink active> <Link  href="/signup"><div className="active clickable">Sign up </div></Link> </NavLink> </NavItem>

          </>
        ) : (
          <>
            <NavItem>  <NavLink> <Link href="/posts">Read Chinese </Link> </NavLink> </NavItem>
            <NavItem>  <NavLink> <Link href="/user/[userId]" as={`/user/${props.user._id}`}>Profile </Link> </NavLink> </NavItem>
            <NavItem>  <NavLink> <a tabIndex={0} role="button" onClick={props.logout}>Logout</a> </NavLink> </NavItem>
          </>
        )}

      </Nav>
    </Collapse>
  </Navbar>
</>
  );
};

export default NavbarHeader;