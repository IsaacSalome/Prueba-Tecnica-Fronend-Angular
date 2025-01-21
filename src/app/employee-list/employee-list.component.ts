import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Gender } from '../models/gender.enum';
import { FormsModule } from '@angular/forms';
import { CommonModule, KeyValuePipe, NgFor } from '@angular/common';
import { EmployeeUpdateService } from '../services/employe-update.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [NgFor, CommonModule, FormsModule, KeyValuePipe],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  selectedEmployee: any;
  genderStats: any;
  updateEmployeeNumber: string = '';
  updatedEmployee: any = {};
  newEmployee: any = {};
  isUpdateModalOpen: boolean = false;
  isCreateModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  iselectedEmployee: any = null; // Detalle del empleado seleccionado
  isDetailModalOpen: boolean = false; // Para controlar si el modal está abierto o cerrado 
  isCreateSuccess: boolean = false; 
  isUpdateSuccess: boolean = false; 
  isDeleteSuccess: boolean = false; 
  isError: boolean = false; 

  Gender = Gender;

  constructor(
    private employeeService: EmployeeService,
    private employeeUpdateService: EmployeeUpdateService,
  ) {}

  ngOnInit() {
    this.loadAllEmployees();
  }

  loadAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response;
        console.log('Employees:', this.employees);
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  getEmployeeByNumber(employeeNumber: string) {
    this.employeeService.getEmployeeByNumber(employeeNumber).subscribe(
      (response) => {
        this.selectedEmployee = response;
        console.log('Employee:', this.selectedEmployee);
      },
      (error) => {
        console.error(`Error fetching employee ${employeeNumber}`, error);
      }
    );
  }

  openUpdateModal(employee: any) {
    this.updatedEmployee = { ...employee }; // Copia los datos del empleado
    this.isUpdateModalOpen = true; // Abre el modal de actualización
    console.log('Modal de actualización abierto');
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
    console.log('Modal de creación abierto');
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
    console.log('Modal de actualización cerrado');
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
    console.log('Modal de creación cerrado');
  }

  closeCreateSuccessAlert() {
    this.isCreateSuccess = false;
  }

  closeUpdateSuccessAlert() {
    this.isUpdateSuccess = false;
  }

  closeDeleteSuccessAlert() {
    this.isDeleteSuccess = false;
  }

  closeErrorAlert() {
    this.isError = false;
  }

  // Método para abrir el modal de confirmación de eliminación
  openDeleteModal(employee: any) {
    this.selectedEmployee = employee; // Guarda el empleado seleccionado
    this.isDeleteModalOpen = true; // Abre el modal de confirmación
  }

  // Método para cerrar el modal de confirmación de eliminación
  closeDeleteModal() {
    this.isDeleteModalOpen = false; // Cierra el modal de confirmación
  }

  // Método para abrir el modal con el detalle del empleado
  openDetailModal(employee: any) {
    this.selectedEmployee = employee; // Asignar el empleado seleccionado al objeto
    this.isDetailModalOpen = true; // Abrir el modal
  }

  // Método para cerrar el modal
  closeDetailModal() {
    this.isDetailModalOpen = false; // Cerrar el modal
    this.selectedEmployee = null; // Limpiar el detalle al cerrar
  }

  // Método para crear un nuevo empleado
  createEmployee() {
    this.employeeService.createEmployee(this.newEmployee).subscribe(
      (response) => {
        console.log('Empleado creado:', response);
        this.loadAllEmployees(); // Recarga la lista de empleados
        this.isCreateSuccess = true; // Muestra la alerta de éxito
        this.newEmployee = {}; // Limpia el formulario
        this.isCreateModalOpen = false; // Cierra el modal de creación
        this.employeeUpdateService.notifyDataChange();
      },
      (error) => {
        console.error('Error creating employee', error);
        this.isError = true; // Muestra la alerta de error

      }
    );
  }

  // Método para actualizar un empleado
  updateEmployee(employeeNumber: string, updatedEmployee: any) {
    this.employeeService
      .updateEmployee(employeeNumber, updatedEmployee)
      .subscribe(
        (response) => {
          console.log('Updated Employee:', response);
          this.loadAllEmployees(); // Recarga la lista de empleados
          this.isUpdateSuccess = true; // Muestra la alerta de éxito
          this.isUpdateModalOpen = false; // Cierra el modal de actualización
          this.employeeUpdateService.notifyDataChange();
        },
        (error) => {
          console.error(`Error updating employee ${employeeNumber}`, error);
          this.isError = true; // Muestra la alerta de error

        }
      );
  }

  // Método para eliminar el empleado
  deleteEmployee(employeeNumber: string) {
    this.employeeService.deleteEmployee(employeeNumber).subscribe(
      () => {
        console.log(`Employee ${employeeNumber} deleted successfully`);
        this.loadAllEmployees(); // Recarga la lista de empleados
        this.isDeleteSuccess = true; // Muestra la alerta de éxito
        this.closeDeleteModal(); // Cierra el modal de confirmación
        this.employeeUpdateService.notifyDataChange();

      },
      (error) => {
        console.error(`Error deleting employee ${employeeNumber}`, error);
        this.isError = true; // Muestra la alerta de error
      }
    );
  }

}
