import '../../css/App.css';
import SideBar from '../SideBar/SideBar';
import Body from '../BodyMain/BodyMain';
import { useUserStore } from "../../stores/UserStore";

function App() {
  const socket = new WebSocket("ws://127.0.0.1:3000/api/v2/subscribe");

  let { apiVersion, dialogID } = useUserStore();
  let { changedMessages, changedChatAvatar, changedUserAvatar, changedDialogs, changedDialog, changedMessage } = useUserStore();

  socket.onopen = function () {
    alert("Connected");
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

    return (
        <div className="App">
            <SideBar />
            <Body />
        </div>
    );
}

export default App;
