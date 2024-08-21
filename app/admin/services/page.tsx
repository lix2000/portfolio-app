import { ServicesList } from './_PageSections'
import { getServices } from '@actions'
import { ServerServiceType } from '@types'
import { InfinityQueryPrefetcher } from '@components'

const AdminServices = async () => (
	<InfinityQueryPrefetcher<ServerServiceType> queryKey={['services']} queryFn={getServices}>
		<ServicesList />
	</InfinityQueryPrefetcher>
)

export default AdminServices
