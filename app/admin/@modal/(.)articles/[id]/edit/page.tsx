import { EditArticleModal } from './_PageSections'

const EditArticleInterceptor = ({ params }: { params: { id: string } }) => <EditArticleModal id={params.id} />

export default EditArticleInterceptor
