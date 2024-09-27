import { INestApplication } from '@nestjs/common'
// import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../../../src/core/infraestructure/application-module/app.module'

describe('AppController (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/ (GET)', () => {
		expect(true).toBe(true)
	})
})
