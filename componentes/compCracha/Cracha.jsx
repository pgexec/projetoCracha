import '../compCracha/CrachaStyle.css'
import PropTypes from 'prop-types'
import html2canvas from 'html2canvas';

function Cracha({nome,sobrenome, cidade, estado, imagem}){

    const downloadCrachaAsImage = () => {
        const crachaElement = document.querySelector('.div-cracha');
        const { width, height } = crachaElement.getBoundingClientRect(); // Captura o tamanho exato da div
    
        document.fonts.ready.then(() => {
            setTimeout(() => {
                html2canvas(crachaElement, {
                    scale: 3,
                    width: width, // Usa a largura real da div
                    height: height, // Usa a altura real da div
                    useCORS: true,
                    scrollX: 0,
                    scrollY: 0,
                }).then((canvas) => {
                    const name = 'cracha-' + nome.toLowerCase().replace(/\s+/g, '-');
                    const imageURL = canvas.toDataURL('image/png', 1.0);
                    const aTag = document.createElement('a');
                    aTag.href = imageURL;
                    aTag.setAttribute('download', `${name}.png`);
                    aTag.click();
                    aTag.remove();
                });
            }, 100);
        }).catch((error) => {
            console.error('Erro ao carregar fontes:', error);
        });
    };
    

    const displayNome = nome !== '' ? nome : "Nome";
    const displaySobre = sobrenome !== '' ? sobrenome : "Sobrenome";

    return(
        <div className='conteiner-cracha'>
            <div className='div-cracha'>
                {imagem ?<img  className="img-person" src={imagem} alt="" /> : <img className="img-person" src="https://i.pinimg.com/564x/76/c1/02/76c10266832005183df1833e5a5a8dc3.jpg" alt="" /> }
                
                <div className='div-infos'>
                    <p className='infoName' >{displayNome}</p>
                    <p className='infoName' >{displaySobre}</p>
                </div>

                <div className="div-cidade">
                    {cidade !== '' ?  <h2 className='InfoCountry' >{cidade}</h2> : "Cidade"}
                    <h2>/</h2>
                    {estado !== '' ?  <h2 className='InfoCountry' >{estado}</h2> : "Estado"}
                </div>
            </div>
            <div className='divButtonDownload'>
                <button className='buttonDownload' onClick= {downloadCrachaAsImage}>Baixar Crachá</button>
            </div>
        </div>
        
    )
};

Cracha.propTypes = 
{
    nome: PropTypes.string,
    sobrenome: PropTypes.string,
    cidade: PropTypes.string,
    estado: PropTypes.string
}



export default Cracha;