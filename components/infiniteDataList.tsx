import React from 'react'
import { Button, Text } from '@chakra-ui/react'

import { APIResponse } from '../types'
import useInfiniteQuery from '../hooks/useInfiniteQuery'

interface Props<T> {
	queryKey: string
	initialData: APIResponse<T>
	content: (data: T[]) => React.ReactNode
}

export default function InfiniteDataList<T>({ queryKey, initialData, content }: Props<T>) {
	const { data, dataInfo, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<T>(
		queryKey,
		initialData
	)

	return (
		<>
			<Text fontWeight="bold" mb={2}>
				{data.length} out of {dataInfo.count} characters
			</Text>

			{content(data)}

			<Button
				mt={2}
				colorScheme="whatsapp"
				w="full"
				isLoading={isFetchingNextPage}
				onClick={fetchNextPage}
				disabled={!hasNextPage}
			>
				Load more
			</Button>
		</>
	)
}
