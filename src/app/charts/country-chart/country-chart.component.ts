import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { EmployeeUpdateService } from '../../services/employe-update.service';

@Component({
  selector: 'app-country-chart',
  standalone: true,
  imports: [NgxEchartsModule, CommonModule],
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.css'],
})
export class CountryChartComponent implements OnInit {
  chartOptions: any;
  countryStats: { [key: string]: number } = {}; // Datos de países

  constructor(
    private employeeService: EmployeeService,
    private employeeUpdateService: EmployeeUpdateService
  ) {}

  ngOnInit() {
    this.loadCountryStatistics();

    this.employeeUpdateService.dataChanged$.subscribe(() => {
      this.loadCountryStatistics();
    });
  }

  loadCountryStatistics() {
    this.employeeService.getCountryStatistics().subscribe(
      (response) => {
        this.countryStats = response;
        this.updateChartOptions();
      },
      (error) => {
        console.error('Error fetching country statistics:', error);
      }
    );
  }

  updateChartOptions() {
    this.chartOptions = {
      title: {
        text: 'Estadísticas por País',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#ff6347', '#ff8c00'], // Paleta de colores personalizada
      animationDuration: 1000, // Duración de la animación en milisegundos
      animationEasing: 'cubicInOut', // Efecto de la animación
      series: [
        {
          name: 'Número de empleados',
          type: 'pie', // O usa 'bar' para un gráfico de barras
          radius: '50%',
          data: Object.keys(this.countryStats).map(country => ({
            value: this.countryStats[country],
            name: country,
          })),
          label: {
            formatter: '{b}: {d}%', // Etiqueta con nombre y porcentaje
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }
}
