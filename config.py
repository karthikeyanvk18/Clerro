"""
Environment configuration management
"""
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """Application settings and environment variables"""
    
    # App Configuration
    APP_NAME: str = "Cleero Financial Compass"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Server
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    
    # Database - MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "cleero_financial"
    
    # JWT Configuration
    SECRET_KEY: str = "your-super-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # AWS S3 Configuration
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_S3_BUCKET_NAME: str = "cleero-financial"
    AWS_S3_REGION: str = "us-east-1"
    S3_URL_EXPIRATION: int = 3600  # 1 hour
    
    # Email Configuration - AWS SES
    SES_SENDER_EMAIL: str = "noreply@cleero.com"
    SES_REGION: str = "us-east-1"
    
    # OneSignal Configuration - Notifications
    ONESIGNAL_APP_ID: str = ""
    ONESIGNAL_API_KEY: str = ""
    ONESIGNAL_USER_AUTH_KEY: str = ""
    
    # Email templates
    EMAIL_TEMPLATE_DIR: str = "templates/emails"
    
    # CORS
    CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:5173"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
