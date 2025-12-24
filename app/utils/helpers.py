"""
Helper utilities
"""
import uuid
import random
import string
from datetime import datetime, timedelta, date
from typing import Tuple

def generate_ref_number(prefix: str = "REF") -> str:
    """
    Generate unique reference number
    Format: REF-YYYYMMDD-XXXXX
    """
    timestamp = datetime.utcnow().strftime("%Y%m%d")
    random_suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
    return f"{prefix}-{timestamp}-{random_suffix}"

def generate_uuid() -> str:
    """
    Generate UUID v4
    """
    return str(uuid.uuid4())

def calculate_age(birth_date: datetime) -> int:
    """
    Calculate age from birth date
    """
    today = date.today()
    return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

def get_current_month_dates() -> Tuple[datetime, datetime]:
    """
    Get start and end dates of current month
    Returns: (start_date, end_date)
    """
    today = date.today()
    start_date = datetime(today.year, today.month, 1)
    
    # Get last day of month
    if today.month == 12:
        end_date = datetime(today.year + 1, 1, 1) - timedelta(days=1)
    else:
        end_date = datetime(today.year, today.month + 1, 1) - timedelta(days=1)
    
    return start_date, end_date

def get_date_range(days_back: int = 30) -> Tuple[datetime, datetime]:
    """
    Get date range for last N days
    Returns: (start_date, end_date)
    """
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days_back)
    return start_date, end_date

def chunk_list(items: list, chunk_size: int) -> list:
    """
    Split list into chunks
    """
    return [items[i:i + chunk_size] for i in range(0, len(items), chunk_size)]

def calculate_percentage(part: float, total: float) -> float:
    """
    Calculate percentage
    """
    if total == 0:
        return 0.0
    return (part / total) * 100

def round_to_nearest(value: float, nearest: float = 0.01) -> float:
    """
    Round to nearest value
    """
    return round(value / nearest) * nearest
