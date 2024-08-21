import { DesignerPage } from './_PageSections'
import { QueryPrefetcher } from '@components'
import { ServerDesignerType } from '@types'
import { getDesigner } from '@actions'

const AdminTheDesigner = () => (
	<QueryPrefetcher<ServerDesignerType | null> queryKey={['designer']} queryFn={getDesigner}>
		<DesignerPage />
	</QueryPrefetcher>
)

export default AdminTheDesigner
