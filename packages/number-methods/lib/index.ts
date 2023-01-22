declare global {
    interface Number {
        nextInt(): number
    }
}

Number.prototype.nextInt = function () {
    return Math.ceil(this)
}

export default null
