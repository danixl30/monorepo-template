import { createHash } from 'node:crypto'
import { Injectable } from '@nestjs/common'
import { Crypto } from 'src/core/application/crypto/crypto'

const hasher = createHash('sha256')

@Injectable()
export class Sha256Service implements Crypto {
	async encrypt(value: string): Promise<string> {
		return hasher.update(value).digest('hex')
	}

	async compare(normal: string, encrypted: string): Promise<boolean> {
		return hasher.update(normal).digest('hex') === encrypted
	}
}
