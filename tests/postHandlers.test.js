// eslint-disable-next-line no-undef
const config = require('../config');

test('POST /api/v1/orders should create order with valid product list', async () => {
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const orderData = {
			productsList: [
				{
					id: 1,
					quantity: 2
				},
				{
					id: 5,
					quantity: 2
				},
				{
					id: 3,
					quantity: 1
				}
			]
		};

		const response = await fetch(`${baseUrl}/api/v1/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(orderData)
		});

		const responseStatus = response.status;
		console.log('Response status:', responseStatus);
		expect(responseStatus).toBe(200);

		const responseData = await response.json();
		console.log('Response body:', responseData);

		// Verify response structure
		expect(responseData).toHaveProperty('productsList');
		expect(responseData).toHaveProperty('status');
		expect(responseData).toHaveProperty('deliveryPriceOur');
		expect(responseData).toHaveProperty('deliveryTime');
		expect(responseData).toHaveProperty('courierService');
		expect(responseData).toHaveProperty('deliveryPrice');
		expect(responseData).toHaveProperty('wareHouse');
		expect(responseData).toHaveProperty('userId');
		expect(responseData).toHaveProperty('id');
		expect(responseData).toHaveProperty('productsCost');
		expect(responseData).toHaveProperty('finalCCost');

		// Verify products list matches input
		expect(responseData.productsList).toEqual(orderData.productsList);
	} catch (error) {
		console.error('Order creation error:', error);
	}
});

test('POST /api/v1/orders should return 400 without product list', async () => {
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const emptyOrder = {};

		const response = await fetch(`${baseUrl}/api/v1/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(emptyOrder)
		});

		const responseStatus = response.status;
		console.log('Response status:', responseStatus);
		expect(responseStatus).toBe(400);

		const errorData = await response.json();
		console.log('Error body:', errorData);
		expect(errorData).toHaveProperty('code', 400);
		expect(errorData).toHaveProperty('message', 'Not all required parameters have been passed');
	} catch (error) {
		console.error('Error test error:', error);
	}
}); 