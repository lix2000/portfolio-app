import { getRequest } from '@actions'
import { RequestPreview } from '@app/admin/@rightSidebar/(.)requests/[id]/_PageSections'

const RequestPreviewPage = async ({ params: { id } }: { params: { id: string } }) => {
	const request = await getRequest(id)

	return <RequestPreview request={request} />
}

export default RequestPreviewPage
