import { getRequests } from '@actions'
import { InfinityQueryPrefetcher } from '@components'
import { ServerRequestType } from '@types'
import { RequestsList } from './_PageSections'

const AdminRequests = () => (
	<InfinityQueryPrefetcher<ServerRequestType> queryKey={['requests']} queryFn={getRequests}>
		<RequestsList />
	</InfinityQueryPrefetcher>
)

export default AdminRequests
