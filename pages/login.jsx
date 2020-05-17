import React, { useState, useEffect } from 'react';
import {
  Row, Col, Button, Form, FormGroup, Label, Input, FormText, Alert,
} from 'reactstrap';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../lib/hooks';

const LoginPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/');
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg('Incorrect username or password. Try again!');
    }
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
     
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Row>
            <h2>Sign in</h2>
          </Row>
          <Form onSubmit={onSubmit}>
            {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}

            <FormGroup>
              <Label htmlFor="email">e-mail</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email address"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
              />
            </FormGroup>

            <Button type="submit">Sign in</Button>
            <Link href="/forget-password">
              <a>Forget password</a>
            </Link>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
