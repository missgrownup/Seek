const calculateDefaultPrice = (items, baseTotal) => {
	const total = items.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.retailPrice
	}, baseTotal)

	return total
}

export default calculateDefaultPrice
