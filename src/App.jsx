
import './App.css';
import 'react-image-crop/dist/ReactCrop.css';
import Header from '../componentes/compHeader/Header'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from '../componentes/Pages/Home/Home';
import PagCracha from '../componentes/Pages/Cracha/PagCracha';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Funcionarios from '../componentes/Pages/Funcionarios/Funcionarios';



function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route  path='/' element={<Home/>} />
          <Route path='/Cracha' element={<PagCracha />} />
          <Route path='/Funcionarios' element={<Funcionarios/>}></Route>
        </Routes>
      </Router>      
    </div>
    
  );
}


export default App;
