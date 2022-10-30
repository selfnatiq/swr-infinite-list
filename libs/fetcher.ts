const API_URL = 'https://rickandmortyapi.com/api'

export default async function fetcher(endpoint: string) {
	const res = await fetch(API_URL + endpoint.replace(API_URL, ''))
	return await res.json()
}
