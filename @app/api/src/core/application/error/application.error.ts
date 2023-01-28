export abstract class ApplicationError extends Error {
    constructor(message: string, private _name: string) {
        super(message)
    }

    get name() {
        return this._name
    }
}
