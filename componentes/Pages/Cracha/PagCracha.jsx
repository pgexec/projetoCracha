
import Form from "../../compForm/Form";
import '../Cracha/PagCracha.css'

function PagCracha(){
    return(
      <div>
        <div className="div-BlockText">
          <div>
            <h2 className='tituloPrincipal'>Informe seus dados abaixo para fabricação do </h2><span className='gradient-text'>crachá digital</span>
            <div className='divSubtitulo'>
              <p>Personalize e visualize seu crachá em <strong>tempo real.</strong></p>
              <p>Obtenha seu crachá personalizado com <strong>apenas alguns cliques!</strong></p>
            </div>
        </div>
        </div>
        <section className='section-conteudo'>
          <Form></Form>
        </section> 
      </div>
    )
}

export default PagCracha;