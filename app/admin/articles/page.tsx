import { ArticlesList } from './_PageSections'
import { getArticles } from '@actions'
import { ServerArticleType } from '@types'
import { QueryPrefetcher } from '@components'

const AdminArticles = async () => (
	<QueryPrefetcher<ServerArticleType> queryKey={['articles']} queryFn={getArticles}>
		<ArticlesList />
	</QueryPrefetcher>
)

export default AdminArticles
