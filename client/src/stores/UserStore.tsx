import {makeAutoObservable} from "mobx";
import React, {useContext, useRef} from "react";

export default class UserStore {
    constructor(dialogID: number) {
        this.dialogID = dialogID
        makeAutoObservable(this)
    }

    storedContacts: Map<number, number> = new Map;
    addContact = (userId: number, chatId: number) => {
      if (!this.storedContacts.has(userId))
        this.storedContacts.set(userId, chatId);
    }
    deleteContact = (userId: number) => {
      this.storedContacts.delete(userId);
    }
    getContact = (userId: number) => {
      return this.storedContacts.get(userId);
    }

    state: string = ""
    setState = (state: string) => {
        this.state = state
    }

    dialogID: number | any = 0
    setDialogID = (dialogID: number | any) => {
        this.dialogID = dialogID
    }
    chatName: string | any = ""
    setChatName = (chatName: string | any) => {
        this.chatName = chatName
    }
    userID: number | any = 1
    setUserID = (userID: number | any) => {
        this.userID = userID
    }
    currentUserID: number | any = null
    setCurrentUserID = (currentUserID: number | any) => {
        this.currentUserID = currentUserID
    }
    theme: string | any = 'light'
    setTheme = () => {
        this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
    language: string | any = "ru"
    setLanguage = (lan: string | any) => {
        this.language = lan
    }
    searchInput: string | any = ""
    setSearchInput = (input: string | any) => {
        this.searchInput = input
    }
    flag: boolean| any = true
    setFlag = (input: boolean | any) => {
        this.flag = input
    }
    apiVersion: string | any = "/api/v2"
    setApiVersion = (input: string | any) => {
        this.apiVersion = input
    }
    chatUsers : Set<number>|any = []
    setChatUsers = (input:Set<number>|any)=>{
        this.chatUsers = input
    }
    visible : boolean|any = false
    setVisible = (input: boolean | any) => {
        this.visible = input
  }

  changedMessages: boolean | any = false
  setChangedMessages = (input: boolean | any) => {
    this.changedMessages = input
  }
  getChangedMessages = () => {
    return this.changedMessages;
  }
  changedUserAvatar: boolean | any = false
  setChangedUserAvatar = (input: boolean | any) => {
    this.changedUserAvatar = input
  }
  getChangedUserAvatar = () => {
    return this.changedUserAvatar;
  }
  changedChatAvatar: boolean | any = false
  setChangedChatAvatar = (input: boolean | any) => {
    this.changedChatAvatar = input
  }
  getChangedChatAvatar = () => {
    return this.changedChatAvatar;
  }
  changedDialogs: boolean | any = false
  setChangedDialogs = (input: boolean | any) => {
    this.changedDialogs = input
  }
  getChangedDialogs = () => {
    return this.changedDialogs;
  }
  changedDialog: boolean | any = false
  setChangedDialog = (input: boolean | any) => {
    this.changedDialog = input
  }
  getChangedDialog = () => {
    return this.changedDialog;
  }
  changedMessage: boolean | any = false
  setChangedMessage = (input: boolean | any) => {
    this.changedMessage = input
  }
  getChangedMessage = () => {
    return this.changedMessage;
  }
  socket: WebSocket | any = null
  setSocket = (input: boolean | any) => {
    this.socket = input
  }
}

const UserStoreContext = React.createContext<UserStore>(
  null as unknown as UserStore
);
export const useUserStore = () => useContext(UserStoreContext)
type Props = {
    children: React.ReactNode,
    dialogID: number
}

export function UserStoreProvider({children, dialogID}: Props) {
    const store = useRef(new UserStore(dialogID))
    return (
        <UserStoreContext.Provider value={store.current}>
            {children}
        </UserStoreContext.Provider>
    )
}