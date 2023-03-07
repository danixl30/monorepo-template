import { CancelHandler } from '../../../application/http/cancel-handler/cancel-handler'
import { OnInit } from '../../../application/on-init/on-init'
import { ValueProvider } from '../../../application/value-provider/value-provider'

export const cancelHandler = (
    valueFactory: ValueProvider,
    onInit: OnInit,
): CancelHandler => {
    const cancelState = valueFactory<(() => void)[]>([])
    const isMounted = valueFactory(true)

    onInit(() => {
        isMounted.value = true
        return () => {
            isMounted.value = false
            cancelState.value.forEach((e) => e())
        }
    })

    return {
        subscribeCancel(cancel: () => void) {
            if (!isMounted.value) {
                cancel()
                return
            }
            cancelState.value = [...cancelState.value, cancel]
        },
        unsubscribeCancel(cancel: () => void) {
            cancelState.value = cancelState.value.filter((e) => e !== cancel)
        },
    }
}
