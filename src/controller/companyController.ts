import {EmployeeService} from "../services/EmployeeService";
import Employee from "../models/Employee";
import {eventEmitter} from "../events/eventEmitter";

export default class CompanyController {
    private employeeService: EmployeeService;

    constructor(employeeService: EmployeeService) {
        this.employeeService = employeeService;
    }

    async getAllEmployees (){
        return await this.employeeService.getAllEmployees();
    }

    async addEmployee(employeeDto: unknown) {
        return await this.employeeService.addEmployee(employeeDto as Employee);
    }

    async deleteEmployee(employeeDto: unknown) {
        const victim = await this.employeeService.deleteEmployee((employeeDto as { id: number }).id)!;
        eventEmitter.emit('UserDeleted', victim?.name);
        return victim;
    }
}