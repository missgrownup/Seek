import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import JobAds from './jobAds'

configure({ adapter: new Adapter() })

describe('<JobAds />', () => {
	it('should render customer and not render checkout component when no customer selected', () => {
		const wrapper = shallow(<JobAds />)
		expect(wrapper.find('Customer').exists()).toEqual(true)
		expect(wrapper.find('Checkout').exists()).toEqual(false)
	})
	it('should render checkout and not render customer component when customer selected', () => {
		const wrapper = shallow(<JobAds />)
		const mockCustomer = {
			id: 'customer3',
			name: 'Alix Coffee Roasters',
			pricingRules: [
				{
					prerequisite: { product2: 1 },
					result: 299.99,
				},
			],
		}
		wrapper.setState({
			selectedCustomer: mockCustomer,
		})
		expect(wrapper.find('Customer').exists()).toEqual(false)
		expect(wrapper.find('Checkout').exists()).toEqual(true)
	})
})
