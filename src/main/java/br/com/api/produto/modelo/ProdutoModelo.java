package br.com.api.produto.modelo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@javax.persistence.Entity
@javax.persistence.Table(name = "produtos")
@Getter
@Setter

public class ProdutoModelo {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long codigo;
  private String nome;
  private String marca;

}
