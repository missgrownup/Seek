const calculateDiscountedPrice = (result, matchTimes) => {
	let discountedPrice

	// assume there is only 1 item for result
	// assume the result could only be combination of price and qty or a price number
	if (typeof result === 'object') {
		discountedPrice = result[0] * result[1] * matchTimes
	} else {
		discountedPrice = result * matchTimes
	}

	return discountedPrice
}

export default calculateDiscountedPrice
