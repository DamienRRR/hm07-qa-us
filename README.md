# Urban Grocers API Testing Project 

Urban Grocers API Testing Project
Project Description
This project contains automated tests for the Urban Grocers API. The test suite verifies the functionality of various API endpoints including retrieving kits, creating orders, modifying kits, and deleting kits.
Documentation Source
The tests are based on the Urban Grocers API documentation available at /docs/ endpoint of the API server.
Technologies and Techniques Used

Node.js: Runtime environment
Jest: Testing framework
Fetch API: Making HTTP requests
ES6+ JavaScript: Modern JavaScript features
Testing techniques:

Response status validation
Response body structure verification
Error case handling
API endpoint testing



API Endpoints Tested

GET /api/v1/kits: Retrieving kits
POST /api/v1/orders: Creating orders
PUT /api/v1/kits/:id: Modifying kits
DELETE /api/v1/kits/:id: Deleting kits

Project Structure
project/
├── config.js         # API configuration
├── tests/
│   ├── getHandlers.test.js
│   ├── postHandlers.test.js
│   ├── putHandlers.test.js
│   └── deleteHandlers.test.js
└── README.md
How to Run Tests

Ensure Node.js is installed
Clone the repository
Open the cloned repository in Visual Studio Code:

File → Open Folder
Select the hm07-qa-us folder


Install dependencies using Git Bash:
Cnpm install

Update config.js with your API URL
Run tests in Visual Studio Code Terminal:
npx jest
Or run specific test files:
npx jest getHandlers.test.js
npx jest postHandlers.test.js
npx jest putHandlers.test.js
npx jest deleteHandlers.test.js


Test Cases Overview

Testing successful responses
Verifying error cases
Validating response structures
Checking status codes

hm07-qa-us
