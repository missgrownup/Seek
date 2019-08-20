const getMatchTimes = (items, rule) => {
	const prerequisiteIDs = Object.keys(rule.prerequisite)
	let tickings = Array(prerequisiteIDs.length).fill(0)
	let matchTimes = Array(prerequisiteIDs.length).fill(0)
	// collect the total qty of product items which are in the prerequisite list
	items.forEach(item => {
		const itemID = item.id
		const index = prerequisiteIDs.indexOf(itemID)

		if (index >= 0) {
			tickings[index]++
			matchTimes[index] = Math.floor(
				tickings[index] / rule.prerequisite[itemID],
			)
		}
	})

	return matchTimes.length > 0 ? Math.min(...matchTimes) : 0
}

export default getMatchTimes
