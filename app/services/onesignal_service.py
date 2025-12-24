"""
OneSignal push notification service
"""
import aiohttp
from app.core.config import settings
import logging
from typing import Optional

logger = logging.getLogger(__name__)

class NotificationService:
    """OneSignal push notification service"""
    
    def __init__(self):
        self.app_id = settings.ONESIGNAL_APP_ID
        self.api_key = settings.ONESIGNAL_API_KEY
        self.base_url = "https://onesignal.com/api/v1"
    
    async def send_notification(
        self,
        user_id: str,
        title: str,
        message: str,
        notification_type: str,
        data: Optional[dict] = None
    ) -> bool:
        """Send push notification to user via OneSignal"""
        try:
            async with aiohttp.ClientSession() as session:
                headers = {
                    "Authorization": f"Basic {self.api_key}",
                    "Content-Type": "application/json"
                }
                
                payload = {
                    "app_id": self.app_id,
                    "include_external_user_ids": [user_id],
                    "headings": {"en": title},
                    "contents": {"en": message},
                    "data": {
                        "notification_type": notification_type,
                        **(data or {})
                    },
                    "ios_badgeType": "Increase",
                    "ios_badgeCount": 1
                }
                
                async with session.post(
                    f"{self.base_url}/notifications",
                    json=payload,
                    headers=headers
                ) as response:
                    if response.status == 200:
                        result = await response.json()
                        logger.info(f"✅ Notification sent to user {user_id}")
                        return True
                    else:
                        logger.error(f"❌ OneSignal API error: {response.status}")
                        return False
                        
        except Exception as e:
            logger.error(f"❌ Notification sending failed: {str(e)}")
            return False
    
    async def send_payment_due_notification(
        self,
        user_id: str,
        debt_name: str,
        amount: float,
        due_date: str
    ) -> bool:
        """Send payment due notification"""
        return await self.send_notification(
            user_id=user_id,
            title="Payment Due",
            message=f"{debt_name} - ₹{amount:,.0f} due on {due_date}",
            notification_type="payment_due",
            data={
                "debt_name": debt_name,
                "amount": amount
            }
        )
    
    async def send_goal_milestone_notification(
        self,
        user_id: str,
        goal_name: str,
        progress: float
    ) -> bool:
        """Send goal milestone notification"""
        return await self.send_notification(
            user_id=user_id,
            title="Goal Milestone! 🎉",
            message=f"You've reached {progress}% of your '{goal_name}' goal!",
            notification_type="goal_milestone",
            data={
                "goal_name": goal_name,
                "progress": progress
            }
        )
    
    async def send_expense_alert_notification(
        self,
        user_id: str,
        category: str,
        spent: float,
        limit: float
    ) -> bool:
        """Send expense alert notification"""
        percentage = (spent / limit) * 100
        return await self.send_notification(
            user_id=user_id,
            title="Expense Alert ⚠️",
            message=f"You've spent {percentage:.0f}% of your {category} budget",
            notification_type="expense_alert",
            data={
                "category": category,
                "spent": spent,
                "limit": limit
            }
        )

# Initialize service
notification_service = NotificationService()
