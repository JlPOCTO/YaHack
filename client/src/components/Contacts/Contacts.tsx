import '../../css/Contacts.css';

type Contacts = {
  me: any;
}

function Contacts(props: Contacts) {

  const { me } = props;
  return (
    <div className='contacts'>
       <header>
        <p className='header'>Contacts:</p>
       </header>
       <main>

       </main>
    </div>
  );
}
export default Contacts;
