'use client'
import { getRequestsCountByIsViewed, getArticleCount, getPortfolioCount, getServiceCount } from '@actions'
import { useQueries } from '@tanstack/react-query'

export const useDocumentCounts = () => {
	const result = useQueries({
		queries: [
			{ queryKey: ['articleCount'], queryFn: () => getArticleCount(), staleTime: Infinity },
			{ queryKey: ['serviceCount'], queryFn: () => getServiceCount(), staleTime: Infinity },
			{ queryKey: ['portfolioCount'], queryFn: () => getPortfolioCount(), staleTime: Infinity },
			{
				queryKey: ['newRequestsCount'],
				queryFn: () => getRequestsCountByIsViewed(false),
				staleTime: Infinity,
			},
		],
	})

	return result
}
