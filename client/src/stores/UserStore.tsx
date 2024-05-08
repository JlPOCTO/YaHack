import {makeAutoObservable} from "mobx";
import React, {useContext, useRef} from "react";

export default class UserStore{
    constructor(dialogID : number) {
        this.dialogID = dialogID
        makeAutoObservable(this)
    }
    state : string = ""
    setState = (state: string) => {
        this.state = state
    }

    dialogID : number|any = 0
    setDialogID = (dialogID: number|any) => {
        this.dialogID = dialogID
    }
    userID : number|any = 1
    setUserID = (userID: number|any) => {
        this.userID = userID
    }

}
const UserStoreContext = React.createContext<UserStore>(
    null as unknown as UserStore
)
export const useUserStore = () => useContext(UserStoreContext)
type Props = {
    children: React.ReactNode,
    dialogID : number
}
export function UserStoreProvider({children, dialogID}:Props ){
    const store = useRef(new UserStore(dialogID))
    return(
        <UserStoreContext.Provider value={store.current}>
            {children}
        </UserStoreContext.Provider>
    )
}