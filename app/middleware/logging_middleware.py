"""
Logging middleware
Logs incoming requests and outgoing responses
"""
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import StreamingResponse
import logging
import time
import json

logger = logging.getLogger(__name__)

class LoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware for request/response logging
    """
    
    async def dispatch(self, request: Request, call_next):
        """
        Log request and response details
        """
        # Start timer
        start_time = time.time()
        
        # Log request
        request_body = ""
        if request.method in ["POST", "PUT", "PATCH"]:
            try:
                body = await request.body()
                request_body = body.decode() if body else ""
            except:
                request_body = ""
        
        logger.info(
            f"Incoming Request: {request.method} {request.url.path}",
            extra={
                "method": request.method,
                "path": request.url.path,
                "query": str(request.url.query),
                "body": request_body[:200],  # Limit log size
            }
        )
        
        # Get response
        response = await call_next(request)
        
        # Calculate response time
        process_time = time.time() - start_time
        
        # Log response
        logger.info(
            f"Response: {request.method} {request.url.path} - {response.status_code}",
            extra={
                "method": request.method,
                "path": request.url.path,
                "status_code": response.status_code,
                "process_time": f"{process_time:.3f}s",
            }
        )
        
        # Add processing time header
        response.headers["X-Process-Time"] = str(process_time)
        
        return response
