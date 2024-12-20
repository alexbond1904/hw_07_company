import Employee from "../models/Employee";

export interface EmployeeService{
    getAllEmployees(): Promise<Employee[]>;
    addEmployee(employee: Employee): Promise<boolean>;
    deleteEmployee(id: number): Promise<Employee | null>;
}