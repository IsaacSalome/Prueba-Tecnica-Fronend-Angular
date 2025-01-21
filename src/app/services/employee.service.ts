import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Employee {
  employeeNumber: string;
  name: string;
  lastName: string;
  company: string;
  gender: string;
  country: string;
  state: string;
  curp: string;
  rfc: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8001/api/v1/employees';

  constructor(private http: HttpClient) {}

  // 1. Obtener todos los empleados
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }
  // 2. Crear un nuevo empleado
  createEmployee(newEmployee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, newEmployee);
  }

  // 2. Obtener un empleado por número
  getEmployeeByNumber(employeeNumber: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${employeeNumber}`);
  }

  // 3. Actualizar un empleado
  updateEmployee(employeeNumber: string,  updatedEmployee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${employeeNumber}`,updatedEmployee
    );
  }
  

  // 4. Eliminar un empleado
  deleteEmployee(employeeNumber: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${employeeNumber}`);
  }

  // 5. Obtener datos para gráficas por género
  getGenderStatistics(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/gender`);
  }
}
