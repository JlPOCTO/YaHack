import React, {useState} from 'react';
import '../../css/Message.css';

type Message = {
    message: any;
}

function Message(props:Message) {
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
export default Message;
