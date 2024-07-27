import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import {NgxPaginationModule} from 'ngx-pagination';
import * as XLSX from 'xlsx'

import { Record } from './models/usuario.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, NgxPaginationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'examen_radical';
  page!:number;

  ExcelData: Record[] = [];
  minSaldo: Record | null = null;
  maxSaldo: Record | null = null;
  
  constructor(){}

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
        item.FECHA_DE_NACIMIENTO,
        item.RFC,
        item.COLONIA_O_POBLACION,
        item.DELEGACION_O_MUNICIPIO,
        item.CIUDAD,
        item.ESTADO,
        item.CP,
        item.DIRECCION_CALLE_NUMERO,
        item.SALDO_ACTUAL,
        item.LIMITE_DE_CREDITO,
        item.SALDO_VENCIDO
      ));

      this.findMinAndMaxSaldoActual();
    }

  }

  findMinAndMaxSaldoActual(){
    if (this.ExcelData.length === 0) return;

    this.minSaldo = this.ExcelData.reduce((prev, curr) => (prev.SALDO_ACTUAL < curr.SALDO_ACTUAL ? prev : curr));
    this.maxSaldo = this.ExcelData.reduce((prev, curr) => (prev.SALDO_ACTUAL > curr.SALDO_ACTUAL ? prev : curr));
  }
}


