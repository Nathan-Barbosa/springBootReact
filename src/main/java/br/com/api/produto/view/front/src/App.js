import { useState, useEffect } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //Objeto produto
  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }
  //useState
  const [ btnCadastrar, setBtnCadastrar ] = useState(true)
  const [ produtos, setProdutos] = useState([]);
  const [ objProduto, setObjProduto ] = useState(produto);


  //useEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json()) // Pega o retorno do fetch e converte para json
    .then(retorno_convertido => setProdutos(retorno_convertido)) // Pega o retorno convertido e passa para a função setProdutos
  }, []);


  //Obtendo os dados do Formulário
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  //Metodo cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }      
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setProdutos([...produtos, retorno_convertido]);
        alert('Produto cadastrado com sucesso!');
        limparFormulario();
      }
    })
  }

    //Metodo alterar produto
    const alterar = () => {
      fetch('http://localhost:8080/alterar', {
        method: 'put',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }      
      })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        if(retorno_convertido.mensagem !== undefined){
          alert(retorno_convertido.mensagem);
        }else{
          
          //Mensagem
          alert('Produto Alterado com sucesso!');

          //Cópia do vetor de produtos

          let vetorTemp = [...produtos];

          // Índice
          let index = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.codigo;
          });

          // Alterar produto do vetorTemp
          vetorTemp[index] = objProduto;

          //Atualizar vetor de produtos
          setProdutos(vetorTemp);

          //Limpar Formulario
          limparFormulario();
        }
      })
    }

    //Metodo remover produto
    const remover = () => {
      fetch('http://localhost:8080/remover/'+objProduto.codigo, {
        method: 'delete',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }      
      })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        //Mensagem
        alert(retorno_convertido.mensagem);

        //Cópia do vetor de produtos

        let vetorTemp = [...produtos];

        // Índice
        let index = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });

        // Remover produto do vetorTemp
        vetorTemp.splice(index, 1);

        //Atualizar vetor de produtos
        setProdutos(vetorTemp);

        //limpar Formulário
        limparFormulario();
      })
    }

  // Limpar Formulário
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  //Selecionar produto
  const selecionarProduto = (index) => {
    setObjProduto(produtos[index]);
    setBtnCadastrar(false);
  }

  //Retorno
  return (
    
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
