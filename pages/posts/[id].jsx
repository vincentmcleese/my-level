
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useCurrentUser } from '../../lib/hooks';
import { Col, Row, Alert, Spinner, Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText  } from 'reactstrap';
import useSwr from 'swr'
import Loading from '../../components/Loading'

const fetcher = url => fetch(url).then(res => res.json())


export default function Post() {

  const [user, { mutate }] = useCurrentUser();
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const onDismiss = () => setVisible(false);

  //this should be abstracted to a hook lib 
  const router = useRouter()
  const { data, error } = useSwr(`/api/post/${router.query.id}`, fetcher)

  const handleClick = async (word, operation) => {
    setMsg('');
    setVisible(true)
    setIsUpdating(true);
    const body = { word }
  
    const res = await fetch(`/api/user/words/${operation===true ? 'pull' : 'push'}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      setMsg(`"${word}" has been ${operation===true ? 'removed from' : 'added to'} your word list.`);
    } else {
      setMsg('Error');
    }
    setIsUpdating(false);
  }

  const renderText = (text, chinese, known) => {
    const matchArray = text.map(e => e.map(word => known.includes(word)))
    const classNameArray = chinese.map((e, index1) => e.map((word, index2) => {
      if (word===false){
          return ""
      } else if (matchArray[index1][index2]===true){
          return "k word"
      } else {
          return "u word"
      }
      }))
    return text.map((block, index1) => {
      return (<div className="content-div" key={index1}>{
          block.map((word, index2) => {
            return (<span key={index2} className={classNameArray[index1][index2]} value={word} onClick={e => handleClick(word, matchArray[index1][index2])}>{word}</span>)
          })
        }</div>)
    })
  }
  



  if (error) return <div>Failed to load post</div>
  if (!data) return <Loading />

  return (
  
    <>
      <div className="alert text-center"> <Alert color="primary" isOpen={visible} toggle={onDismiss}> {isUpdating ? "Loading..." : msg }</Alert>  </div>
      <Row>
        <Card className="full-post-card">
          <CardHeader>Article</CardHeader>
          <CardBody>
              <CardTitle><h4>{data.title}</h4></CardTitle>
              <CardText>{renderText(data.parsedText, data.isChinese, user.words)}</CardText>
          </CardBody>
        </Card>
      </Row>
    </>
)
}

