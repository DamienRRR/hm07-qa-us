// eslint-disable-next-line no-undef
const config = require('../config');

test('GET /api/v1/kits with cardId should return status code 200', async () => {
	let actualStatus;
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const fullRequestUrl = `${baseUrl}/api/v1/kits?cardId=1`;
		const response = await fetch(fullRequestUrl);
		console.log('Full URL:', fullRequestUrl);
		actualStatus = response.status;
		console.log('Response status:', actualStatus);
	} catch (error) {
		console.error('Test error:', error);
	}
	expect(actualStatus).toBe(200);
});

test('GET /api/v1/kits with cardId should return valid kit data structure', async () => {
	let kitData;
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const fullRequestUrl = `${baseUrl}/api/v1/kits?cardId=1`;
		const response = await fetch(fullRequestUrl);
		kitData = await response.json();
		console.log('Response body:', kitData);
	} catch (error) {
		console.error('Test error:', error);
	}
	expect(Array.isArray(kitData)).toBe(true);
	if (kitData.length > 0) {
		const firstKit = kitData[0];
		expect(firstKit).toHaveProperty('id');
		expect(firstKit).toHaveProperty('name');
		expect(firstKit).toHaveProperty('productsList');
		expect(firstKit).toHaveProperty('productsCount');

		if (firstKit.productsList.length > 0) {
			const firstProduct = firstKit.productsList[0];
			expect(firstProduct).toHaveProperty('id');
			expect(firstProduct).toHaveProperty('name');
			expect(firstProduct).toHaveProperty('price');
			expect(firstProduct).toHaveProperty('weight');
			expect(firstProduct).toHaveProperty('units');
			expect(firstProduct).toHaveProperty('quantity');
		}
	}
});

test('GET /api/v1/kits without cardId should return status code 400', async () => {
	let actualStatus;
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const fullRequestUrl = `${baseUrl}/api/v1/kits`;
		const response = await fetch(fullRequestUrl);
		console.log('Full URL:', fullRequestUrl);
		actualStatus = response.status;
		console.log('Response status:', actualStatus);
	} catch (error) {
		console.error('Test error:', error);
	}
	expect(actualStatus).toBe(400);
});

test('GET /api/v1/kits without cardId should return error message', async () => {
	let errorData;
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const fullRequestUrl = `${baseUrl}/api/v1/kits`;
		const response = await fetch(fullRequestUrl);
		errorData = await response.json();
		console.log('Error body:', errorData);
	} catch (error) {
		console.error('Test error:', error);
	}
	expect(errorData).toHaveProperty('code', 400);
	expect(errorData).toHaveProperty('message', 'Not all required parameters have been passed');
}); 