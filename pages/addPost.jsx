import React, { useState } from 'react';
import {Row, Col, Button, Form, FormGroup, Label, Input, FormText, Alert} from 'reactstrap';
import Head from 'next/head';
import Router from 'next/router';
import { useCurrentUser } from '../lib/hooks';


const AddPost = () => {
  const [user] = useCurrentUser();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: e.currentTarget.title.value,
      body: e.currentTarget.body.value.split('\n')
    };
    
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    debugger
    if (res.status === 200) {
        Router.replace('/posts')
    } else {
      setErrorMsg(await res.text());
    }
  };

  return (
    <>
    <Head>
      <title>Add Post</title>
    </Head>
    <h2>Add a Post</h2>
    <Form onSubmit={handleSubmit}>
      {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}

      <FormGroup>
      <Label htmlFor="title"> Title </Label>
        <Input
          id="title"
          type="title"
          name="title"
          placeholder="title"
        />
        </FormGroup>

      <FormGroup>
      <Label htmlFor="body"> Text </Label>
        <Input
          id="body"
          type="textarea"
          name="body"
          placeholder="body"
          rows="7"
        />
        </FormGroup>
    
      <Button type="submit">Add post</Button>
    </Form>
  </>
  );
};



export default AddPost;
