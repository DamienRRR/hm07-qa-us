// eslint-disable-next-line no-undef
const config = require('../config');

test('DELETE /api/v1/kits/:id should return status code 200', async () => {
	let actualDeleteStatus;
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const kitId = 1;  // Using a known kit ID
		const response = await fetch(`${baseUrl}/api/v1/kits/${kitId}`, {
			method: 'DELETE'
		});
		actualDeleteStatus = response.status;
	} catch (error) {
		console.error('Kit deletion error:', error);
	}
	// Check status code
	expect(actualDeleteStatus).toBe(200);
});

test('DELETE /api/v1/kits/:id should return correct response structure', async () => {
	let responseData;
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const kitId = 1;  // Using a known kit ID
		const response = await fetch(`${baseUrl}/api/v1/kits/${kitId}`, {
			method: 'DELETE'
		});
		responseData = await response.json();
	} catch (error) {
		console.error('Kit deletion error:', error);
	}
	// Check response structure
	expect(responseData).toHaveProperty('ok', true);
});

test('DELETE /api/v1/kits/:id should return status code 404 for non-existent kit', async () => {
	let actualErrorStatus;
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const nonExistentKitId = 99999;
		const response = await fetch(`${baseUrl}/api/v1/kits/${nonExistentKitId}`, {
			method: 'DELETE'
		});
		actualErrorStatus = response.status;
	} catch (error) {
		console.error('Error test error:', error);
	}
	// Check error status code
	expect(actualErrorStatus).toBe(404);
});

test('DELETE /api/v1/kits/:id should return correct error response structure', async () => {
	let errorData;
	try {
		const baseUrl = config.API_URL.replace(/\/$/, '');
		const nonExistentKitId = 99999;
		const response = await fetch(`${baseUrl}/api/v1/kits/${nonExistentKitId}`, {
			method: 'DELETE'
		});
		errorData = await response.json();
	} catch (error) {
		console.error('Error test error:', error);
	}
	// Check error response structure
	expect(errorData).toHaveProperty('message');
}); 