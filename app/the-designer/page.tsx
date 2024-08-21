import { getDesigner } from '@actions'
import { QueryPrefetcher } from '@components'
import { DesignerPage } from './_PageSections'

const TheDesigner = () => (
	<QueryPrefetcher queryKey={['designer']} queryFn={getDesigner}>
		<DesignerPage />
	</QueryPrefetcher>
)

export default TheDesigner
