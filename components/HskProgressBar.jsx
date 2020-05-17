
import React, { useState } from 'react';
import { Col, Card } from 'reactstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from '../lib/AnimatedProgressProvider';

const HskProgressBar = (props) => {
const [visible, setVisible] = useState(false);
const handleClick = () => {
    setVisible(true)
}

return (
  <Col> 
    <p className="text-center">
      HSK
      {props.HSKlevel}
    </p>
    
    <AnimatedProgressProvider valueStart={0} valueEnd={props.value} duration={3.4} easingFunction={easeQuadInOut}>
    {(value) => {
        const myColor = `rgb(${255-(2.55*value)}, ${2.55*value}, 0)`;
        const roundedValue = Math.round(value);
        return ( <CircularProgressbar value={value} maxValue="100" text={`${roundedValue}%`}  styles={buildStyles({ pathTransition: 'none', pathColor: myColor, })}/> )
    }}
    </AnimatedProgressProvider>

    <div>
      <p className="text-center"> {(props.value >= 100) ? "Complete." : <a className="clickable word" onClick={e => setVisible(true)}>view remaining {props.unknown.length} words.</a>} </p>
     {visible ? <ul>{props.unknown.map((v) => (<li><a className="word" onClick={(e) => props.handleClick(v, false)}>{v}</a></li>))}</ul> : null }
    </div>
</Col>
)};

export default HskProgressBar;
