import { ServicesList } from './_PageSections'
import { getServices } from '@actions'
import { ServerServiceType } from '@types'
import { QueryPrefetcher } from '@components'

const AdminServices = async () => (
	<QueryPrefetcher<ServerServiceType> queryKey={['services']} queryFn={getServices}>
		<ServicesList />
	</QueryPrefetcher>
)

export default AdminServices
