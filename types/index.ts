export interface ResponseInfo {
	count: number
	pages: number
	next?: string
	prev?: any
}

interface Origin {
	name: string
	url: string
}

export interface Character {
	id: number
	name: string
	status: string
	species: string
	type: string
	gender: string
	origin: Origin
	location: Location
	image: string
	episode: string[]
	url: string
	created: Date
}

export interface Episode {
	id: number
	name: string
	air_date: string
	episode: string
	characters: string[]
	url: string
	created: Date
}

export interface Location {
	id: number
	name: string
	type: string
	dimension: string
	residents: string[]
	url: string
	created: Date
}

export interface APIResponse<T> {
	info: ResponseInfo
	results: T[]
}
