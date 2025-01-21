import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { GenderChartComponent } from './charts/gender-chart/gender-chart.component';
import { StateChartComponent } from "./charts/state-chart/state-chart.component";
import { CountryChartComponent } from "./charts/country-chart/country-chart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, GenderChartComponent, RouterOutlet, StateChartComponent, CountryChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba_tecnica';
}
