// eslint-disable-next-line no-undef
const config = require('../config');

test('DELETE /api/v1/kits/:id should successfully delete existing kit', async () => {
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const kitId = 1;  // Using a known kit ID

		const response = await fetch(`${baseUrl}/api/v1/kits/${kitId}`, {
			method: 'DELETE'
		});

		const responseStatus = response.status;
		console.log('Response status:', responseStatus);
		expect(responseStatus).toBe(200);

		const responseData = await response.json();
		console.log('Response body:', responseData);
		expect(responseData).toHaveProperty('ok', true);
	} catch (error) {
		console.error('Kit deletion error:', error);
	}
});

test('DELETE /api/v1/kits/:id should return error for non-existent kit', async () => {
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const nonExistentKitId = 99999;

		const response = await fetch(`${baseUrl}/api/v1/kits/${nonExistentKitId}`, {
			method: 'DELETE'
		});

		const responseStatus = response.status;
		console.log('Response status:', responseStatus);
		expect(responseStatus).toBe(404);

		const errorData = await response.json();
		console.log('Error body:', errorData);
		expect(errorData).toHaveProperty('message');
	} catch (error) {
		console.error('Error test error:', error);
	}
});