const removeItems = (remainingItems, ruleWithMatch) => {
	const { prerequisite, matchTimes } = ruleWithMatch
	const prerequisiteIDs = Object.keys(prerequisite)

	remainingItems.sort((a, b) => (a.id > b.id ? 1 : -1))

	prerequisiteIDs.forEach(itemID => {
		remainingItems.splice(
			remainingItems.findIndex(i => i.id === itemID),
			matchTimes * prerequisite[itemID],
		)
	})

	return remainingItems
}

export default removeItems
