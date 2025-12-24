"""
Validation utilities
"""
import re
from typing import Tuple

def validate_email(email: str) -> Tuple[bool, str]:
    """
    Validate email format
    Returns: (is_valid, message)
    """
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    if not email:
        return False, "Email is required"
    
    if not re.match(email_pattern, email):
        return False, "Invalid email format"
    
    if len(email) > 254:
        return False, "Email is too long"
    
    return True, "Valid email"

def validate_password(password: str) -> Tuple[bool, str]:
    """
    Validate password strength
    Requirements: At least 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special char
    Returns: (is_valid, message)
    """
    if not password:
        return False, "Password is required"
    
    if len(password) < 8:
        return False, "Password must be at least 8 characters"
    
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    
    if not re.search(r'\d', password):
        return False, "Password must contain at least one digit"
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False, "Password must contain at least one special character"
    
    return True, "Valid password"

def validate_phone(phone: str) -> Tuple[bool, str]:
    """
    Validate phone number format (international)
    Returns: (is_valid, message)
    """
    # Remove spaces, dashes, and parentheses
    cleaned_phone = re.sub(r'[\s\-\(\)]', '', phone)
    
    if not cleaned_phone:
        return False, "Phone number is required"
    
    if not re.match(r'^\+?1?\d{9,15}$', cleaned_phone):
        return False, "Invalid phone number format"
    
    return True, "Valid phone number"
