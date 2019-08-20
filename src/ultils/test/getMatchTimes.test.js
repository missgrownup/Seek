import getMatchTimes from '../getMatchTimes'

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
		id: 'product2',
		name: 'Stand out Ad',
		retailPrice: 322.99,
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

const mockItems3 = [
	{
		id: 'product3',
		name: 'Premium Ad',
		retailPrice: 394.99,
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
]

const mockRule1 = {
	prerequisite: { product1: 3 },
	result: [269.99, 2],
}

const mockRule2 = {
	prerequisite: { product1: 2, product2: 1, product3: 1 },
	result: [269.99, 2],
}

describe('getMatchTimes function', () => {
	it('should calculate the correct match times for single match', () => {
		const matchTimes1 = getMatchTimes(mockItems1, mockRule1)
		const matchTimes2 = getMatchTimes(mockItems3, mockRule1)
		expect(matchTimes1).toEqual(1)
		expect(matchTimes2).toEqual(0)
	})

	it('should calculate the correct match times for mix and match', () => {
		const matchTimes1 = getMatchTimes(mockItems2, mockRule2)
		const matchTimes2 = getMatchTimes(mockItems3, mockRule2)
		expect(matchTimes1).toEqual(2)
		expect(matchTimes2).toEqual(0)
	})
})
