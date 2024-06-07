import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import {ThemeProvider} from "@gravity-ui/uikit";
import Ro from "./Pages/RegisterPage/RegisterPage";
import {BrowserRouter as Router} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import Routing from "./components/Routing/Routing";
import { render } from 'react-dom'

import { configureStore } from '@reduxjs/toolkit'
import { useFlagsStore, useUserStore } from "./stores/UserStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const socket = new WebSocket("ws://127.0.0.1:3000/api/v2/subscribe"); 

let { apiVersion, dialogID } = useUserStore();
let { changedMessages, changedChatAvatar, changedUserAvatar, changedDialogs, changedDialog, changedMessage } = useFlagsStore();

socket.onopen = function () {
  alert("Соединение установлено.");
};

socket.onclose = function (event: any) {
  if (event.wasClean) {
    alert('Соединение закрыто чисто');
  } else {
    alert('Обрыв соединения'); // например, "убит" процесс сервера
  }
  alert('Код: ' + event.code + ' причина: ' + event.reason);
};

socket.onmessage = function (event: any) {
  switch (event.data.source) {
    case apiVersion + "/users/myAvatar": {
      changedUserAvatar = (changedUserAvatar ^ 1);
      break;
    }
    case apiVersion + "/chats":
    case apiVersion + "/chats/{id}": {
      changedDialogs = (changedDialogs ^ 1);
      if (dialogID == event.content.chatId) {
        changedDialog = (changedDialog ^ 1);
      }
      break;
    }
    case apiVersion + "/chats/{chatId}/user": {
      changedDialog = (changedDialog ^ 1);
      break;
    }
    case apiVersion + "/chats/{chatId}/avatar": {
      changedChatAvatar = (changedChatAvatar ^ 1);
      break;
    }
    case apiVersion + "/messages": {
      changedMessages = (changedMessages ^ 1);
      break;
    }
    case apiVersion + "/reaction": {
      changedMessage = (changedMessage ^ 1);
      break;
    }
    default:
  }
};

socket.onerror = function (error: any) {
  alert("Ошибка " + error);
};

root.render(
    <React.StrictMode>

        <ThemeProvider theme='light'>
            {/*<Router>*/}
                <Routing/>
            {/*</Router>*/}
        </ThemeProvider>

    </React.StrictMode>


);
