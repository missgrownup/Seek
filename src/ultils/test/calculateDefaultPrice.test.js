import calculateDefaultPrice from '../calculateDefaultPrice'

const mockItems = [
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

describe('calculateDefaultPrice function', () => {
	it('should calculate the correct total default price for items', () => {
		const total = calculateDefaultPrice(mockItems, 999)
		expect(total).toEqual(2256.96)
	})
})
