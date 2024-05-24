import '../../css/HeaderOfBodyMain.css';
import '../../i18n/config';
import { useTranslation } from 'react-i18next';
import { useUserStore } from "../../stores/UserStore";
import { observer } from "mobx-react-lite";

type DialogProps = {
    dialogId: any;
}

function HeaderOfBodyMain(props:  any) {

    const { t } = useTranslation();
    const { dialogID, chatName } = useUserStore();
      return (
        <div className="header-of-body-main-pro">
          <div className="someSpace">

          </div>
                <div className="header-of-body-main">
                    <div className="dialog-name">
                        {dialogID}
                    </div>
                    <div className="status">
                        {t('status')}
                    </div>
            </div>
            </div>

    );
}

export default observer(HeaderOfBodyMain);
