"""
Formatting utilities
"""
from datetime import datetime
from typing import Union

def format_currency(amount: float, currency: str = "USD") -> str:
    """
    Format amount as currency string
    """
    currency_symbols = {
        "USD": "$",
        "EUR": "€",
        "INR": "₹",
        "GBP": "£",
        "JPY": "¥",
        "AUD": "A$",
        "CAD": "C$",
    }
    
    symbol = currency_symbols.get(currency, currency)
    return f"{symbol}{amount:,.2f}"

def format_date(date: Union[datetime, str], format_str: str = "%m/%d/%Y") -> str:
    """
    Format date string
    """
    if isinstance(date, str):
        date = datetime.fromisoformat(date)
    
    return date.strftime(format_str)

def format_percentage(value: float, decimals: int = 2) -> str:
    """
    Format value as percentage
    """
    return f"{value:.{decimals}f}%"

def format_phone(phone: str) -> str:
    """
    Format phone number with dashes
    """
    cleaned = ''.join(filter(str.isdigit, phone))
    
    if len(cleaned) == 10:
        return f"({cleaned[:3]}) {cleaned[3:6]}-{cleaned[6:]}"
    elif len(cleaned) == 11:
        return f"+{cleaned[0]} ({cleaned[1:4]}) {cleaned[4:7]}-{cleaned[7:]}"
    
    return phone

def format_bytes(bytes_value: int) -> str:
    """
    Format bytes to human-readable format
    """
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes_value < 1024.0:
            return f"{bytes_value:.2f} {unit}"
        bytes_value /= 1024.0
    
    return f"{bytes_value:.2f} PB"
