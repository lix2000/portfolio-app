'use server'
import { Service } from '@models'

export const getServices = async (request?: { page?: number; limit?: number }) => {
  const { page = 1, limit = 10 } = request || {}
  const offset = (page - 1) * limit
  const [services, count] = await Promise.all([
    Service.find().skip(offset).limit(limit).lean(),
    Service.countDocuments(),
  ])
  const pages = Math.ceil(count / limit)

  return { services, pages, page: page }
}
