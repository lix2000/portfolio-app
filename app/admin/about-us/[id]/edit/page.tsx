import { getAboutUsById } from '@actions'
import { EditAboutUs } from './_PageSections'

const EditAboutUsPage = async ({ params: { id } }: { params: { id: string } }) => {
	const aboutUs = await getAboutUsById(id)

	return <EditAboutUs id={id} aboutUs={aboutUs} />
}

export default EditAboutUsPage
