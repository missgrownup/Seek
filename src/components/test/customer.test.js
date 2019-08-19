import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import Customer from '../customer'
import mockCustomers from './data/mockCustomers'

configure({ adapter: new Adapter() })

const mockSelectedCustomer = {
	id: 'customer3',
	name: 'Alix Coffee Roasters',
	pricingRules: [
		{
			type: 'discount',
			prerequisite: { product2: 1 },
			result: 299.99,
		},
	],
}

describe('<Customer />', () => {
	it('should render customer component', () => {
		const wrapper = renderer
			.create(
				<Customer
					customers={mockCustomers}
					selectedCustomer={mockSelectedCustomer}
					handleCustomerChange={() => {}}
				/>,
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})
})
