package com.backendProjeto.backendLab.Erros.Handler;

import com.backendProjeto.backendLab.Erros.DadoDuplicadoException;
import com.backendProjeto.backendLab.Erros.ResourceNotFoundDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class HandlerDadoDuplicadoException {

    @ExceptionHandler(DadoDuplicadoException.class)
    public ResponseEntity<?> handlerDadoDuplicado(DadoDuplicadoException dadoDuplicadoException){
        ResourceNotFoundDetails details = ResourceNotFoundDetails.newBuilder()
                .timestamp(new Date().getTime())
                .status(HttpStatus.CONFLICT.value())
                .title("Dados Duplicados")
                .details(dadoDuplicadoException.getMessage());

        return  new ResponseEntity<>(details,HttpStatus.CONFLICT);
    }

}
