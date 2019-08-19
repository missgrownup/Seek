import React, { Component } from 'react'
import PropTypes from 'prop-types'
import products from '../data/products'

const defaultSelectedProduct = {
	id: '',
	price: 0,
	name: '',
}

class Checkout extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedProduct: defaultSelectedProduct,
			lineItems: [],
			totalPrice: 0,
		}
	}

	handleProductChange = evt => {
		const target = evt.target
		const option = target.options[target.selectedIndex]

		this.setState({
			selectedProduct: {
				id: target.value,
				name: option.label,
				retailPrice: parseFloat(option.dataset.retailprice),
			},
		})
	}

	addItem = evt => {
		evt.preventDefault()

		const { selectedProduct, lineItems } = this.state
		lineItems.push(selectedProduct)

		this.setState(
			{
				lineItems,
			},
			this.calculateTotal,
		)
	}

	getMinMatchTimes = (items, rule) => {
		const prerequisiteIDs = Object.keys(rule.prerequisite)
		let tickings = Array(prerequisiteIDs.length).fill(0)
		let matchTimes = []
		// collect the total qty of product items which are in the prerequisite list
		items.forEach(item => {
			const itemID = item.id
			const index = prerequisiteIDs.indexOf(itemID)

			if (index >= 0) {
				tickings[index]++
				matchTimes[index] = Math.floor(
					tickings[index] / rule.prerequisite[itemID],
				)
			}
		})

		return matchTimes.length > 0 ? Math.min(...matchTimes) : 0
	}

	removeDiscountedItems = (remainingItems, rule, minMatch) => {
		const prerequisiteIDs = Object.keys(rule.prerequisite)

		if (minMatch > 0) {
			remainingItems.sort((a, b) => (a.id > b.id ? 1 : -1))
			prerequisiteIDs.forEach(itemID => {
				remainingItems.splice(
					remainingItems.findIndex(i => i.id === itemID),
					minMatch * rule.prerequisite[itemID],
				)
			})
		}

		return remainingItems
	}

	calculateDiscountedPrice = (result, minMatch) => {
		let discountedPrice

		// assume there is only 1 item for result
		// assume the result could only be an product item with qty or a price number
		if (typeof result === 'object') {
			const itemID = Object.keys(result)[0]
			discountedPrice =
				products.find(product => product.id === itemID).retailPrice *
				result[itemID] *
				minMatch
		} else {
			discountedPrice = result * minMatch
		}

		return discountedPrice
	}

	calculateTotal = () => {
		const { lineItems } = this.state
		const { pricingRules } = this.props
		let remainingItems = [...lineItems]
		let total = 0

		// check if any pricing rules exist or not
		if (Object.keys(pricingRules[0]).length > 0) {
			// loop all the pricing rules, filter the items meet the requirement out, and sum up
			pricingRules.forEach(rule => {
				// assume the prerequisite list could be multiple product items other than a single item
				// to suite the senario like mix n match or bundles
				let discountedPrice = 0
				const minMatch = this.getMinMatchTimes(remainingItems, rule)

				if (minMatch > 0) {
					// for items that are contained in current rule, remove them from the remaining items
					// so they will not be filtered in the next pricing rule
					this.removeDiscountedItems(remainingItems, rule, minMatch)

					// calculate the price for items which meet the current pricing rule
					discountedPrice = this.calculateDiscountedPrice(rule.result, minMatch)
				}

				total += discountedPrice
			})
		}

		// after checking all the pricing rules, sum up the remaining items' price
		total = remainingItems.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.retailPrice
		}, total)

		this.setState({ totalPrice: parseFloat(total.toFixed(2)) })
	}

	render() {
		const { selectedProduct, lineItems, totalPrice } = this.state

		return (
			<>
				<form>
					<div>
						{products.length > 0 && (
							<select
								value={selectedProduct.id}
								onChange={this.handleProductChange}
							>
								<option disabled value="">
									Select product
								</option>
								{products.map(product => (
									<option
										value={product.id}
										key={product.id}
										data-retailprice={product.retailPrice}
									>
										{product.name}
									</option>
								))}
							</select>
						)}
						<button onClick={this.addItem} disabled={selectedProduct.id === ''}>
							Add item
						</button>
					</div>
				</form>
				<div>
					<h2>Line Items:</h2>
					{lineItems.length > 0 && (
						<ol>
							{lineItems.map((item, i) => (
								<li key={i}>{item.name}</li>
							))}
						</ol>
					)}
				</div>
				<div>
					<strong>Total:</strong> ${totalPrice}
				</div>
			</>
		)
	}
}

Checkout.propTypes = {
	pricingRules: PropTypes.arrayOf(PropTypes.shape()),
}

Checkout.defaultProps = {
	pricingRules: [{}],
}

export default Checkout
