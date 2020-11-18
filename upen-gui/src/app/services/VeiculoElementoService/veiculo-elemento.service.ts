import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, Observer } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Veiculo } from '../../../../../common/veiculo';
import { Pneu } from '../../../../../common/pneu';

@Injectable({
  providedIn: 'root'
})
export class VeiculoElementoService {

  private headers = new HttpHeaders({'Content-type': 'application/json'});
  private serverUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {  }

  getVeiculo(placa: string): Observable<any> {
    return this.http.get<any>(this.serverUrl + 'veiculo/' + placa)
      .pipe(
        retry(2)
      )
  }

  deletarVeiculo(placa: string): Observable<any> {
    return this.http.delete<any>(this.serverUrl + 'veiculo/' + placa).
      pipe(
        retry(2)
      )
  }

  atribuirPneu(placa: string, idPneu: string): Observable<any> {
    return this.http.put<any>(this.serverUrl + 'veiculo/' + placa + '/' + idPneu, {headers: this.headers}).
      pipe(
        retry(2)
      )
  }

  desatribuirPneu(placa: string, idPneu: string): Observable<any> {
    return this.http.put<any>(this.serverUrl + 'veiculo/pneu/' + placa + '/' + idPneu, {headers: this.headers}).
      pipe(
        retry(2)
      )
  }

  getPneus(): Observable<any> {
    return this.http.get<any>(this.serverUrl + 'pneusMock').
      pipe(
        retry(2)
      )
  }

}
