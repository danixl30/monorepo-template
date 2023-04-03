import { Module } from '@nestjs/common'
import { AsyncLimiterTaskQueue } from './service/async.limiter.task.queue'

@Module({
    providers: [AsyncLimiterTaskQueue],
    exports: [AsyncLimiterTaskQueue],
})
export class TaskQueueModule {}
