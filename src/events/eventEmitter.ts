import {EventEmitter} from "node:events";

export const eventEmitter = new EventEmitter();

eventEmitter.on('UserDeleted',(employee: string)=>{
    console.log(`${employee} is deleted`);
})