import { getPortfolio } from '@actions'
import { EditPortfolio } from './_PageSections'

const EditPortfolioPage = async ({ params: { id } }: { params: { id: string } }) => {
	const portfolio = await getPortfolio(id)

	return <EditPortfolio id={id} portfolio={portfolio} />
}

export default EditPortfolioPage
