package com.backendProjeto.backendLab.Erros;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ValidationErroDetails extends ErroDetail {
    private String field;
    private String fieldMenssage;

    private ValidationErroDetails(){

    }

    public static ValidationErroDetails newBildr(){
        return new ValidationErroDetails();
    }

    public ValidationErroDetails title(String title){
        this.title = title;
        return this;
    }
    public ValidationErroDetails status(int status){
        this.status = status;
        return this;
    }

    public ValidationErroDetails details(String detail){
        this.detail = detail;
        return this;
    }

    public ValidationErroDetails timestamp(long timestamp){
        this.timestamp = timestamp;
        return this;
    }

    public ValidationErroDetails developerMessage(String developerMessage){
        this.developerMessage = developerMessage;
        return this;
    }

    public ValidationErroDetails field (String field){
        this.field = field;
        return this;
    }

    public ValidationErroDetails fieldMensage(String fieldMenssage){
        this.fieldMenssage = fieldMenssage;
        return this;
    }
}
