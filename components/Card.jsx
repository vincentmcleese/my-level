import React, { useState } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardHeader, CardFooter, CardSubtitle, Button
} from 'reactstrap';
import Link from 'next/link'

const postCard = (props) => {
  const [hover, setHover] = useState(false)

  return (

      <Card className="content-card"  onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {hover ? (<div className="d-flex row h-100 justify-content-center align-items-center">READ</div>) : (
          <>
        <CardImg top width="100%" src="/318x180.svg" alt="Card image cap" />
        <CardBody>
          <CardTitle className="content-title"><p>{props.title}</p></CardTitle>
    
          <CardText></CardText>
        </CardBody>
        <CardFooter><p>Comprehension: {props.comprehension}%</p></CardFooter>
        </>
        )}
      </Card>

  );
};

export default postCard;