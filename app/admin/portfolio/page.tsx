import { getPortfolios } from '@actions'
import { InfinityQueryPrefetcher } from '@components'
import { ServerPortfolioType } from '@types'
import { PortfolioList } from './_PageSections'

const AdminPortfolio = async () => (
	<InfinityQueryPrefetcher<ServerPortfolioType> queryKey={['portfolios']} queryFn={getPortfolios}>
		<PortfolioList />
	</InfinityQueryPrefetcher>
)

export default AdminPortfolio
