import { NavLink } from 'react-router-dom'; // Substitua Link por NavLink
import '../compHeader/Header.css';

function Header() {
  return (
      <header className="header">
        <div>
          <img src="" alt="" />
        </div>

        <div className="divOptionsHeader">
          
          <NavLink 
            className={({ isActive }) => 
              isActive ? "optionsHeader active" : "optionsHeader"
            } 
            to="/"
          >
            Home
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              isActive ? "optionsHeader active" : "optionsHeader"
            } 
            to="/Cracha"
          >
            Crachá
          </NavLink>
        </div>

        <div>
          <NavLink 
            className={({ isActive }) => 
              isActive ? "buttonPerfil active" : "buttonPerfil"
            } 
            to="/Perfil"
          >
            Perfil
          </NavLink>
        </div>
      </header>
  );
}

export default Header;
