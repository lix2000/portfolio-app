import { QueryPrefetcher } from '@components'
import { EditTestimonial } from './_PageSections'
import { ServerTestimonialType } from '@types'
import { getTestimonial } from '@actions'

const EditTestimonialPage = ({ params: { id } }: { params: { id: string } }) => (
	<QueryPrefetcher<ServerTestimonialType> queryKey={['testimonials', id]} queryFn={() => getTestimonial(id)}>
		<EditTestimonial id={id} />
	</QueryPrefetcher>
)

export default EditTestimonialPage
