package com.backendProjeto.backendLab.Erros.Handler;

import com.backendProjeto.backendLab.Erros.ValidationErroDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;
import java.util.List;

@RestControllerAdvice
public class MethodArgumentNotValidation {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?>handlerMethodArgumentNotValidation(MethodArgumentNotValidException methodArgumentNotValidException){
       List<ValidationErroDetails> erros = methodArgumentNotValidException.
               getBindingResult()
               .getFieldErrors()
               .stream()
               .map(fieldError -> ValidationErroDetails.newBildr()
                       .timestamp(new Date().getTime())
                       .status(HttpStatus.BAD_REQUEST.value())
                       .title("campo invalido")
                       .details("um ou mais campos estão invalidos")
                       .field(fieldError.getField())
                       .fieldMensage(fieldError.getDefaultMessage()))
               .toList();

        return new ResponseEntity<>(erros,HttpStatus.BAD_REQUEST);
    }
}
