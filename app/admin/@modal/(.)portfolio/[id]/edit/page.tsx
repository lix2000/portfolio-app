import { EditPortfolioModal } from './_PageSections'

const EditPortfolioInterceptor = ({ params }: { params: { id: string } }) => (
	<EditPortfolioModal id={params.id} />
)

export default EditPortfolioInterceptor
