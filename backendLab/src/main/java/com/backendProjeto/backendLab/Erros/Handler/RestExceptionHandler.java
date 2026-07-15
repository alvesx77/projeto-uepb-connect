package com.backendProjeto.backendLab.Erros.Handler;

import com.backendProjeto.backendLab.Erros.ResourceNotFoundDetails;
import com.backendProjeto.backendLab.Erros.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.Date;

@RestControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException resourceNotFoundException){

           ResourceNotFoundDetails resourceNotFoundDetails =  ResourceNotFoundDetails.newBuilder()
                .timestamp(new Date().getTime())
                .status(HttpStatus.NOT_FOUND.value())
                .title("Recurso não encontrado")
                .details(resourceNotFoundException.getMessage());

        return new ResponseEntity<>(resourceNotFoundDetails,HttpStatus.NOT_FOUND);
    }
}
