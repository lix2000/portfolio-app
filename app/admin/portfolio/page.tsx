import { getPortfolios } from '@actions'
import { QueryPrefetcher } from '@components'
import { ServerPortfolioType } from '@types'
import { PortfolioList } from './_PageSections'

const AdminPortfolio = async () => (
	<QueryPrefetcher<ServerPortfolioType> queryKey={['portfolios']} queryFn={getPortfolios}>
		<PortfolioList />
	</QueryPrefetcher>
)

export default AdminPortfolio
