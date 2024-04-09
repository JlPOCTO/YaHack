import '../../css/App.css';
import SideBar from '../SideBar/SideBar';
import Body from '../BodyMain/BodyMain';

function App() {

  return (
    <div className="App">
      <button>
        <a href="/auth/github">зарегистрируйтесь через GitHub</a>.
      </button>
      <SideBar />
      <Body />
    </div>
  );
}
export default App;
