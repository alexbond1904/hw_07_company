import {EmployeeService} from './EmployeeService';
import Employee from "../models/Employee";
import EmployeeRepository from "../dao/EmployeeRepository";

export class EmployeeServiceImpl implements EmployeeService {
    // private employees: Employee[] = [];
    private employeeRepository = new EmployeeRepository();

    async getAllEmployees(): Promise<Employee[]> {
        return await this.employeeRepository.readAll();
    }

    async addEmployee(employee: Employee): Promise<boolean> {
       return new Promise((resolve, reject) => {
           this.employeeRepository.readAll().then(employees=> {
               if(employees.findIndex(elem => elem.id === employee.id) === -1){
                   employees.push(employee);
                   this.employeeRepository.writeAll(...employees);
                   resolve(true);
               }
               resolve(false);
           });
       })
    }

    async deleteEmployee(id: number): Promise<Employee | null> {
        const employees = await this.employeeRepository.readAll();
        const index = employees.findIndex(elem => elem.id === id);
        const victim = employees.at(index) as Employee;
        if(index === -1) {
            return null;
        }
        employees.splice(index, 1);
        this.employeeRepository.writeAll(...employees);
        return victim;
    }
}