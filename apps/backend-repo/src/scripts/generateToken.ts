import { generateTestToken } from '../utils/generateTestToken';

// Generate a test token with a user ID, email, and role
const userId = 'test-user-123';
const email = 'test@example.com';
const role = 'admin'; // or 'user', depending on what permissions you want to test

const token = generateTestToken(userId, email, role);

console.log('=== TEST TOKEN FOR INSOMNIA ===');
console.log(token);
console.log('\nUse this token in the Authorization header:');
console.log(`Bearer ${token}`);
console.log('\nThis token contains the following user information:');
console.log(`User ID: ${userId}`);
console.log(`Email: ${email}`);
console.log(`Role: ${role}`);
console.log('Token expires in 24 hours from generation time.');
