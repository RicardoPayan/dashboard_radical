import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import {NgxPaginationModule} from 'ngx-pagination';
import * as XLSX from 'xlsx'

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

  ExcelData: any
  minSaldoActual!: any;
  maxSaldoActual!: any;

  constructor(){}

  ReadExcel(event:any){
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e)=>{
      var workBook = XLSX.read(fileReader.result, {type:'binary'});
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])

      this.findMinAndMaxSaldoActual();
    }

  }

  findMinAndMaxSaldoActual(){
    if (this.ExcelData && this.ExcelData.length > 0) {
      this.minSaldoActual = this.ExcelData.reduce((prev: any, curr: any) => {
        return (prev.SALDO_ACTUAL < curr.SALDO_ACTUAL) ? prev : curr;
      });

      this.maxSaldoActual = this.ExcelData.reduce((prev: any, curr: any) => {
        return (prev.SALDO_ACTUAL > curr.SALDO_ACTUAL) ? prev : curr;
      });

      console.log("Persona con menor saldo actual:", this.minSaldoActual);
      console.log("Persona con mayor saldo actual:", this.maxSaldoActual);
    }
  }
}


