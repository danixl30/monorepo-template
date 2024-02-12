declare global {
    interface PromiseConstructor {
        withResolvers<T>(): {
            promise: Promise<T>
            resolve: (data: T) => any
            reject: (err: any) => any
        }
    }
}

if (!Promise.withResolvers)
    Promise.withResolvers = function <T>() {
        let resolve: (data: T) => any = () => {},
            reject: (err: any) => any = () => {}
        const promise = new Promise<T>((res, rej) => {
            resolve = res
            reject = rej
        })
        return {
            promise,
            resolve,
            reject,
        }
    }

export default null
