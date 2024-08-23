import { getTestimonial } from '@actions'
import { QueryPrefetcher } from '@components'
import { ServerTestimonialType } from '@types'
import { TestimonialPreviewSidebar } from './_PageSections'

const TestimonialPreviewInterceptor = ({ params }: { params: { id: string } }) => (
	<QueryPrefetcher<ServerTestimonialType>
		queryKey={['testimonials', params.id]}
		queryFn={() => getTestimonial(params.id)}
	>
		<TestimonialPreviewSidebar params={params} />
	</QueryPrefetcher>
)

export default TestimonialPreviewInterceptor
