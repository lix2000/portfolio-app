import { getRequests } from '@actions'
import { QueryPrefetcher } from '@components'
import { ServerRequestType } from '@types'
import { RequestsList } from './_PageSections'

const AdminRequests = () => (
	<QueryPrefetcher<ServerRequestType> queryKey={['requests']} queryFn={getRequests}>
		<RequestsList />
	</QueryPrefetcher>
)

export default AdminRequests
