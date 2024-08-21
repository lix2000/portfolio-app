import { ArticlesList } from './_PageSections'
import { getArticles } from '@actions'
import { ServerArticleType } from '@types'
import { InfinityQueryPrefetcher } from '@components'

const AdminArticles = async () => (
	<InfinityQueryPrefetcher<ServerArticleType> queryKey={['articles']} queryFn={getArticles}>
		<ArticlesList />
	</InfinityQueryPrefetcher>
)

export default AdminArticles
