"""
MongoDB database connection and initialization
"""
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class Database:
    """MongoDB database connection manager"""
    
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

    @classmethod
    async def connect(cls):
        """Initialize MongoDB connection"""
        try:
            cls.client = AsyncIOMotorClient(settings.MONGODB_URL)
            cls.db = cls.client[settings.MONGODB_DB_NAME]
            
            # Test connection
            await cls.db.command("ping")
            logger.info("[OK] MongoDB connected successfully")
            
            # Create indexes
            await cls.create_indexes()
            
        except Exception as e:
            logger.error(f"[ERROR] Failed to connect to MongoDB: {str(e)}")
            raise

    @classmethod
    async def disconnect(cls):
        """Close MongoDB connection"""
        if cls.client:
            cls.client.close()
            logger.info("[OK] MongoDB disconnected")

    @classmethod
    async def create_indexes(cls):
        """Create database indexes for better performance"""
        try:
            # Users collection indexes
            await cls.db.users.create_index("email", unique=True)
            await cls.db.users.create_index("username", unique=True)
            
            # Debts collection indexes
            await cls.db.debts.create_index("user_id")
            await cls.db.debts.create_index([("user_id", 1), ("created_at", -1)])
            
            # Income collection indexes
            await cls.db.income.create_index("user_id")
            await cls.db.income.create_index([("user_id", 1), ("created_at", -1)])
            
            # Expenses collection indexes
            await cls.db.expenses.create_index("user_id")
            await cls.db.expenses.create_index([("user_id", 1), ("created_at", -1)])
            
            # Goals collection indexes
            await cls.db.goals.create_index("user_id")
            
            # Payments collection indexes
            await cls.db.payments.create_index("user_id")
            await cls.db.payments.create_index([("user_id", 1), ("created_at", -1)])
            
            # Notifications collection indexes
            await cls.db.notifications.create_index("user_id")
            await cls.db.notifications.create_index([("user_id", 1), ("created_at", -1)])
            
            logger.info("[OK] Database indexes created successfully")
            
        except Exception as e:
            logger.error(f"[ERROR] Failed to create indexes: {str(e)}")

# Dependency to get database
async def get_db() -> AsyncIOMotorDatabase:
    """Dependency to inject database into endpoints"""
    return Database.db
