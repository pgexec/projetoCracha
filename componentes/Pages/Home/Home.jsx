import '../Home/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardClip,faGear,faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Home(){
    return(
     <section className="HomeMainContainer">
        <div className='welcomeContainer'>
            <h1 className='tituloBemVindo'>Seja Bem-vindo</h1>
            <h2>Estamos aqui para ajudar você e sua empresa</h2>
            <h3 className='subtitulo' >Site especializado a criação de Crachás Virtual</h3>
            <Link to="/Cracha" className='buttonRendCracha'>Faça seu crachá agora mesmo</Link>
        </div>
        <div className='mainDivBlocos'>
            <div>
                <h2 className='titituloIcons'>Porque ter um crachá virtual?</h2>
            </div>
            <div className='divIconsInfo'>
                <div className='divIcons'>
                    <FontAwesomeIcon icon={ faIdCardClip}  className='iconIDCard'/>
                    <h3>Facilidade </h3>
                    <p>Em nosso site você terá seu crachá digital personalizado em menos de um minuto, em poucos passos.</p>
                </div>
                <div className='divIcons' >
                    <FontAwesomeIcon icon={faGear} className='iconIDCard' />
                    <h3>Personalização</h3>
                    <p>você pode escolher sua foto e recortar da forma que deseja, além de escolher o fundo do seu crachá.</p>
                </div>
                <div className='divIcons'>
                    <FontAwesomeIcon icon={faClock} className='iconIDCard' />
                    <h3>24 horas </h3>
                    <p>Acesso ilimitado para fazer o seu crachá ou dos colaboradores a hora que quiser, disponivel 24 horas.</p>
                </div>   
            </div>
            
        </div>
     </section>
    )
}
export default Home;