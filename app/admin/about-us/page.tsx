import { InfinityQueryPrefetcher } from '@components'
import { ServerAboutUsType } from '@types'
import { getAboutUs } from '@actions'
import { AboutUsList } from './_PageSections'

const AdminAboutUsPage = () => (
	<InfinityQueryPrefetcher<ServerAboutUsType> queryKey={['aboutUses']} queryFn={getAboutUs}>
		<AboutUsList />
	</InfinityQueryPrefetcher>
)

export default AdminAboutUsPage
