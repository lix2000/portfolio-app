import { getService } from '@actions'
import { EditService } from './_PageSections'

const EditServicePage = async ({ params: { id } }: { params: { id: string } }) => {
	const service = await getService(id)

	return <EditService id={id} service={service} />
}

export default EditServicePage
