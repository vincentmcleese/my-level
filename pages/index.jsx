import React, { useState, useEffect } from 'react';
import {
  Row, Col, Alert, Spinner,Jumbotron, Container
} from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import useSwr from 'swr';
import { useCurrentUser } from '../lib/hooks';
import { hskWords } from '../lib/hsk-levels';
import HskProgressBar from '../components/HskProgressBar';
import ErrorBoundary from '../lib/ErrorBoundary';

const IndexPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const levels = [1, 2, 3, 4, 5, 6];

  const onDismiss = () => setVisible(false);

  const handleClick = async (word, operation) => {
    setMsg('');
    setVisible(true);
    setIsUpdating(true);
    const body = { word };
    const res = await fetch(`/api/user/words/${operation === true ? 'pull' : 'push'}`, {
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
      setMsg(`"${word}" has been ${operation === true ? 'removed from' : 'added to'} your word list.`);
    } else {
      setMsg('Error');
    }
    setIsUpdating(false);
  };


  const HSKcomprehension = (HSKlevel) => {
    const total = hskWords[HSKlevel].words.length;
    const known = hskWords[HSKlevel].words.map((word) => user.words.includes(word));
    const knownTotal = known.filter((v) => v).length;
    const unknown = hskWords[HSKlevel].words.filter((word) => !user.words.includes(word));
    const comprehension = (knownTotal / total) * 100;
    return (<HskProgressBar HSKlevel={HSKlevel} value={comprehension} unknown={unknown} handleClick={handleClick} />);
  };


  return (
    <>
      {user ? (
        <>
       
          <div className="alert">
            {' '}
            <Alert color="primary" isOpen={visible} toggle={onDismiss}>
              {' '}
              {isUpdating ? "Loading..." : msg }
            </Alert>
            {' '}
          </div>
          <h4>Your progress dashboard:</h4>
          <Row xs="6">
            <ErrorBoundary>
              {levels.map((level) => HSKcomprehension(level))}
            </ErrorBoundary>
          </Row>

        </>
      ) : (
        <>
          <Row>
            <h2>Hello!</h2>
          </Row>
        </>
      )}
    </>
  );
};

export default IndexPage;
