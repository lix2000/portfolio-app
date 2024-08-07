import { getRequest } from '@actions'
import { RequestPreview } from './_PageSections'
import { SidebarRight } from '@components'

const RequestPreviewInterceptor = async ({ params: { id } }: { params: { id: string } }) => {
	const request = await getRequest(id)

	return (
		<SidebarRight>
			<RequestPreview request={request} />
		</SidebarRight>
	)
}

export default RequestPreviewInterceptor
