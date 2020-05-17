import React, { useState } from 'react';
import { Spinner } from 'reactstrap';

const Loading = () => {

    return (
        <div className="d-flex row h-100 justify-content-center align-items-center"><Spinner /></div>

    )

}

export default Loading