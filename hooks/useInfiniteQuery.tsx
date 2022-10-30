import useSWRInfinite from 'swr/infinite'

import { APIResponse } from '../types'

export default function useInfiniteQuery<T>(key: string, initialData: APIResponse<T>) {
	const { data, error, size, setSize } = useSWRInfinite(
		(pageIndex, previousPageData) => {
			// reached the end
			if (previousPageData && !previousPageData.info.next) return null
			// first page
			if (pageIndex === 0) return key
			// next page
			return previousPageData.info.next
		},
		{
			fallbackData: [initialData],
			revalidateFirstPage: false,
		}
	)

	const fetchNextPage = () => setSize((size) => size + 1)

	const flattenData = data?.flatMap((page) => page.results) ?? []
	const hasNextPage = Boolean(data?.[size - 1]?.info.next)
	const isFetchingInitialData = !data && !error
	const isFetchingNextPage =
		isFetchingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')

	return {
		data: flattenData,
		dataInfo: initialData.info,
		error: error,
		hasNextPage,
		fetchNextPage,
		isFetchingInitialData,
		isFetchingNextPage,
	}
}
