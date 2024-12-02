import {Link } from 'react-router-dom'; // Importa o Router do react-router-dom
import '../compHeader/Header.css';


function Header() {
  return (
      <header className='header'>
        <div>
          <img src="" alt="" />
        </div>

        <div className='divOptionsHeader'>
          <Link className='optionsHeader' to="/">Home</Link>
          <Link className='optionsHeader' to="/Cracha">Crachá</Link>
        </div>
        <div>
          <Link className='buttonPerfil' to="/Perfil">Perfil</Link>
        </div>
      </header>
  );

}

export default Header;
