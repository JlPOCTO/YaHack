import '../../css/HeaderOfBodyMain.css';
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {useUserStore} from "../../stores/UserStore";
import {observer} from "mobx-react-lite";
import {Icon, Modal} from "@gravity-ui/uikit";
import {EllipsisVertical} from "@gravity-ui/icons";
import Contacts from "../Contacts/Contacts";
import {useEffect, useState} from "react";
import ModalGroupSettings from "../ModalGroupSettings/ModalGroupSetting";

type DialogProps = {
    dialogId: any;
}

function HeaderOfBodyMain(props: any) {
    // let {setSearchInput, setDialogID, apiVersion, userID} = useUserStore();
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);
    const {dialogID, chatName, apiVersion} = useUserStore();

    return (
        <div className="header-of-body-main-pro">
            <div className="someSpace">

            </div>
            <div className="header-of-body-main">
                <div className="info-chat">
                    <div className="dialog-name">
                        {dialogID}
                    </div>
                    <div className="status">
                        {t('status')}
                    </div>
                </div>
            </div>
            <div className="chat-settings">
                <button className="chat-button" onClick={() => setOpen(!open)}>
                    <Icon className="dots" data={EllipsisVertical}/>
                </button>
                {/*<Modal open={open} onClose={() => setOpen(false)}>*/}
                    {/*<Contacts contacts={contacts} />*/}
                {open &&  <ModalGroupSettings chatId={dialogID} />}
                {/*</Modal>*/}
            </div>
        </div>

    );
}

export default observer(HeaderOfBodyMain);
