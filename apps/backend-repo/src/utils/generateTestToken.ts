import jwt from 'jsonwebtoken';

/**
 * Generate a test JWT token for API testing
 * @param userId - User ID to include in the token
 * @param email - Optional email to include in the token
 * @param role - Optional role to include in the token (default: 'user')
 * @returns JWT token string
 */
export const generateTestToken = (
  userId: string,
  email?: string,
  role: string = 'user'
): string => {
  const jwtSecret = process.env.JWT_SECRET || 'your-jwt-secret';
  
  const payload = {
    uid: userId,
    email,
    role
  };
  
  // Sign the token with a 1-day expiration
  return jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
};

/**
 * Generate a token for a specific test user
 * This is useful for quickly getting a token for testing
 */
export const generateTokenForTestUser = (): string => {
  // Use the test user credentials
  const userId = 'test-user-123';
  const email = 'test@example.com';
  const role = 'admin';
  
  const token = generateTestToken(userId, email, role);
  
  console.log('=== TEST TOKEN FOR INSOMNIA ===');
  console.log(token);
  console.log('');
  console.log('Use this token in the Authorization header:');
  console.log(`Bearer ${token}`);
  console.log('');
  console.log('This token contains the following user information:');
  console.log(`User ID: ${userId}`);
  console.log(`Email: ${email}`);
  console.log(`Role: ${role}`);
  console.log('Token expires in 24 hours from generation time.');
  
  return token;
};

// Example usage (uncomment to use)
// const token = generateTestToken('test-user-123', 'test@example.com', 'admin');
// console.log('Test token:', token);
