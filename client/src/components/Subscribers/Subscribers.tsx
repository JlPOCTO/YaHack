import '../../css/Contacts.css';
import '../../i18n/config';
import { useTranslation } from 'react-i18next';

type Contacts = {
  contacts: any;
}

function Subscribers(props: Contacts) {
  const { t } = useTranslation();
  const { contacts } = props;
  function find(name : any) {
    if (name !== 'null') {
      return <p className='myContactsNames'>{name}</p>
    } 
  }
  return (
    <div className='contacts'>
      <header>
        <p className='header'>{t('subscribers')}:</p>
      </header>
      <main>
        {contacts.map((contact: any) =>
          <div>{contact.login}</div>
        )}
      </main>
    </div>
  );
}
export default Subscribers;
