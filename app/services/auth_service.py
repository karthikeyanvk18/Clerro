"""
Authentication service
"""
from app.core.security import SecurityService
import logging

logger = logging.getLogger(__name__)

class AuthService:
    """Authentication business logic"""
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash password"""
        return SecurityService.hash_password(password)
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """Verify password"""
        return SecurityService.verify_password(plain_password, hashed_password)
    
    @staticmethod
    def create_tokens(user_id: str, email: str):
        """Create JWT tokens"""
        return SecurityService.create_tokens(user_id, email)

# Initialize service
auth_service = AuthService()
