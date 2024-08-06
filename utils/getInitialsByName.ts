export const getInitialsByName = (name?: string, limit: number = 4) => {
	if (!name) return ''

	let initials = ''
	const nameParts = name.split(' ')
	const sliceAt = limit || nameParts.length

	nameParts.slice(0, sliceAt).forEach(word => {
		if (word) {
			initials += word[0].toUpperCase()
		}
	})

	return initials
}
