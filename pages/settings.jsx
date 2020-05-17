import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText, Alert} from 'reactstrap';

const ProfileSection = () => {
  const [user, { mutate }] = useCurrentUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const nameRef = useRef();
  const bioRef = useRef();
  const profilePictureRef = useRef();
  const [msg, setMsg] = useState({ message: '', isError: false });

  useEffect(() => {
    nameRef.current.value = user.name;
    bioRef.current.value = user.bio;
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    const formData = new FormData();
    if (profilePictureRef.current.files[0]) { formData.append('profilePicture', profilePictureRef.current.files[0]); }
    formData.append('name', nameRef.current.value);
    formData.append('bio', bioRef.current.value);
    const res = await fetch('/api/user', {
      method: 'PATCH',
      body: formData, 
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      setMsg({ message: 'Profile updated' });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    const body = {
      oldPassword: e.currentTarget.oldPassword.value,
      newPassword: e.currentTarget.newPassword.value,
    };
    e.currentTarget.oldPassword.value = '';
    e.currentTarget.newPassword.value = '';

    const res = await fetch('/api/user/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      setMsg({ message: 'Password updated' });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  };

  async function sendVerificationEmail() {
    await fetch('/api/user/email/verify', {
      method: 'POST',
    });
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Row><h2>Edit Profile</h2></Row>
    
        {msg.message ? <p style={{ color: msg.isError ? 'red' : '#0070f3', textAlign: 'center' }}>{msg.message}</p> : null}
        <Form onSubmit={handleSubmit}>
          {!user.emailVerified ? (
            <p>
              Your email has not been verify.
              {' '}
              {/* eslint-disable-next-line */}
                <a role="button" onClick={sendVerificationEmail}>
                  Send verification email
                </a>
            </p>
          ) : null}

          <FormGroup>
          <Label htmlFor="name"> Name </Label>
            <Input
              required
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              ref={nameRef}
            />
          </FormGroup>

          <FormGroup>
          <Label htmlFor="bio"> Bio </Label>
            <Input
              id="bio"
              name="bio"
              type="textarea"
              placeholder="Bio"
              ref={bioRef}
            />
          </FormGroup>
            
            
          <FormGroup>
          <Label htmlFor="avatar"> Profile Picture </Label>
            <Input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              ref={profilePictureRef}
            />
          </FormGroup>

          <Button disabled={isUpdating} type="submit">Save</Button>
        </Form>

        <Form onSubmit={handleSubmitPasswordChange}>

        <FormGroup>
          <Label htmlFor="oldpassword"> Old password </Label>
            <Input
              type="password"
              name="oldPassword"
              id="oldpassword"
              required
            />
          </FormGroup>

          <FormGroup>
          <Label htmlFor="newpassword">New password </Label>
            <Input
              type="password"
              name="newPassword"
              id="newpassword"
              required
            />
           </FormGroup>

          <Button type="submit">Change Password</Button>
        </Form>
        </Col>
        </Row>

    </>
  );
};

const SettingPage = () => {
  const [user] = useCurrentUser();

  if (!user) {
    return (
      <>
        <p>Please sign in</p>
      </>
    );
  }
  return (
    <>
      <h1>Settings</h1>
      <ProfileSection />
    </>
  );
};

export default SettingPage;
