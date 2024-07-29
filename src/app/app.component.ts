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
  pageCambio : number = 1

  ExcelData: Record[] = [];
  minSaldo: Record | null = null;
  maxSaldo: Record | null = null;
  totalRecords: string='';
  saldoDisponible: number = 0;
  totalSaldo: number = 0;

  //Para la comunicacion con la API de banxico
  tipoCambioData: any[] = [];
  token: string = '';  
  fechaIni: string = ''; 
  fechaFin: string = '';

  
  constructor(private banxicoService : BanxicoService){}
  ReadExcel(event: any): void {
    const file = event.target.files[0];
  
    // Verificar el tipo de archivo
    if (!file || !file.name.endsWith('.xlsx')) {
      alert('Por favor, sube un archivo en formato .xlsx.');
      return;
    }
  
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
  
    fileReader.onload = (e) => {
      try {
        const workBook = XLSX.read(fileReader.result, { type: 'binary' });
        const sheetNames = workBook.SheetNames;
        const sheet = workBook.Sheets[sheetNames[0]];
  
        // Obtener los encabezados de las columnas
        const headersRaw = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];
        if (!Array.isArray(headersRaw)) {
          alert('El archivo Excel tiene un formato incorrecto.');
          return;
        }
  
        // Asegurar que los encabezados sean un array de strings
        const headers = headersRaw as string[];
        const expectedHeaders = [
          'PRIMER_NOMBRE', 'SEGUNDO_NOMBRE', 'APELLIDO_PATERNO', 
          'APELLIDO_MATERNO', 'FECHA_DE_NACIMIENTO', 'RFC', 
          'COLONIA_O_POBLACION', 'DELEGACION_O_MUNICIPIO', 'CIUDAD', 
          'ESTADO', 'C.P.', 'DIRECCION_CALLE_NUMERO', 'SALDO_ACTUAL', 
          'LIMITE_DE_CREDITO', 'SALDO_VENCIDO'
        ];
  
        const isHeadersValid = expectedHeaders.every(header => headers.includes(header));
        if (!isHeadersValid) {
          alert('El archivo Excel tiene un formato incorrecto o faltan columnas.');
          return;
        }
  
        const jsonData = XLSX.utils.sheet_to_json(sheet);
  
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
      } catch (error) {
        console.error('Error al leer el archivo Excel', error);
        alert('Ocurrió un error al procesar el archivo Excel. Por favor, asegúrate de que el archivo sea válido y vuelva a intentarlo.');
      }
    };
  
    fileReader.onerror = (error) => {
      console.error('Error al leer el archivo', error);
      alert('Ocurrió un error al leer el archivo. Por favor, inténtelo de nuevo.');
    };
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


  //Funcion que obtiene los datos que nos importan, en este caso las fechas y el cambio
  obtenerCambioButton(): void {

    if (!this.token || !this.fechaIni || !this.fechaFin) {
      alert('Por favor, completa todos los campos.');
      return;
    };

    // Convertir las fechas a objetos Date para validación
    const fechaInicio = new Date(this.fechaIni);
    const fechaFin = new Date(this.fechaFin);

    // Verificar si la fecha de inicio es posterior a la fecha de fin
    if (fechaInicio > fechaFin) {
      alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
      return;
    }

    if (this.token && this.fechaIni && this.fechaFin) {
      this.banxicoService.getTipoCambio(this.fechaIni, this.fechaFin, this.token).subscribe(
        (response: any) => {
          this.tipoCambioData = response.bmx.series[0].datos;
        },
        (error) => {
          console.error('Error al obtener los datos del tipo de cambio', error);
          alert('Ocurrió un error al obtener los datos del tipo de cambio. Por favor, intente nuevamente más tarde.');
        }
      );
    }
  }
}


