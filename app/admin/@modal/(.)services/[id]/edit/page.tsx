import { EditServiceModal } from './_PageSections'

const EditServiceInterceptor = ({ params }: { params: { id: string } }) => <EditServiceModal id={params.id} />

export default EditServiceInterceptor
