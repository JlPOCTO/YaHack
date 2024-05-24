import '../../css/Contacts.css';
import '../../i18n/config';
import {useTranslation} from 'react-i18next';

type Contacts = {
  contacts: any;
}

function Contacts(props: Contacts) {
  const { t } = useTranslation();

  const { contacts } = props;
  return (
    <div className='contacts'>
      <header>
        <p className='header'>{t('contactsTitle')}:</p>
      </header>
      <main>
        {contacts.map((contact: any) =>
          <p className='myContactsNames'>{contact.name}</p>
        )}
      </main>
    </div>
  );
}
export default Contacts;
