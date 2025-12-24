"""
Error handler middleware
Catches and formats application errors
"""
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import logging
import traceback
from datetime import datetime

logger = logging.getLogger(__name__)

class ErrorHandlerMiddleware(BaseHTTPMiddleware):
    """
    Middleware for centralizing error handling
    """
    
    async def dispatch(self, request: Request, call_next):
        """
        Catch and format errors
        """
        try:
            return await call_next(request)
        
        except Exception as e:
            logger.error(f"Unhandled exception: {str(e)}", exc_info=True)
            
            # Format error response
            error_response = {
                "error": e.__class__.__name__,
                "message": str(e),
                "status_code": 500,
                "timestamp": datetime.utcnow().isoformat(),
                "path": str(request.url.path),
                "method": request.method,
            }
            
            # Log full traceback in development
            if logger.level == logging.DEBUG:
                error_response["traceback"] = traceback.format_exc()
            
            return JSONResponse(
                status_code=500,
                content=error_response
            )
