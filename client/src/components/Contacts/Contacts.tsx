import '../../css/Contacts.css';

type Contacts = {
  contacts: any;
}

function Contacts(props: Contacts) {

  const { contacts } = props;
  return (
    <div className='contacts'>
      <header>
        <p className='header'>Contacts:</p>
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
