import React, { Component } from 'react'
import customers from './data/customers'
import Customer from './components/customer'
import Checkout from './components/checkout'

const defaultSelectedCustomer = {
	id: '',
	name: '',
	pricingRules: [{}],
}

class JobAds extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedCustomer: defaultSelectedCustomer,
		}
	}

	handleCustomerChange = evt => {
		const target = evt.target
		const option = target.options[target.selectedIndex]
		const pricingRules = option.dataset.pricingrules

		this.setState({
			selectedCustomer: {
				id: target.value,
				name: option.label,
				pricingRules: pricingRules ? JSON.parse(pricingRules) : [{}],
			},
		})
	}

	render() {
		const { selectedCustomer } = this.state

		return (
			<div>
				{selectedCustomer.id === '' ? (
					<Customer
						customers={customers}
						selectedCustomer={selectedCustomer}
						handleCustomerChange={this.handleCustomerChange}
					/>
				) : (
					<>
						<p>{selectedCustomer.name}</p>
						<Checkout pricingRules={selectedCustomer.pricingRules} />
					</>
				)}
			</div>
		)
	}
}

export default JobAds
