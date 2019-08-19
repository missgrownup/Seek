import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Checkout from '../checkout'
import mockLineItems from './data/mockLineItems'

configure({ adapter: new Adapter() })

const mockSelectedProduct = {
	id: 'product1',
	name: 'Classic Ad',
	retailPrice: 269.99,
}

const mockPricingRules1 = [
	{
		prerequisite: { product2: 3 },
		result: { product2: 2 },
	},
	{
		prerequisite: { product3: 1 },
		result: 389.99,
	},
]

const mockPricingRules2 = [
	{
		prerequisite: { product1: 2, product2: 1, product3: 1 },
		result: 1222,
	},
]

describe('<Checkout />', () => {
	describe('check add item button', () => {
		let wrapper
		beforeEach(() => {
			wrapper = shallow(<Checkout />)
		})
		it('should have disabled add item button if no product selected', () => {
			expect(wrapper.find('button').prop('disabled')).toEqual(true)
		})
		it('should have enabled add item button if product selected', () => {
			wrapper.setState({
				selectedProduct: mockSelectedProduct,
			})
			expect(wrapper.find('button').prop('disabled')).toEqual(false)
		})
		it('should add item to line items when add item button clicked', () => {
			wrapper.setState({
				selectedProduct: mockSelectedProduct,
			})
			wrapper.find('button').simulate('click', { preventDefault: () => {} })
			expect(wrapper.state('lineItems').length).toEqual(1)
		})
	})

	describe('when default customer, which means no pricing rules', () => {
		let wrapper
		let instance
		beforeEach(() => {
			wrapper = shallow(<Checkout />)
			instance = wrapper.instance()
			wrapper.setState({
				lineItems: mockLineItems,
			})
		})
		it('should not call discount calculate function', () => {
			const spy = jest.spyOn(instance, 'getMinMatchTimes')
			instance.calculateTotal()
			expect(spy).not.toHaveBeenCalled()
		})
		it('should sum up total price without any discount', () => {
			instance.calculateTotal()
			expect(wrapper.state('totalPrice')).toEqual(2891.91)
		})
	})

	describe('when it has multiple pricing rules', () => {
		let wrapper
		let instance
		beforeEach(() => {
			wrapper = shallow(<Checkout pricingRules={mockPricingRules1} />)
			instance = wrapper.instance()
			wrapper.setState({
				lineItems: mockLineItems,
			})
		})
		it('should return 1 for the minmatch for the first rule', () => {
			const minMatch = instance.getMinMatchTimes(
				mockLineItems,
				mockPricingRules1[0],
			)
			expect(minMatch).toEqual(1)
		})
		it('should return 2 for the minmatch for the second rule', () => {
			const minMatch = instance.getMinMatchTimes(
				mockLineItems,
				mockPricingRules1[1],
			)
			expect(minMatch).toEqual(2)
		})
		it('should call discount calculate function twice', () => {
			const spy = jest.spyOn(instance, 'getMinMatchTimes')
			instance.calculateTotal()
			expect(spy).toHaveBeenCalledTimes(2)
		})
		it('should sum up total price with multiple discount', () => {
			instance.calculateTotal()
			expect(wrapper.state('totalPrice')).toEqual(2558.92)
		})
	})

	describe('when it has mix n match in prerequisite, which means more than 1 items in prerequisite', () => {
		let wrapper
		let instance
		beforeEach(() => {
			wrapper = shallow(<Checkout pricingRules={mockPricingRules2} />)
			instance = wrapper.instance()
			wrapper.setState({
				lineItems: mockLineItems,
			})
		})
		it('should return 1 for the minmatch for the rule', () => {
			const minMatch = instance.getMinMatchTimes(
				mockLineItems,
				mockPricingRules2[0],
			)
			expect(minMatch).toEqual(1)
		})
		it('should sum up total price with multiple discount', () => {
			instance.calculateTotal()
			expect(wrapper.state('totalPrice')).toEqual(2855.95)
		})
	})
})
