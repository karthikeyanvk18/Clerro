"""
Authentication middleware
Validates JWT tokens and sets user context
"""
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from app.core.security import decode_token
import logging

logger = logging.getLogger(__name__)

class AuthMiddleware(BaseHTTPMiddleware):
    """
    Middleware for validating JWT tokens in requests
    """
    
    async def dispatch(self, request: Request, call_next):
        """
        Process request and validate token
        """
        # Skip token validation for public endpoints
        public_routes = ["/health", "/", "/api/v1/auth/signup", "/api/v1/auth/login", "/docs", "/redoc", "/openapi.json"]
        
        if request.url.path in public_routes or request.url.path.startswith("/static"):
            return await call_next(request)
        
        # Get token from Authorization header
        auth_header = request.headers.get("Authorization")
        
        if not auth_header:
            return JSONResponse(
                status_code=401,
                content={"error": "Missing Authorization header", "message": "Token required"}
            )
        
        try:
            # Extract token (format: "Bearer {token}")
            parts = auth_header.split()
            if len(parts) != 2 or parts[0].lower() != "bearer":
                return JSONResponse(
                    status_code=401,
                    content={"error": "Invalid Authorization header", "message": "Format: Bearer {token}"}
                )
            
            token = parts[1]
            
            # Validate token
            payload = decode_token(token)
            if not payload:
                return JSONResponse(
                    status_code=401,
                    content={"error": "Invalid token", "message": "Token validation failed"}
                )
            
            # Add user_id to request scope for downstream access
            request.scope["user_id"] = payload.get("sub")
            
        except Exception as e:
            logger.error(f"Token validation error: {str(e)}")
            return JSONResponse(
                status_code=401,
                content={"error": "Token validation failed", "message": str(e)}
            )
        
        return await call_next(request)
