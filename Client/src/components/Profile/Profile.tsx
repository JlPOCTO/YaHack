import '../../css/Profile.css';
import settings from '../../settings-svgrepo-com.svg';
import info from '../../settings-svgrepo-com.svg';
import contacts from '../../contact.svg';
import night from '../../moon-night.svg';

function Profile() {
  return (
    <div className='profile'>
    <header>
        <menu className='ProfileMenu'>
            <nav className='ProfileNav'>
            <div className='profileName'>Firstname Lastname</div>
            </nav>
        </menu>
    </header>
    <main>
    <div className="item">
    <div className='itemImage'><img src={settings} className="Settings" alt="settings" /></div>
      <div className='itemNaming'>Settings</div>
    </div>
    <div className="item">
    <div className='itemImage'><img src={night} className="Settings" alt="settings" /></div>
      <div className='itemNaming'>NightMode</div>
    </div>
    <div className="item">
    <div className='itemImage'><img src={contacts} className="Settings" alt="settings" /></div>
      <div className='itemNaming'>Contacts</div>
    </div>
    <div className="item">
    <div className='itemImage'><img src={info} className="Settings" alt="settings" /></div>
      <div className='itemNaming'>User-info</div>
    </div>
    </main>
    </div>
  );
}
export default Profile;
