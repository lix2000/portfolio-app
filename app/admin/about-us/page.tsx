import { QueryPrefetcher } from '@components'
import { ServerAboutUsType } from '@types'
import { getAboutUs } from '@actions'
import { AboutUsList } from './_PageSections'

const AdminAboutUsPage = () => (
	<QueryPrefetcher<ServerAboutUsType> queryKey={['aboutUses']} queryFn={getAboutUs}>
		<AboutUsList />
	</QueryPrefetcher>
)

export default AdminAboutUsPage
