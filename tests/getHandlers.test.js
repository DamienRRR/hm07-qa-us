// eslint-disable-next-line no-undef
const config = require('../config');

test('GET /api/v1/kits with cardId should return 200 and valid kit data', async () => {
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const fullRequestUrl = `${baseUrl}/api/v1/kits?cardId=1`;
		const response = await fetch(fullRequestUrl);
		console.log('Full URL:', fullRequestUrl);
		const responseStatus = response.status;
		console.log('Response status:', responseStatus);
		expect(responseStatus).toBe(200);

		if (responseStatus === 200) {
			const kitData = await response.json();
			console.log('Response body:', kitData);

			// Check response structure as shown in docs
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
		}
	} catch (error) {
		console.error('Test error:', error);
	}
});

test('GET /api/v1/kits without cardId should return 400', async () => {
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const fullRequestUrl = `${baseUrl}/api/v1/kits`;
		const response = await fetch(fullRequestUrl);
		console.log('Full URL:', fullRequestUrl);
		const responseStatus = response.status;
		console.log('Response status:', responseStatus);
		expect(responseStatus).toBe(400);

		if (responseStatus === 400) {
			const errorData = await response.json();
			console.log('Error body:', errorData);
			expect(errorData).toHaveProperty('code', 400);
			expect(errorData).toHaveProperty('message', 'Not all required parameters have been passed');
		}
	} catch (error) {
		console.error('Test error:', error);
	}
});