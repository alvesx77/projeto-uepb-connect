package com.backendProjeto.backendLab.Erros;

public class DadoDuplicadoException extends RuntimeException{
    public DadoDuplicadoException(String mensagemError){
        super(mensagemError);
    }
}
