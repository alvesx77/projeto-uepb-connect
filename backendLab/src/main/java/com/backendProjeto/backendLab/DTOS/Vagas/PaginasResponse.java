package com.backendProjeto.backendLab.DTOS.Vagas;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
//essa class e responsavel por ocultar as informações das paginas
public class PaginasResponse <T>{

    private List<T> content;

    private int paginaAtual;

    private int totalPaginas;

    private Long totalElementos;

}
