import { Flex, Icon, Switch, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const DarkMode: React.FC = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Flex w="full" justifyContent="end">
			<Flex alignItems="center" gap={3}>
				<Icon as={SunIcon} w={5} h={5} />
				<Switch
					size="lg"
					isChecked={colorMode === 'dark'}
					colorScheme="blue"
					onChange={toggleColorMode}
				/>
				<Icon as={MoonIcon} w={5} h={5} />
			</Flex>
		</Flex>
	)
}

export default DarkMode
