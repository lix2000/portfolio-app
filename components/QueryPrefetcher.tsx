'use server'
import { log } from '@lib'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

interface Props<T> {
	queryKey: string[]
	queryFn: (...args: any) => Promise<T | T[]>
}

const QueryPrefetcher = async <T extends unknown>({
	queryKey,
	queryFn,
	children,
}: PropsWithChildren<Props<T>>) => {
	const queryClient = new QueryClient()
	log.info('🔄 Prefetching', queryKey)

	await queryClient.prefetchQuery({
		queryKey,
		queryFn: () => queryFn(),
	})
	log.success('✅ Prefetched', queryKey)

	return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}

export default QueryPrefetcher
