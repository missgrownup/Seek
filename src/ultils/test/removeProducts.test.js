import removeProducts from '../removeProducts'

const mockItems1 = [
	{
		id: 'product1',
		name: 'Classic Ad',
		retailPrice: 269.99,
	},
	{
		id: 'product1',
		name: 'Classic Ad',
		retailPrice: 269.99,
	},
	{
		id: 'product1',
		name: 'Classic Ad',
		retailPrice: 269.99,
	},
	{
		id: 'product2',
		name: 'Stand out Ad',
		retailPrice: 322.99,
	},
	{
		id: 'product3',
		name: 'Premium Ad',
		retailPrice: 394.99,
	},
]

const mockItems2 = [
	{
		id: 'product1',
		name: 'Classic Ad',
		retailPrice: 269.99,
	},
	{
		id: 'product1',
		name: 'Classic Ad',
		retailPrice: 269.99,
	},
	{
		id: 'product1',
		name: 'Classic Ad',
		retailPrice: 269.99,
	},
	{
		id: 'product1',
		name: 'Classic Ad',
		retailPrice: 269.99,
	},
	{
		id: 'product2',
		name: 'Stand out Ad',
		retailPrice: 322.99,
	},
	{
		id: 'product2',
		name: 'Stand out Ad',
		retailPrice: 322.99,
	},
	{
		id: 'product3',
		name: 'Premium Ad',
		retailPrice: 394.99,
	},
	{
		id: 'product3',
		name: 'Premium Ad',
		retailPrice: 394.99,
	},
	{
		id: 'product3',
		name: 'Premium Ad',
		retailPrice: 394.99,
	},
]

const mockRule1 = {
	prerequisite: { product1: 3 },
	result: [269.99, 2],
	matchTimes: 1,
}

const mockRule2 = {
	prerequisite: { product1: 2, product2: 1, product3: 1 },
	result: [269.99, 2],
	matchTimes: 2,
}

describe('removeProducts function', () => {
	it('should remove items from remaining items if there are match - single match', () => {
		const remainingItems = removeProducts(mockItems1, mockRule1)
		expect(remainingItems).toEqual([
			{
				id: 'product2',
				name: 'Stand out Ad',
				retailPrice: 322.99,
			},
			{
				id: 'product3',
				name: 'Premium Ad',
				retailPrice: 394.99,
			},
		])
	})

	it('should remove items from remaining items if there are match - multiple match', () => {
		const remainingItems = removeProducts(mockItems2, mockRule2)
		expect(remainingItems).toEqual([
			{
				id: 'product3',
				name: 'Premium Ad',
				retailPrice: 394.99,
			},
		])
	})
})
