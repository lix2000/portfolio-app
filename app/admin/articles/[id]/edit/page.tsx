import { getArticle } from '@actions'
import { EditArticle } from './_PageSections'

const EditArticlePage = async ({ params: { id } }: { params: { id: string } }) => {
	const article = await getArticle(id)

	return <EditArticle id={id} article={article} />
}

export default EditArticlePage
