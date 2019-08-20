import calculateDiscountPrice from '../calculateDiscountPrice'

const mockResult1 = [269.99, 2]
const mockResult2 = 299.99

describe('calculateDiscountPrice function', () => {
	it('should calculate the correct match times for result as a object', () => {
		const discountedTotal = calculateDiscountPrice(mockResult1, 2)
		expect(discountedTotal).toEqual(1079.96)
	})

	it('should calculate the correct match times for result as a number', () => {
		const discountedTotal = calculateDiscountPrice(mockResult2, 3)
		expect(discountedTotal).toEqual(899.97)
	})
})
