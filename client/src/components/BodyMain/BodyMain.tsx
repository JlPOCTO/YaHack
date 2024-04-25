import '../../css/BodyMain.css';
import AddMessage from '../AddMessage/AddMessage';
import picture from '../../../public/picture.jpg';


function BodyMain() {
  return (
    <div className="body-main">
      <div className="Img">
       {/* <img src={picture} className="Settings" alt="settings" /> */}
        <AddMessage />
      </div>
    </div>
  );
}
export default BodyMain;
