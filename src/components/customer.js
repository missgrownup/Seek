import React from 'react'
import PropTypes from 'prop-types'

const Customer = ({ customers, selectedCustomer, handleCustomerChange }) => (
	<>
		{customers.length > 0 && (
			<select value={selectedCustomer.id} onChange={handleCustomerChange}>
				<option disabled value="">
					Select customer
				</option>
				{customers.map(customer => (
					<option
						value={customer.id}
						key={customer.id}
						data-pricingrules={JSON.stringify(customer.pricingRules)}
					>
						{customer.name}
					</option>
				))}
			</select>
		)}
	</>
)

Customer.propTypes = {
	customers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	selectedCustomer: PropTypes.shape().isRequired,
	handleCustomerChange: PropTypes.func.isRequired,
}

export default Customer
