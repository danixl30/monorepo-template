import { Injectable } from '@nestjs/common'
import Limiter from 'async-limiter'
import { AddTask } from 'src/core/application/task-queue/task.queue'

@Injectable()
export class AsyncLimiterTaskQueue {
	private readonly queue = new Limiter({ concurrency: 1 })
	getAddTask(): AddTask {
		return (task) =>
			this.queue.push(async (cb: () => void) => {
				await task()
				cb()
			})
	}
}
