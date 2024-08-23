import { QueryPrefetcher } from '@components'
import { EditTestimonialModal } from './_PageSections'
import { ServerTestimonialType } from '@types'
import { getTestimonial } from '@actions'

const EditTestimonialInterceptor = ({ params }: { params: { id: string } }) => (
	<QueryPrefetcher<ServerTestimonialType>
		queryKey={['testimonials', params.id]}
		queryFn={() => getTestimonial(params.id)}
	>
		<EditTestimonialModal id={params.id} />
	</QueryPrefetcher>
)

export default EditTestimonialInterceptor
