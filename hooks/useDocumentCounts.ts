'use client'
import { getAppointmentsCountByIsViewed, getArticleCount, getPortfolioCount, getServiceCount } from '@actions'
import { useQueries } from '@tanstack/react-query'

export const useDocumentCounts = () => {
	const result = useQueries({
		queries: [
			{ queryKey: ['articleCount'], queryFn: () => getArticleCount(), staleTime: Infinity },
			{ queryKey: ['serviceCount'], queryFn: () => getServiceCount(), staleTime: Infinity },
			{ queryKey: ['portfolioCount'], queryFn: () => getPortfolioCount(), staleTime: Infinity },
			{
				queryKey: ['newAppointmentsCount'],
				queryFn: () => getAppointmentsCountByIsViewed(false),
				staleTime: Infinity,
			},
		],
	})

	return result
}
