import { useState } from 'react'
import { NextPage } from 'next'
import {
	Box,
	Button,
	Flex,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text,
} from '@chakra-ui/react'

import Card from '../components/card'
import fetcher from '../libs/fetcher'
import { APIResponse, Character } from '../types/index'
import InfiniteDataList from '../components/infiniteDataList'

const Home: NextPage<{ initialKey: string; initialData: APIResponse<Character> }> = ({
	initialKey,
	initialData,
}) => {
	const [modal, setModal] = useState<{ show: boolean; data: Character | null }>({
		show: false,
		data: null,
	})

	const onClose = () => setModal((p) => ({ ...p, show: false }))

	return (
		<>
			<InfiniteDataList
				queryKey={initialKey}
				initialData={initialData}
				content={(characters) => (
					<SimpleGrid columns={2} spacing={2}>
						{characters.map((character) => (
							<button
								key={character.id}
								onClick={() => {
									setModal({ show: true, data: character })
								}}
							>
								<Card name={character.name} imageSrc={character.image} />
							</button>
						))}
					</SimpleGrid>
				)}
			/>

			{modal.data && (
				<Modal
					isOpen={modal.show}
					onClose={onClose}
					isCentered
					motionPreset="slideInBottom"
					size="sm"
				>
					<ModalOverlay />

					<ModalContent>
						<ModalHeader>{modal.data.name}</ModalHeader>
						<ModalBody>
							<Flex gap={2}>
								<Image
									boxSize="200px"
									src={modal.data.image}
									alt={modal.data.name}
									borderRadius="sm"
									shadow="md"
									border="1px"
									borderColor="gray.100"
									p={1}
								/>

								<Box>
									<Text>Status: {modal.data.status}</Text>
									<Text>Species: {modal.data.species}</Text>
									<Text>Gender: {modal.data.gender}</Text>
									<Text>Origin: {modal.data.origin.name}</Text>
								</Box>
							</Flex>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	)
}

export default Home

export async function getServerSideProps() {
	const initialKey = '/character?page=1'
	const data = await fetcher(initialKey)

	return {
		props: {
			initialKey,
			initialData: data,
		},
	}
}
