import * as fs from "node:fs";
import {NoParamCallback, ObjectEncodingOptions, PathOrFileDescriptor, WriteFileOptions} from "node:fs";
import {Abortable} from "node:events";
import Employee from "../models/Employee";
import path from "node:path";

export default class EmployeeRepository {
    private fsReadable: {
        (path: PathOrFileDescriptor, options: (({
            encoding?: null | undefined;
            flag?: string | undefined
        } & Abortable) | undefined | null), callback: (err: (NodeJS.ErrnoException | null), data: Buffer) => void): void;
        (path: PathOrFileDescriptor, options: (({
            encoding: BufferEncoding;
            flag?: string | undefined
        } & Abortable) | BufferEncoding), callback: (err: (NodeJS.ErrnoException | null), data: string) => void): void;
        (path: PathOrFileDescriptor, options: ((ObjectEncodingOptions & {
            flag?: string | undefined
        } & Abortable) | BufferEncoding | undefined | null), callback: (err: (NodeJS.ErrnoException | null), data: (string | Buffer)) => void): void;
        (path: PathOrFileDescriptor, callback: (err: (NodeJS.ErrnoException | null), data: Buffer) => void): void
    };
    private fsWritable: {
        (file: PathOrFileDescriptor, data: (string | NodeJS.ArrayBufferView), options: WriteFileOptions, callback: NoParamCallback): void;
        (path: PathOrFileDescriptor, data: (string | NodeJS.ArrayBufferView), callback: NoParamCallback): void
    };
    filePath = path.join(__dirname, 'employees.txt')

    constructor() {
        this.fsReadable = fs.readFile;
        this.fsWritable = fs.writeFile;
    }

    readAll(): Promise<Employee[]> {
        return new Promise((resolve, reject) => {
            this.fsReadable(this.filePath, {encoding: 'utf-8'}, (err, data) => {
                if (data) {
                    const res = JSON.parse(data) as Employee[];
                    resolve(res);
                } else {
                    console.log(err);
                }
            });
        })
    }

    write(employee: Employee) {
        this.readAll().then(employees=> {
            employees.push(employee);
            this.fsWritable(this.filePath, JSON.stringify(employees), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log("file is written")
                }
            });
        });


    }

    writeAll(...employees: Employee[]) {
        this.fsWritable(this.filePath, JSON.stringify([...employees]), (err) => {
            if (err) {
                console.log(err);
            } else {
                // console.log("file is written")
            }
        });
    }
}