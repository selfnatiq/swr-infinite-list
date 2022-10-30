import { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { ChakraProvider, Container } from '@chakra-ui/react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import fetcher from '../libs/fetcher'
import Header from '../components/header'
import ToTop from '../components/toTop'

function RickAndMortyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const handleRouteStart = () => NProgress.start()
		const handleRouteDone = () => NProgress.done()

		Router.events.on('routeChangeStart', handleRouteStart)
		Router.events.on('routeChangeComplete', handleRouteDone)
		Router.events.on('routeChangeError', handleRouteDone)

		return () => {
			Router.events.off('routeChangeStart', handleRouteStart)
			Router.events.off('routeChangeComplete', handleRouteDone)
			Router.events.off('routeChangeError', handleRouteDone)
		}
	}, [])

	return (
		<>
			<Head>
				<title>Rick and Morty</title>
				<link rel="icon" type="image/png" href="/favicon.png" />
			</Head>

			<SWRConfig value={{ fetcher }}>
				<ChakraProvider>
					<Container maxW="container.md" py={4}>
						<Header />
						<Component {...pageProps} />
					</Container>

					<ToTop />
				</ChakraProvider>
			</SWRConfig>
		</>
	)
}

export default RickAndMortyApp
