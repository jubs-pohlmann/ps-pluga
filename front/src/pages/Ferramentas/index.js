import React, { useState } from 'react';
import ContentJson from './ferramentas.json';
import { BiSearch, BiLinkExternal, BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';


import './styles.css';

export default function Ferramentas(){
    const ferramentasPorPagina = 12;
    const [ paginaAtual, setPaginaAtual ] = useState( 1 );
    const [ ferramentasTotal, setFerramentasTotal ] = useState( ContentJson );
    const [ ferramentas, setFerramentas ] = useState( ContentJson.slice( 0, ferramentasPorPagina ) );

    function paginar( pagina ){
        if( pagina > 0 ){
            if( pagina*ferramentasPorPagina <= ferramentasTotal.length ){
                setPaginaAtual( pagina );
                setFerramentas( ferramentasTotal.slice( ferramentasPorPagina*( pagina - 1 ), ferramentasPorPagina*pagina ) );
            }
            else if(paginaAtual*ferramentasPorPagina < ferramentasTotal.length){
                setPaginaAtual( pagina );
                setFerramentas( ferramentasTotal.slice( ferramentasPorPagina*( pagina - 1) ) );
            }
        }
    }

    function busca(e){
        let termo = e.target.value.toUpperCase();
        if( termo == '' ){
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

    return(
        <div className="div-global">
            <div className="barra-pesquisa">
                <BiSearch className="icone" />
                <input id="ferramentaBusca" type="text" placeholder="Buscar ferramenta" onChange={(e) => busca(e)}/>
            </div>
            <p>Mostrando {ferramentasPorPagina*(paginaAtual-1)+1}-{ferramentasPorPagina*(paginaAtual-1)+ferramentas.length} de {ferramentasTotal.length}</p>
            <div className="ferramentas-container">
                {ferramentas.map((ferramenta, index) => 
                <div key={index} style={{background: ferramenta.color}}>
                    <img src={ferramenta.icon} />
                    <p className="ferramenta-nome">{ferramenta.name}</p>
                    {/* <a href={ferramenta.link}><BiLinkExternal />{ferramenta.name}</a> */}
                </div>)}
            </div>
            <div className="paginacao">
                <button onClick={ (e) => paginar(paginaAtual-1) }>
                    <BiLeftArrowAlt className="icone-paginacao"/>
                </button>
                <button onClick={ (e) => paginar(paginaAtual+1) }>
                    <BiRightArrowAlt className="icone-paginacao"/>
                </button>
            </div>
        </div>
    );
}