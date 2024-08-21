'use server'
import { log } from '@lib'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { ServerResponse } from '@types'
import { PropsWithChildren } from 'react'

interface Props<T> {
	queryKey: string[]
	queryFn: (...args: any) => Promise<ServerResponse<T[]>>
}

const InfinityQueryPrefetcher = async <T extends unknown>({
	queryKey,
	queryFn,
	children,
}: PropsWithChildren<Props<T>>) => {
	const queryClient = new QueryClient()
	log.info('🔄 Infinity Prefetching', queryKey)

	await queryClient.prefetchInfiniteQuery({
		queryKey,
		queryFn: ({ pageParam }) => queryFn({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage: ServerResponse<T[]>) => (lastPage.hasMore ? (lastPage.page ?? 1) + 1 : null),
	})
	log.success('✅ Infinity Prefetched', queryKey)

	return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}

export default InfinityQueryPrefetcher
