#!/usr/bin/env python
"""
Quick validation script for Cleero Financial Compass Backend
Run this to verify all imports and structure are correct before starting the server
"""

import sys
from pathlib import Path

def check_directory_structure():
    """Verify all required directories exist"""
    print("📁 Checking directory structure...")
    required_dirs = [
        "app",
        "app/api",
        "app/api/v1",
        "app/api/v1/auth",
        "app/api/v1/finance",
        "app/api/v1/transactions",
        "app/api/v1/users",
        "app/api/v1/notifications",
        "app/api/v1/settings",
        "app/api/v1/dashboard",
        "app/core",
        "app/database",
        "app/services",
        "app/schemas",
    ]
    
    base_path = Path(__file__).parent
    missing = []
    
    for dir_path in required_dirs:
        full_path = base_path / dir_path
        if not full_path.exists():
            missing.append(dir_path)
            print(f"  ❌ Missing: {dir_path}")
        else:
            print(f"  ✅ Found: {dir_path}")
    
    return len(missing) == 0

def check_required_files():
    """Verify all required Python files exist"""
    print("\n📄 Checking required files...")
    required_files = [
        "app/__init__.py",
        "app/main.py",
        "app/api/__init__.py",
        "app/api/v1/__init__.py",
        "app/api/v1/auth/__init__.py",
        "app/api/v1/auth/routes.py",
        "app/api/v1/finance/__init__.py",
        "app/api/v1/finance/debts.py",
        "app/api/v1/finance/income.py",
        "app/api/v1/finance/goals.py",
        "app/api/v1/finance/budgets.py",
        "app/api/v1/transactions/__init__.py",
        "app/api/v1/transactions/payments.py",
        "app/api/v1/transactions/expenses.py",
        "app/api/v1/users/__init__.py",
        "app/api/v1/users/routes.py",
        "app/api/v1/notifications/__init__.py",
        "app/api/v1/notifications/routes.py",
        "app/api/v1/settings/__init__.py",
        "app/api/v1/settings/routes.py",
        "app/api/v1/dashboard/__init__.py",
        "app/api/v1/dashboard/routes.py",
        "app/core/__init__.py",
        "app/core/config.py",
        "app/core/security.py",
        "app/core/logging.py",
        "app/database/__init__.py",
        "app/database/db.py",
        "app/services/__init__.py",
        "app/services/s3_service.py",
        "app/services/ses_email_service.py",
        "app/services/onesignal_service.py",
        "app/services/auth_service.py",
        "app/schemas/__init__.py",
        "main.py",
    ]
    
    base_path = Path(__file__).parent
    missing = []
    
    for file_path in required_files:
        full_path = base_path / file_path
        if not full_path.exists():
            missing.append(file_path)
            print(f"  ❌ Missing: {file_path}")
        else:
            print(f"  ✅ Found: {file_path}")
    
    return len(missing) == 0

def check_imports():
    """Verify critical imports work"""
    print("\n🔍 Checking critical imports...")
    
    try:
        print("  Checking FastAPI...")
        import fastapi
        print("  ✅ FastAPI import successful")
    except ImportError as e:
        print(f"  ❌ FastAPI import failed: {e}")
        return False
    
    try:
        print("  Checking Motor (MongoDB async driver)...")
        from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
        print("  ✅ Motor imports successful")
    except ImportError as e:
        print(f"  ❌ Motor import failed: {e}")
        return False
    
    try:
        print("  Checking Pydantic...")
        from pydantic import BaseModel
        print("  ✅ Pydantic import successful")
    except ImportError as e:
        print(f"  ❌ Pydantic import failed: {e}")
        return False
    
    try:
        print("  Checking jose (JWT)...")
        from jose import JWTError, jwt
        print("  ✅ Jose import successful")
    except ImportError as e:
        print(f"  ❌ Jose import failed: {e}")
        return False
    
    try:
        print("  Checking bcrypt...")
        import bcrypt
        print("  ✅ Bcrypt import successful")
    except ImportError as e:
        print(f"  ❌ Bcrypt import failed: {e}")
        return False
    
    return True

def check_app_imports():
    """Verify app module imports"""
    print("\n🔗 Checking app module imports...")
    
    try:
        sys.path.insert(0, str(Path(__file__).parent))
        
        print("  Checking app.main...")
        from app.main import app as fastapi_app
        print("  ✅ app.main import successful")
        
        print("  Checking app.database...")
        from app.database import get_db
        print("  ✅ app.database import successful")
        
        print("  Checking app.schemas...")
        from app.schemas import UserCreate, UserLogin
        print("  ✅ app.schemas import successful")
        
        print("  Checking app.core.security...")
        from app.core.security import get_current_user_id
        print("  ✅ app.core.security import successful")
        
        return True
    except ImportError as e:
        print(f"  ❌ App import failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Run all checks"""
    print("=" * 60)
    print("🔧 Cleero Financial Compass Backend Validation")
    print("=" * 60)
    
    results = []
    
    results.append(("Directory Structure", check_directory_structure()))
    results.append(("Required Files", check_required_files()))
    results.append(("Package Imports", check_imports()))
    results.append(("App Imports", check_app_imports()))
    
    print("\n" + "=" * 60)
    print("📊 Validation Summary")
    print("=" * 60)
    
    for check_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{check_name}: {status}")
    
    all_passed = all(result for _, result in results)
    
    if all_passed:
        print("\n✨ All checks passed! Backend is ready for startup.")
        print("\n🚀 To start the server, run:")
        print("   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000")
        print("\n📖 Access Swagger UI at: http://localhost:8000/docs")
        return 0
    else:
        print("\n⚠️  Some checks failed. Please fix the issues above.")
        return 1

if __name__ == "__main__":
    exit(main())
