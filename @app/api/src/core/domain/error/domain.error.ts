export abstract class DomainError extends Error {
    constructor(message: string, private _name: string) {
        super(message)
    }

    get name() {
        return this._name
    }
}
