import { getTestimonials } from '@actions'
import { InfinityQueryPrefetcher } from '@components'
import { ServerTestimonialType } from '@types'
import { TestimonialsList } from './_PageSections'

const AdminTestimonials = () => (
	<InfinityQueryPrefetcher<ServerTestimonialType> queryKey={['testimonials']} queryFn={getTestimonials}>
		<TestimonialsList />
	</InfinityQueryPrefetcher>
)

export default AdminTestimonials
