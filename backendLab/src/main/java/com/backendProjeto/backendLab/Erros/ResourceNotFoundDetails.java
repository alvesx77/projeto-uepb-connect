package com.backendProjeto.backendLab.Erros;


import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class ResourceNotFoundDetails extends ErroDetail {

    private ResourceNotFoundDetails(){

    }

    public static ResourceNotFoundDetails newBuilder(){
        return new ResourceNotFoundDetails();
    }


    public ResourceNotFoundDetails title(String title){
        this.title = title;
        return this;
    }
    public ResourceNotFoundDetails status(int status){
        this.status = status;
        return this;
    }

    public ResourceNotFoundDetails details(String detail){
        this.detail = detail;
        return this;
    }

    public ResourceNotFoundDetails timestamp(long timestamp){
        this.timestamp = timestamp;
        return this;
    }

    public ResourceNotFoundDetails developerMessage(String developerMessage){
        this.developerMessage = developerMessage;
        return this;
    }
}
