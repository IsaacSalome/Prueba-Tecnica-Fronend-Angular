import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { EmployeeUpdateService } from '../../services/employe-update.service';

@Component({
  selector: 'app-gender-chart',
  standalone: true,
  imports: [NgxEchartsModule, CommonModule],
  templateUrl: './gender-chart.component.html',
  styleUrls: ['./gender-chart.component.css'], // Corregido
})
export class GenderChartComponent implements OnInit {
  chartOptions: any;
  genderStats: { [key: string]: number } | null = null;

  constructor(  private employeeService: EmployeeService,
    private employeeUpdateService: EmployeeUpdateService) {}

  ngOnInit() {
    this.loadGenderStatistics();
    this.employeeUpdateService.dataChanged$.subscribe(() => {
      this.loadGenderStatistics();
    });
    this.employeeService.getGenderStatistics().subscribe(
      (response) => {
        console.log('Datos recibidos:', response); // Verifica los datos
        this.genderStats = response;
        this.updateChartOptions();
      },
      (error) => {
        console.error('Error fetching gender statistics', error);
      }
    );
  }
  
  loadGenderStatistics() {
    this.employeeService.getGenderStatistics().subscribe(
      (response) => {
        this.genderStats = response;
        this.updateChartOptions();
      },
      (error) => {
        console.error('Error fetching gender statistics', error);
      }
    );
  }
  updateChartOptions() {
    this.chartOptions = {
      title: {
        text: 'Estadísticas de Género',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'  // Incluye el porcentaje

      },
      legend: {
        orient: 'horizontal',
        bottom: 10,
      },
      series: [
        {
          name: 'Género',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.genderStats?.['MALE'] || 0, name: 'Hombres' },
            { value: this.genderStats?.['FEMALE'] || 0, name: 'Mujeres' },
            { value: this.genderStats?.['OTHER'] || 0, name: 'Otro' },
          ],
          label: {
            formatter: '{b}: {d}%',  // Etiqueta con nombre y porcentaje
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
