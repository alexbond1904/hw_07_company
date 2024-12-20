
export default class Employee {
    private readonly _id: number;
    private _name: string;
    private _position: string;


    constructor(id: number, name: string, position: string) {
        this._id = id;
        this._name = name;
        this._position = position;
    }


    set name(value: string) {
        this._name = value;
    }

    set position(value: string) {
        this._position = value;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get position(): string {
        return this._position;
    }
}