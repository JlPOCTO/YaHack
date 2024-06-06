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
                  <p>{message.senderId}</p>
              </div>
              <div className="text">
                  <p>{message.content}</p>
              </div>
              <div className="data">
                  <p>{message.sendingTime}</p>
              </div>
          </div>
      </div>

  );
}
export default MyMessage;
