import React, { useState } from 'react';
import { Row, Col, Jumbotron, Container, Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';

import Head from 'next/head';
import Link from 'next/link';
import Error from 'next/error';
import middleware from '../../../middlewares/middleware';
import { useCurrentUser } from '../../../lib/hooks';
import { getUser } from '../../../lib/db';
import Loading from '../../../components/Loading'

export default function UserPage({ user }) {
  if (!user) return <Error statusCode={404} />;
  const {
    name, email, bio, profilePicture,
  } = user || {};
  const [currentUser] = useCurrentUser();
  const isCurrentUser = currentUser?._id === user._id;


  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Row>

      <Card className="profile-card">
        <CardHeader>Profile</CardHeader>
        <CardBody>
          <Row xs="4">
          <Col>
             <img className="profile-image" src={profilePicture} width="256" height="256" alt={name} />
          </Col>
          <Col xs="6">
            <CardTitle><h4>{name}</h4></CardTitle>
            <CardText>name: {name} <br/> email: {email} <br/>about: {bio}</CardText>
          </Col>
          </Row>
        </CardBody>
        {isCurrentUser && (
             <CardFooter className="text-muted"><Link href="/settings">
              <button type="button">Edit</button>
            </Link></CardFooter>
            )}
      </Card>



    
      </Row>
      <Row>

      </Row>
    </>
  );
}

export async function getServerSideProps(context) {
  await middleware.apply(context.req, context.res);
  const user = await getUser(context.req, context.params.userId);
  if (!user) context.res.statusCode = 404;
  return {
    props: {
      user,
    }, // will be passed to the page component as props
  };
}
