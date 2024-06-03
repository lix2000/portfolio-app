'use server'
import { AboutUs } from '@models'

export const getAboutUs = async (request?: { page?: number; limit?: number }) => {
  const { page = 1, limit = 10 } = request || {}
  const offset = (page - 1) * limit
  const [aboutUs, count] = await Promise.all([
    AboutUs.find().skip(offset).limit(limit).lean(),
    AboutUs.countDocuments(),
  ])
  const pages = Math.ceil(count / limit)

  return { aboutUs, pages, page: page }
}
