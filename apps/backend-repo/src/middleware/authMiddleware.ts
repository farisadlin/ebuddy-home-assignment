import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseConfig";
import jwt from "jsonwebtoken";

/**
 * Interface for extending Express Request with user data
 */
interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    role?: string;
  };
}

/**
 * Authentication middleware to validate request tokens
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Authorization header is required",
      });
    }

    // Check if the header format is correct
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: 'Invalid authorization format. Expected "Bearer <token>"',
      });
    }

    // Extract the token
    const token = authHeader.split("Bearer ")[1];

    console.log("Token received:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication token is required",
      });
    }

    try {
      let decodedToken;

      try {
        // First try to verify with Firebase Admin
        decodedToken = await admin.auth().verifyIdToken(token);
      } catch (firebaseError) {
        // If Firebase verification fails, try JWT verification
        console.log("Firebase verification failed, trying JWT...");
        const jwtSecret = process.env.JWT_SECRET || "your-jwt-secret";

        try {
          decodedToken = jwt.verify(token, jwtSecret, {
            algorithms: ["HS256"],
          }) as { uid: string; email?: string; role?: string };
        } catch (jwtError) {
          // Both verification methods failed
          console.error("JWT verification also failed:", jwtError);
          throw new Error("Invalid token format");
        }
      }

      // Attach the user data to the request
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        role: decodedToken.role || "user",
      };

      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      error: "Authentication failed",
    });
  }
};

/**
 * Role-based authorization middleware
 * @param allowedRoles - Array of roles allowed to access the resource
 * @returns Middleware function
 */
export const authorizeRoles = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
    }

    const userRole = req.user.role || "user";

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: "You do not have permission to access this resource",
      });
    }

    next();
  };
};
