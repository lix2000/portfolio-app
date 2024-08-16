export function toPrice(value: string | number): string {
	if (typeof value === 'number') {
		const numberValue = value
		if (isNaN(numberValue)) return '0.00' // Return null if the value is not a number

		// Format the number to a currency string
		return `${numberValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
	}

	if (typeof value === 'string') {
		// Convert the input to a float and ensure it's a number
		const numberValue = parseFloat(value)
		if (isNaN(numberValue)) return '0.00' // Return null if the value is not a number

		// Format the number to a currency string
		return `${numberValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
	}

	return '0.00' // Return 0.00 if the value is neither a string nor a number
}
