export type ServerResponse<T> = {
	page?: number
	pages?: number
	data?: T
	hasMore?: boolean
}
