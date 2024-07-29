import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ChartsComponent } from './components/charts/charts.component';
import { BanxicoService } from './services/banxico.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx'

import { Record } from './models/usuario.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, NgxPaginationModule,ChartsComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'examen_radical';
  page!:number;

  ExcelData: Record[] = [];
  minSaldo: Record | null = null;
  maxSaldo: Record | null = null;
  totalRecords: string='';
  saldoDisponible: number = 0;
  totalSaldo: number = 0;

  //Para la comunicacion con la API de banxico
  tipoCambioData: any;
  token: string = '';  
  fechaIni: string = ''; 
  fechaFin: string = '';

  
  constructor(private banxicoService : BanxicoService){}

  ReadExcel(event:any){
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e)=>{
      const workBook = XLSX.read(fileReader.result, {type:'binary'});
      const sheetNames = workBook.SheetNames;
      const jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])

      this.ExcelData = jsonData.map((item: any) => new Record(
        item.PRIMER_NOMBRE,
        item.SEGUNDO_NOMBRE,
        item.APELLIDO_PATERNO,
        item.APELLIDO_MATERNO,
        this.formatDate(item.FECHA_DE_NACIMIENTO),
        item.RFC,
        item.COLONIA_O_POBLACION,
        item.DELEGACION_O_MUNICIPIO,
        item.CIUDAD,
        item.ESTADO,
        item['C.P.'],
        item.DIRECCION_CALLE_NUMERO,
        Number(item.SALDO_ACTUAL),
        Number(item.LIMITE_DE_CREDITO),
        Number(item.SALDO_VENCIDO)
      ));

      this.totalRecords = this.ExcelData.length.toString();
      this.findMinAndMaxSaldoActual();
    }

  }

  formatDate(dateStr: string): string {
    if (dateStr.length !== 8) return dateStr; // Devolver tal cual si no tiene 8 caracteres
    const day = dateStr.substring(0, 2);
    const month = dateStr.substring(2, 4);
    const year = dateStr.substring(4, 8);
    return `${day}/${month}/${year}`;
  }

  findMinAndMaxSaldoActual(){
    if (this.ExcelData.length === 0) return;

    this.minSaldo = this.ExcelData.reduce((prev, curr) => (prev.SALDO_ACTUAL < curr.SALDO_ACTUAL ? prev : curr));
    this.maxSaldo = this.ExcelData.reduce((prev, curr) => (prev.SALDO_ACTUAL > curr.SALDO_ACTUAL ? prev : curr));
  }

  getTipoCambio(){
    this.banxicoService.getTipoCambio(this.fechaIni, this.fechaFin, this.token).subscribe(
      data=>{
        this.tipoCambioData = data;
        console.log(this.tipoCambioData)
      },
      error =>{
        console.error('Error fetching tipo cambio data', error);
      }
    )
  };

  obtenerCambioButton(){
    this.getTipoCambio();
  }
}


