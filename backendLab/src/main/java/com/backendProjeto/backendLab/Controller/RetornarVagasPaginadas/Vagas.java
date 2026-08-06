package com.backendProjeto.backendLab.Controller.RetornarVagasPaginadas;

import com.backendProjeto.backendLab.Service.RetornarVagasPaginadas.PaginasVagas;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/paginas")
public class Vagas {

    private final PaginasVagas paginasVagas;

    public Vagas(PaginasVagas paginasVagas) {
        this.paginasVagas = paginasVagas;
    }


    @RequestMapping(value = "/retornarVagasDashboard",method = RequestMethod.GET)
    public ResponseEntity<?> retornarVagsPages(){
        return new ResponseEntity<>(paginasVagas.paginasDeVagasDashboar(),HttpStatus.OK);
    }

    @RequestMapping(value = "/adicionarVagas/{area}",method = RequestMethod.GET)
    public ResponseEntity<?> adicionarVaga(@PathVariable String area){

        return new ResponseEntity<>(paginasVagas.paginasDeAreasDeAfinidades(area),HttpStatus.OK);

    }
}
