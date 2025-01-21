import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { EmployeeUpdateService } from '../../services/employe-update.service';

@Component({
  selector: 'app-state-chart',
  standalone: true,
  imports: [NgxEchartsModule, CommonModule],
  templateUrl: './state-chart.component.html',
  styleUrls: ['./state-chart.component.css'],
})
export class StateChartComponent implements OnInit {
  chartOptions: any;
  stateStats: { [key: string]: number } = {}; // Inicializa un objeto vacío para almacenar los datos de los estados

  constructor(
    private employeeService: EmployeeService,
    private employeeUpdateService: EmployeeUpdateService
  ) {}

  ngOnInit() {
    // Cargar las estadísticas por estado cuando el componente se inicialice
    this.loadStateStatistics();

    // Suscribirse a cambios en los datos (si se requiere actualizar cuando cambian los datos)
    this.employeeUpdateService.dataChanged$.subscribe(() => {
      this.loadStateStatistics();
    });
  }

  loadStateStatistics() {
    this.employeeService.getStateStatistics().subscribe(
      (response) => {
        this.stateStats = response; // Asigna la respuesta directamente a stateStats
        this.updateChartOptions();
      },
      (error) => {
        console.error('Error fetching state statistics:', error);
      }
    );
  }

  updateChartOptions() {
    // Si prefieres un gráfico de barras, puedes hacerlo de esta forma:
    this.chartOptions = {
      title: {
        text: 'Estadísticas por Estado',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)', // Para pie chart (porcentaje)
      },
      xAxis: {
        type: 'category',
        data: Object.keys(this.stateStats), // Los nombres de los estados
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Número de empleados',
          type: 'bar', // O usa 'pie' si prefieres el gráfico de pastel
          data: Object.values(this.stateStats), // Los valores de los estados
        },
      ],
    };
  }
}
