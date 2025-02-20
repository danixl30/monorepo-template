import { randomUUID } from "node:crypto";
import { IDGenerator } from "src/core/application/ID/ID.generator";

export const generateUUID: IDGenerator<string> = () => randomUUID()
