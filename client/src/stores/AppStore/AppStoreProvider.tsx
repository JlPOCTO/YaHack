import { createContext, useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { createAppStore } from './AppStore';

const Context = createContext(null);
type SideBarProps = {
    test : string;
}
// @ts-ignore
export const AppStoreProvider = observer(({ children, ...props }) => {
    const store = useLocalObservable(() => createAppStore(props as SideBarProps));
    // @ts-ignore
    return <Context.Provider value={store}>{children}</Context.Provider>;
});

export const useAppStore = () => {
    const store = useContext(Context);
    if (!store) throw new Error('Use App store within provider!');
    return store;
};