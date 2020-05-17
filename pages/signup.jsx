import React, { useState, useEffect } from 'react';
import {
  Row, Col, Button, Form, FormGroup, Label, Input, FormText, Alert,
} from 'reactstrap';
import Head from 'next/head';
import Router from 'next/router';
import { useCurrentUser } from '../lib/hooks';

const SignupPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
      hsklevel: e.currentTarget.hsklevel.value,
    };
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Row>
            <h2>Sign up</h2>
          </Row>
        <Form onSubmit={handleSubmit}>

          <FormGroup>
            <Label htmlFor="name">name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
            />

          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">e-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
            />

          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
            />

          </FormGroup>
          <FormGroup>
            <Label htmlFor="hsklevel">
              <select
                id="hsklevel"
                name="hsklevel"
                type="hsklevel"
              >
                <option value="0">Complete beginner (0 words)</option>
                <option value="1">HSK 1</option>
                <option value="2">HSK 2</option>
                <option value="3">HSK 3</option>
                <option value="4">HSK 4</option>
                <option value="5">HSK 5</option>
                <option value="6">HSK 6</option>
              </select>
            </Label>
          </FormGroup>
          <p>
            Unsure about your HSK level? Take a quick test to find out
            <a href="http://www.wumaocorp.com/hskcheck/">here.</a>
          </p>
          {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}
          <Button type="submit">Sign up</Button>
        </Form>
        </Col>
      </Row>
    </>
  );
};

export default SignupPage;
