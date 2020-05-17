import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import NavbarHeader from '../components/layout/Navbar'
import TheHead from '../components/layout/Head'
import { Container } from 'reactstrap';
import { useCurrentUser } from '../lib/hooks';

export default ({ children }) => {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
  };


  return (
    <> 

      <TheHead />
      <header>
          <NavbarHeader user={user} logout={handleLogout} />
      </header>
      <Container>{children}</Container>


    </>
  );
};
