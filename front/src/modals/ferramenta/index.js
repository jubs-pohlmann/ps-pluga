import React from 'react';
import './styles.css';

const FerramentaModal = ({ fecharModal, show, ferramenta, ultimasFerramentas }) => {
    const mostrarEsconderModal = show ? "modal display-block" : "modal display-none";
    const mostrarEsconderUltimasFerramentas = ultimasFerramentas.length ? "" : "display-none";

    return (
        <div className={mostrarEsconderModal}>
            <section className="modal-main" >
                <div className="ferramenta-selecionada">
                    <img alt={"logo " + ferramenta.name} src={ferramenta.icon} style={{ background: ferramenta.color }} />
                    <div>
                        <p>{ferramenta.name}</p>
                        <a className="botao" rel="noreferrer" target="_blank" href={ferramenta.link}>Acessar</a>
                    </div>
                </div>

                <p className={mostrarEsconderUltimasFerramentas}>ÚLTIMAS FERRAMENTAS VISUALIZADAS</p>

                <div className="ultimas-ferramentas-container">
                    { ultimasFerramentas.map( ( ultimaFerramenta, index ) => 
                    <div className="ultima-ferramenta" key={index}>
                        <img alt={"logo " + ultimaFerramenta.name} style={{ background: ultimaFerramenta.color }} src={ ultimaFerramenta.icon } />
                        <p>{ ultimaFerramenta.name }</p>
                    </div>)}
                </div> 
                <a className="botao botao-sair" onClick={ fecharModal }>Fechar</a>
            </section>           
        </div>
    );
}

export default FerramentaModal;
  