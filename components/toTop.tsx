import { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { ArrowUpIcon } from '@chakra-ui/icons'

const ToTop: React.FC = () => {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const eventCallback = () => {
			if (window.scrollY > 100) {
				setShow(true)
			} else {
				setShow(false)
			}
		}

		window.addEventListener('scroll', eventCallback)

		return () => {
			window.removeEventListener('scroll', eventCallback)
		}
	}, [])

	return (
		<Button
			hidden={!show}
			position="fixed"
			bottom={5}
			right={5}
			colorScheme="teal"
			p={5}
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				})
			}}
		>
			<ArrowUpIcon w={5} h={5} />
		</Button>
	)
}

export default ToTop
