"""
FastAPI Application Entry Point
"""
import sys
import io

# Set UTF-8 encoding for Windows console output
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from datetime import datetime
import logging

from app.core.config import settings
from app.database import Database
from app.api.v1.auth.auth import router as auth_router
from app.api.v1.finance.debts import router as debts_router
from app.api.v1.finance.income import router as income_router
from app.api.v1.finance.goals import router as goals_router
from app.api.v1.finance.budgets import router as budgets_router
from app.api.v1.transactions.payments import router as payments_router
from app.api.v1.transactions.expenses import router as expenses_router
from app.api.v1.users.users import router as users_router
from app.api.v1.notifications.notifications import router as notifications_router
from app.api.v1.settings.settings import router as settings_router
from app.api.v1.dashboard.dashboard import router as dashboard_router
from app.core.logging import logger

# ==================== Lifespan Context ====================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan - startup and shutdown"""
    # Startup
    try:
        logger.info("[STARTUP] Starting Cleero Financial Compass API...")
        await Database.connect()
        logger.info(f"[OK] API started on {settings.API_HOST}:{settings.API_PORT}")
        logger.info(f"[DOCS] Documentation: http://{settings.API_HOST}:{settings.API_PORT}/docs")
        logger.info(f"[DOCS] ReDoc: http://{settings.API_HOST}:{settings.API_PORT}/redoc")
    except Exception as e:
        logger.error(f"[ERROR] Failed to start API: {str(e)}")
        raise
    
    yield
    
    # Shutdown
    try:
        logger.info("[SHUTDOWN] Shutting down API...")
        await Database.disconnect()
        logger.info("[OK] API shutdown complete")
    except Exception as e:
        logger.error(f"[ERROR] Error during shutdown: {str(e)}")

# ==================== FastAPI App ====================

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Financial management and tracking API",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# ==================== CORS Middleware ====================

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== Exception Handlers ====================

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors"""
    return JSONResponse(
        status_code=422,
        content={
            "error": "Validation Error",
            "message": "Invalid request data",
            "details": exc.errors(),
            "timestamp": datetime.utcnow().isoformat()
        },
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": "HTTP Error",
            "message": exc.detail,
            "status_code": exc.status_code,
            "timestamp": datetime.utcnow().isoformat()
        },
    )

# ==================== Health Check Endpoints ====================

@app.get("/", tags=["Health"])
async def root():
    """Root endpoint - API health check"""
    return {
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat()
    }

# ==================== Route Includes ====================

# Auth routes
app.include_router(auth_router, prefix="/api/v1", tags=["Auth"])

# Finance routes
app.include_router(debts_router, prefix="/api/v1/finance", tags=["Finance - Debts"])
app.include_router(income_router, prefix="/api/v1/finance", tags=["Finance - Income"])
app.include_router(goals_router, prefix="/api/v1/finance", tags=["Finance - Goals"])
app.include_router(budgets_router, prefix="/api/v1/finance", tags=["Finance - Budgets"])

# Transaction routes
app.include_router(payments_router, prefix="/api/v1/transactions", tags=["Transactions - Payments"])
app.include_router(expenses_router, prefix="/api/v1/transactions", tags=["Transactions - Expenses"])

# User and Settings routes
app.include_router(users_router, prefix="/api/v1", tags=["Users"])
app.include_router(settings_router, prefix="/api/v1", tags=["Settings"])
app.include_router(notifications_router, prefix="/api/v1", tags=["Notifications"])

# Dashboard aggregation
app.include_router(dashboard_router, prefix="/api/v1", tags=["Dashboard"])

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        app,
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG,
        log_level="info"
    )
