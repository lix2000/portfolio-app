import { Document } from 'mongoose'

export const docToJSON = <T>(doc: Document<any>[] | Document<any>) => JSON.parse(JSON.stringify(doc)) as T
