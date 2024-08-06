import { EditAboutUsModal } from './_PageSections'

const EditAboutUsInterceptor = ({ params }: { params: { id: string } }) => <EditAboutUsModal id={params.id} />

export default EditAboutUsInterceptor
