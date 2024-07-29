import { Component, Input, OnChanges } from '@angular/core';
import { Record } from '../../models/usuario.model';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnChanges {

  // Recibe los datos de Excel desde el componente padre
  @Input() ExcelData : Record[] = []

  // Método que se ejecuta cuando cambian los datos de entrada
  ngOnChanges(): void {
    // Si hay datos en ExcelData, crea los gráficos
    if (this.ExcelData.length) {
      this.createBarChart();
      this.createPieChart();
    }
  }


  createBarChart(){
    //Filtrando las apariciones unicas de los estados
    const estados = [... new Set(this.ExcelData.map(record => record.ESTADO))];
    // Calcula el saldo total por cada estado
    const saldoPorEstado = estados.map(estado => {
      return this.ExcelData
      .filter(record => record.ESTADO === estado)
      .reduce((total, record)=> total + record.SALDO_ACTUAL, 0);
    });

    // Configuración del gráfico de barras
    const barChart = new Chart('barChart',{
      type : 'bar',
      data : {
        labels : estados,
        datasets : [{
          label : 'Saldo Actual por Estado',
          data : saldoPorEstado, // Datos de saldo por estado
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options:{
        responsive : true,
        maintainAspectRatio: true,
        scales : {
          y : {
            beginAtZero : true
          }
        }
      }
    });
  }

   // Método para crear un gráfico circular (pie chart)
  createPieChart(){
    // Calcula el saldo total actual
    const saldoActualTotal = this.ExcelData.reduce((total,record) => total + record.SALDO_ACTUAL, 0)
    // Calcula el límite total de crédito
    const limiteCreditoTotal = this.ExcelData.reduce((total,record) => total + record.LIMITE_DE_CREDITO, 0)
    // Calcula el saldo disponible como diferencia entre límite de crédito y saldo actual
    const saldoDisponibleTotal = limiteCreditoTotal - saldoActualTotal;

    // Configuración del gráfico circular
    const pieChart = new Chart('pieChart',{
      type : 'pie',
      data : {
        labels: ['Saldo Actual', 'Saldo Disponible'],
        datasets:[{
          data : [saldoActualTotal, saldoDisponibleTotal],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
      responsive: true,
      maintainAspectRatio: false
    }
    })
  }
}
