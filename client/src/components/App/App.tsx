import '../../css/App.css';
import SideBar from '../SideBar/SideBar';
import Body from '../BodyMain/BodyMain';
import { useUserStore } from "../../stores/UserStore";
import {observer } from "mobx-react-lite"
import {useEffect } from 'react';

function App() {

  let { apiVersion, dialogID } = useUserStore();
  let { socket, setSocket } = useUserStore();

  let { getChangedUserAvatar, setChangedUserAvatar } = useUserStore();
  let { getChangedDialogs, setChangedDialogs, getChangedDialog, setChangedDialog } = useUserStore();
  let { getChangedChatAvatar, setChangedChatAvatar } = useUserStore();
  let { getChangedMessages, setChangedMessages, getChangedMessage, setChangedMessage } = useUserStore();

  if (!socket) {
    setSocket(new WebSocket("ws://team5.ya-itmo.ru/api/v2/subscribe"));

    let { socket } = useUserStore();

    socket.onopen = function () {
      //alert("Connected");
    };

    socket.onclose = function (event: any) {
      //
    };
    socket.onmessage = function (event: any) {
      var json = JSON.parse(event.data);
      switch (json.source) {
        case apiVersion + "/users/myAvatar": {
          setChangedUserAvatar(!getChangedUserAvatar());
          break;
        }
        case apiVersion + "/chats":
        case apiVersion + "/chats/:id": {
          setChangedDialogs(!getChangedDialogs());
          if (dialogID == event.content.chatId) {
            setChangedDialog(!getChangedDialog());
          }
          break;
        }
        case apiVersion + "/chats/:chatId/user": {
          setChangedDialogs(!getChangedDialogs());
          setChangedDialog(!getChangedDialog());
          break;
        }
        case apiVersion + "/chats/:chatId/avatar": {
          setChangedChatAvatar(!getChangedChatAvatar());
          break;
        }
        case apiVersion + "/messages": {
          setChangedDialogs(!getChangedDialogs());
          setChangedMessages(!getChangedMessages());
          break;
        }
        case apiVersion + "/reaction": {
          setChangedMessage(!getChangedMessage());
          break;
        }
        default:
      }
    };

    socket.onerror = function (error: any) {
      alert("������ " + error);
    };
  }

    return (
        <div className="App">
            <SideBar />
            <Body />
        </div>
    );
}

export default observer(App);
