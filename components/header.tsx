import { Box, Tab, TabList, Tabs } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DarkMode from './darkmode'

const tabs = [
	{ label: 'Characters', path: '/' },
	{ label: 'Locations', path: '/locations' },
	{ label: 'Episodes', path: '/episodes' },
]

const Header: React.FC = () => {
	const { pathname } = useRouter()

	return (
		<>
			<DarkMode />

			<Box as="header" mb={5} mt={2}>
				<Tabs
					variant="soft-rounded"
					colorScheme="whatsapp"
					align="center"
					index={tabs.map((tab) => tab.path).indexOf(pathname)}
				>
					<TabList>
						{tabs.map((tab) => (
							<Link href={tab.path} key={tab.path}>
								<Tab>{tab.label}</Tab>
							</Link>
						))}
					</TabList>
				</Tabs>
			</Box>
		</>
	)
}

export default Header
