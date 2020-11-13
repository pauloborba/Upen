import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Veiculo } from '../../../../../common/veiculo';
import { Pneu } from '../../../../../common/pneu';

@Injectable({
  providedIn: 'root'
})
export class VeiculoElementoService {

  private headers = new HttpHeaders({'Content-type': 'application/json'});
  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {  }

  getVeiculo(placa: string): Observable<Veiculo> {
    return this.http.get<Veiculo>(this.serverUrl + "/veiculo/" + placa)
      .pipe(
        retry(2),
      )
  }

  deletarVeiculo(placa: string): Observable<any> {
    return this.http.delete<any>(this.serverUrl + "/veiculo/" + placa)
      .pipe(
        retry(2),
        map( res => {if (res.success) {return placa;} else {return null}} )
      )
  }

  atribuirPneu(placa: string, id: string): Observable<any> {
    return this.http.put<any>(this.serverUrl + "/veiculo/" + placa, {queryParams: {id: id}})
      . pipe(
        retry(2),
        map( res => {if (res.success) {return placa} else {return null}} )
      ) 
  }

  desatribuirPneu(placa: string, id: string): Observable<any> {
    return this.http.put<any>(this.serverUrl + "/veiculo/pneu/" + placa, {queryParams: {id: id}})
      .pipe(
        retry(2),
        map( res => {if (res.succes) {return placa} else {return null}} )
      )
  }

  getPneu(id: string): Observable<Pneu> {
    return this.http.get<Pneu>(this.serverUrl + "/pneus/" + id)
      .pipe(
        retry(2)
      )
  }

}
