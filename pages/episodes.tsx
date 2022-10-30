import { NextPage } from 'next'
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Text,
} from '@chakra-ui/react'

import fetcher from '../libs/fetcher'
import { APIResponse, Episode } from '../types/index'
import InfiniteDataList from '../components/infiniteDataList'

const Episodes: NextPage<{ queryKey: string; initialData: APIResponse<Episode> }> = ({
	queryKey,
	initialData,
}) => {
	return (
		<InfiniteDataList
			queryKey={queryKey}
			initialData={initialData}
			content={(episodes) => (
				<Accordion>
					{episodes.map((episode) => (
						<AccordionItem key={episode.id}>
							<AccordionButton>
								<Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
									{episode.name}
								</Box>
								<AccordionIcon />
							</AccordionButton>
							<AccordionPanel pb={4}>
								<Text>Season: {episode.episode}</Text>
								<Text>Air date: {episode.air_date}</Text>
							</AccordionPanel>
						</AccordionItem>
					))}
				</Accordion>
			)}
		/>
	)
}

export default Episodes

export async function getServerSideProps() {
	const queryKey = '/episode?page=1'
	const initialData = await fetcher(queryKey)

	return {
		props: {
			queryKey,
			initialData,
		},
	}
}
