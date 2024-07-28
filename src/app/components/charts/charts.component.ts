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
  @Input() ExcelData : Record[] = []

  ngOnChanges(): void {
    if (this.ExcelData.length) {
      this.createBarChart();
      this.createPieChart();
    }
  }


  createBarChart(){
    //Filtrando las apariciones unicas de los estados
    const estados = [... new Set(this.ExcelData.map(record => record.ESTADO))];
    const saldoPorEstado = estados.map(estado => {
      return this.ExcelData
      .filter(record => record.ESTADO === estado)
      .reduce((total, record)=> total + record.SALDO_ACTUAL, 0);
    });

    const barChart = new Chart('barChart',{
      type : 'bar',
      data : {
        labels : estados,
        datasets : [{
          label : 'Saldo Actual por Estado',
          data : saldoPorEstado,
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

  createPieChart(){
    const saldoActualTotal = this.ExcelData.reduce((total,record) => total + record.SALDO_ACTUAL, 0)
    const limiteCreditoTotal = this.ExcelData.reduce((total,record) => total + record.LIMITE_DE_CREDITO, 0)
    const saldoDisponibleTotal = limiteCreditoTotal - saldoActualTotal;

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
