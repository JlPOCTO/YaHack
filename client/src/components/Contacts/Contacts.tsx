import '../../css/Contacts.css';
import '../../i18n/config';
import { useTranslation } from 'react-i18next';

type Contacts = {
  contacts: any;
}

function Contacts(props: Contacts) {
  const { t } = useTranslation();
  const { contacts } = props;
  function find(name : any) {
    console.log(name)
    if (name !== 'null') {
      return <p className='myContactsNames'>{name}</p>
    } 
  }
  return (
    <div className='contacts'>
      <header>
        <p className='header'>{t('contactsTitle')}:</p>
      </header>
      <main>
        {contacts.map((contact: any) =>
          find(contact.name)
        )}
      </main>
    </div>
  );
}
export default Contacts;
