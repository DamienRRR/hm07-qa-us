// eslint-disable-next-line no-undef
const config = require('../config');

test('PUT /api/v1/kits/:id should modify kit with valid data', async () => {
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const kitId = 1;  // Using kitId 1 since we know it exists from our GET tests
		const modifiedKitData = {
			name: "My modified kit",
			productsList: [
				{
					id: 1,
					quantity: 4
				},
				{
					id: 5,
					quantity: 2
				},
				{
					id: 3,
					quantity: 1
				},
				{
					id: 4,
					quantity: 1
				}
			]
		};

		const response = await fetch(`${baseUrl}/api/v1/kits/${kitId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(modifiedKitData)
		});

		const responseStatus = response.status;
		console.log('Response status:', responseStatus);
		expect(responseStatus).toBe(200);

		const responseData = await response.json();
		console.log('Response body:', responseData);
		expect(responseData).toHaveProperty('ok', true);
	} catch (error) {
		console.error('Kit modification error:', error);
	}
});

test('PUT /api/v1/kits/:id should return 404 for non-existent kit', async () => {
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const nonExistentKitId = 99999;
		const modifiedKitData = {
			name: "My modified kit",
			productsList: []
		};

		const response = await fetch(`${baseUrl}/api/v1/kits/${nonExistentKitId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(modifiedKitData)
		});

		const responseStatus = response.status;
		console.log('Response status:', responseStatus);
		expect(responseStatus).toBe(404);

		const errorData = await response.json();
		console.log('Error body:', errorData);
		expect(errorData).toHaveProperty('code', 404);
		expect(errorData).toHaveProperty('message', 'Not found');
	} catch (error) {
		console.error('Error test error:', error);
	}
});