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
import { APIResponse, Location } from '../types/index'
import InfiniteDataList from '../components/infiniteDataList'

const Locations: NextPage<{ queryKey: string; initialData: APIResponse<Location> }> = ({
	queryKey,
	initialData,
}) => {
	return (
		<InfiniteDataList
			queryKey={queryKey}
			initialData={initialData}
			content={(locations) => (
				<Accordion>
					{locations.map((location) => (
						<AccordionItem key={location.id}>
							<AccordionButton>
								<Box flex="1" textAlign="left" fontWeight="semibold" fontSize="lg">
									{location.name}
								</Box>
								<AccordionIcon />
							</AccordionButton>
							<AccordionPanel pb={4}>
								<Text>Type: {location.type}</Text>
								<Text>Dimension: {location.dimension}</Text>
							</AccordionPanel>
						</AccordionItem>
					))}
				</Accordion>
			)}
		/>
	)
}

export default Locations

export async function getServerSideProps() {
	const queryKey = '/location?page=1'
	const initialData = await fetcher(queryKey)

	return {
		props: {
			queryKey,
			initialData,
		},
	}
}
