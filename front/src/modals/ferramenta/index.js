import React, { useState, Component } from 'react';
import './styles.css';

const FerramentaModal = ({ handleClose, show, ferramenta, ultimasFerramentas }) => {
    const mostrarEsconderModal = show ? "modal display-block" : "modal display-none";
    const mostrarEsconderUltimasFerramentas = ultimasFerramentas.length ? "" : "display-none";

    return (
        <div className={mostrarEsconderModal}>
            <section className="modal-main" >
                <div className="ferramenta-selecionada">
                    <img src={ferramenta.icon} style={{ background: ferramenta.color }} />
                    <div>
                        <p>{ferramenta.name}</p>
                        <a className="botao" target="_blank" href={ferramenta.link}>Acessar</a>
                    </div>
                </div>

                <p className={mostrarEsconderUltimasFerramentas}>ÚLTIMAS FERRAMENTAS VISUALIZADAS</p>

                <div className="ultimas-ferramentas-container">
                    { ultimasFerramentas.map( ( ultimaFerramenta, index ) => 
                    <button className="ultima-ferramenta" key={index}>
                        <img style={{ background: ultimaFerramenta.color }} src={ultimaFerramenta.icon} />
                        <p className="ferramenta-nome">{ ultimaFerramenta.name }</p>
                    </button>)}
                </div> 
                <a className="botao botao-sair" onClick={handleClose}> Fechar </a>
            </section>           
        </div>
    );
}

export default FerramentaModal;
  