import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Historico } from '../../../../../common/historico';
import { Veiculo } from '../../../../../common/veiculo';

@Injectable({
  providedIn: 'root'
})
export class ListaVeiculoService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private servURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

  getVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.servURL + "/veiculos")
              .pipe(
                retry(2)
            );
  }

  criarVeiculo(veiculo: Veiculo): Observable<Historico[]> {
    return this.http.get<Historico[]>(this.servURL + "/historicos")
                .pipe(
                  retry(2)
                );
  }

  deletarVeiculo(placa: string): Observable<number>{
    return this.http.delete<any>(this.servURL + "/veiculos/"+ placa).pipe(
        map( res => {if(res.success) {return res.index} else return -1})
    );
  }

  cadastrarVeiculo(veiculo: Veiculo): Observable<Veiculo>{
    return this.http.post<any>(this.servURL + "/veiculos", veiculo, {headers: this.headers}).pipe(
      retry(2),
      map( res => {if (res.success) {return veiculo;} else {return null;}} )
    );
  }

  getLixeira(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.servURL + "/lixeiraveiculos")
              .pipe(
                retry(2)
            );
  }

  deletarVeiculoPermanentemente(placa: string): Observable<number>{
    
    return this.http.delete<any>(this.servURL + "/lixeiraveiculos/"+ placa).pipe(
        map( res => {if(res.success) {return res.index} else return -1})
    );
  }

  restaurarVeiculo(veiculo: Veiculo): Observable<number>{

    console.log(veiculo.placa);


    return this.http.post<any>(this.servURL + "/lixeiraveiculos", veiculo, {headers: this.headers}).pipe(
      retry(2),
      map( res => {if (res.success) {return res.index;} else {return -1;}} )
    );
  }
  

}
