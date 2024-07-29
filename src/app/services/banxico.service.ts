import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BanxicoService {

  //Manejo del consumode la API de banxico.

  private baseUrl = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/'
  private idSerie = 'SF43718' //La serie que nos interesa para el ejercicio.
  constructor(private http:HttpClient) { }

  getTipoCambio(fechaIni : string, fechaFin : string, token : string){
    const url = `${this.baseUrl}/${this.idSerie}/datos/${fechaIni}/${fechaFin}?token=${token}`;
    return this.http.get<any>(url);
  }
}
