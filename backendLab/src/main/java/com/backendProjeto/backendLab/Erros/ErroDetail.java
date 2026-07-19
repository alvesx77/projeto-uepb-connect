package com.backendProjeto.backendLab.Erros;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ErroDetail {
    protected String title;
    protected int status;
    protected String detail;
    protected long timestamp;
    protected String developerMessage;
}
