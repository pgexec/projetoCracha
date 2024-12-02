
import './App.css';
import 'react-image-crop/dist/ReactCrop.css';
import Header from '../componentes/compHeader/Header'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from '../componentes/Pages/Home/Home';
import PagCracha from '../componentes/Pages/Cracha/PagCracha';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Perfil from '../componentes/Pages/Perfil/Perfil';



function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route  path='/' element={<Home/>} />
          <Route path='/Cracha' element={<PagCracha />} />
          <Route path='/Perfil' element={<Perfil/>}></Route>
        </Routes>
      </Router>      
    </div>
    
  );
}


export default App;
