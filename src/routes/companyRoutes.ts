import {Router} from "express";
import CompanyController from "../controller/companyController";
import {EmployeeServiceImpl} from "../services/EmployeeServiceImpl";
import {parseBody} from "../utils/parseBody";
import Employee from "../models/Employee";


const router = Router();
const employeeServiceImpl = new EmployeeServiceImpl();
const companyController = new CompanyController(employeeServiceImpl);
router.get('/allEmployees',
    async (req, res) => {
        res.status(200).json(await companyController.getAllEmployees());
    });
router.post('/employee',
    async (req, res) => {
        const employeeDto = await parseBody(req);
        const isSuccess = await companyController.addEmployee(employeeDto);
        if (isSuccess) {
            res.status(200).send('Employee added successfully');
        } else {
            res.status(409).send('Employee already exists');
        }
    }
);
router.delete('/employee',
    async (req, res) => {
        const employeeDto = await parseBody(req);
        const emp = await companyController.deleteEmployee(employeeDto);
        res.status(200).json(emp);
    }
);

export default router;