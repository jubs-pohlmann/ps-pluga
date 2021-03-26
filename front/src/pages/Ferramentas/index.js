import React, { useState } from 'react';
import ContentJson from './ferramentas.json';
import { BiSearch, BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import FerramentaModal from '../../modals/ferramenta/index.js';

import './styles.css';

export default function Ferramentas(){
    const ferramentasPorPagina = 12;
    const [ ferramentaSelecionada, setFerramentaSelecionada ] = useState( ContentJson[0] );
    const [ modalAberto, setModalAberto ] = useState( false );
    const [ paginaAtual, setPaginaAtual ] = useState( 1 );
    const [ ferramentasTotal, setFerramentasTotal ] = useState( ContentJson );
    const [ ferramentas, setFerramentas ] = useState( ContentJson.slice( 0, ferramentasPorPagina ) );
    const [ ultimasFerramentasVistas, setUltimasFerramentasVistas ] = useState([]);
    var existemFerramentas = ferramentas.length ? "" : "display-none";
    var naoExistemFerramentas = ferramentas.length ? "display-none" : "";

    function paginar( pagina ){
        if( pagina > 0 ){
            if( pagina*ferramentasPorPagina <= ferramentasTotal.length ){
                setPaginaAtual( pagina );
                setFerramentas( ferramentasTotal.slice( ferramentasPorPagina*( pagina - 1 ), ferramentasPorPagina*pagina ) );
            }
            else if( paginaAtual*ferramentasPorPagina < ferramentasTotal.length ){
                setPaginaAtual( pagina );
                setFerramentas( ferramentasTotal.slice( ferramentasPorPagina*( pagina - 1) ) );
            }
        }
    }

    function busca( e ){
        let termo = e.target.value.toUpperCase();
        if( termo === '' ){
            setFerramentas( ContentJson.slice( 0, ferramentasPorPagina ) );
            setFerramentasTotal( ContentJson );
            setPaginaAtual( 1 );
        } else{
            let ferramentas = ContentJson.filter( element => element.name.toUpperCase().includes( termo ) );
            setFerramentasTotal( ferramentas );
            setPaginaAtual( 1 );
            setFerramentas( ferramentas.slice( 0, ferramentasPorPagina ) );
        }
    }

    function abrirModal( ferramenta ){
        setFerramentaSelecionada( ferramenta );
        setModalAberto(true);
    }

    function fecharModal(){
        let temp = ultimasFerramentasVistas;

        if( !ultimasFerramentasVistas.includes( ferramentaSelecionada ) ){
            temp.unshift( ferramentaSelecionada );
            if( ultimasFerramentasVistas.length >= 4 ) temp.pop();
            setUltimasFerramentasVistas(temp);
        }
        
        setModalAberto(false);
    }

    return(
        <div className="div-global">

            <div className="barra-pesquisa">
                <BiSearch className="icone-busca"/>
                <input id="ferramentaBusca" type="text" placeholder="Buscar ferramenta" onChange={(e) => busca(e)}/>
            </div>

            <FerramentaModal ultimasFerramentas={ ultimasFerramentasVistas } 
                             ferramenta={ ferramentaSelecionada } 
                             show={  modalAberto } 
                             handleClose={(e) => fecharModal(e)} />

            <p className={existemFerramentas}>
                Mostrando { ferramentasPorPagina*( paginaAtual - 1 ) + 1 } - { ferramentasPorPagina*( paginaAtual - 1 ) + ferramentas.length } de { ferramentasTotal.length }
            </p> 
            <p className={naoExistemFerramentas}>Não existem ferramentas com esse nome.</p>

            <div className="ferramentas-container" >
                { ferramentas.map( ( ferramenta, index ) => 
                <button className="animacao" onClick={ (e) => abrirModal( ferramenta ) } key={index}>
                    <img alt={"logo " + ferramenta.name} src={ferramenta.icon}  style={{ background: ferramenta.color }} />
                    <p className="ferramenta-nome">{ ferramenta.name }</p>
                </button>) }
            </div>

            <div className="paginacao">
                <button onClick={ (e) => paginar( paginaAtual - 1 ) }>
                    <BiLeftArrowAlt size="20px" className="icone-paginacao"/>
                </button>
                <button onClick={ (e) => paginar( paginaAtual + 1 ) }>
                    <BiRightArrowAlt size="20px" className="icone-paginacao"/>
                </button>
            </div>

        </div>
    );
}