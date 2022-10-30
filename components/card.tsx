import { Image, Text, VStack } from '@chakra-ui/react'

const Card: React.FC<{ name: string; imageSrc: string }> = ({ name, imageSrc }) => {
	return (
		<VStack border="1px" p={2} shadow="md" borderColor="gray.300" rounded="md" overflow="hidden">
			<Image src={imageSrc} alt={name} />
			<Text fontWeight="semibold">{name}</Text>
		</VStack>
	)
}

export default Card
