import React, {useState} from 'react';
import '../../css/MyMessage.css';

type MyMessage = {
    message: any;
}

function MyMessage(props:MyMessage) {
    const { message } = props;
  return (

      <div className="container">
          <div className="arrow">
              <div className="outer"></div>
              <div className="inner"></div>
          </div>
          <div className="message-body">
              <div className="author">
                  <p>{message.idFrom}</p>
              </div>
              <div className="text">
                  <p>{message.message}</p>
              </div>
              <div className="data">
                  <p>{message.time.substring(19, 24)}</p>
              </div>
          </div>
      </div>

  );
}
export default MyMessage;
