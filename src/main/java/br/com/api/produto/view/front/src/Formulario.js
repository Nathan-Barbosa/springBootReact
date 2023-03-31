function Formulario({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}){

  return (
    <form>
      <input type="text" value={obj.nome} onChange={eventoTeclado} name='nome' placeholder="Nome" className="form-control" />
      <input type="text" value={obj.marca} onChange={eventoTeclado} name='marca' placeholder="Marca" className="form-control"/>

      {
        botao 
        ?
        <input type="Button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary"/>
        :
        <div>
          <input type="Button" value="Alterar" onClick={alterar} className="btn btn-warning"/>
          <input type="Button" value="Remover" onClick={remover} className="btn btn-danger"/>
          <input type="Button" value="Cancelar" onClick={cancelar} className="btn btn-secondary"/>
        </div>
      }   
     
      </form>
  )
}

export default Formulario;