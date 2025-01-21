import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeUpdateService {
  private dataChangedSource = new Subject<void>();
  dataChanged$ = this.dataChangedSource.asObservable();

  notifyDataChange() {
    this.dataChangedSource.next();
  }
}
