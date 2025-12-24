"""
External services integration (AWS S3, SES, OneSignal)
"""
import boto3
import aiohttp
from config import settings
import logging
from datetime import timedelta
from typing import Optional
import uuid

logger = logging.getLogger(__name__)

# ==================== AWS S3 Service ====================

class S3Service:
    """AWS S3 file storage service"""
    
    def __init__(self):
        self.s3_client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION
        )
    
    async def upload_file(
        self,
        file_content: bytes,
        file_name: str,
        file_type: str,
        user_id: str
    ) -> Optional[str]:
        """Upload file to S3 and return URL"""
        try:
            # Generate unique key
            file_extension = file_name.split(".")[-1]
            s3_key = f"attachments/{user_id}/{uuid.uuid4()}.{file_extension}"
            
            # Upload to S3
            self.s3_client.put_object(
                Bucket=settings.AWS_S3_BUCKET_NAME,
                Key=s3_key,
                Body=file_content,
                ContentType=file_type,
                ServerSideEncryption="AES256"
            )
            
            # Generate presigned URL
            url = self.s3_client.generate_presigned_url(
                "get_object",
                Params={
                    "Bucket": settings.AWS_S3_BUCKET_NAME,
                    "Key": s3_key
                },
                ExpiresIn=settings.S3_URL_EXPIRATION
            )
            
            logger.info(f"✅ File uploaded to S3: {s3_key}")
            return url
            
        except Exception as e:
            logger.error(f"❌ S3 upload failed: {str(e)}")
            return None
    
    async def delete_file(self, s3_key: str) -> bool:
        """Delete file from S3"""
        try:
            self.s3_client.delete_object(
                Bucket=settings.AWS_S3_BUCKET_NAME,
                Key=s3_key
            )
            logger.info(f"✅ File deleted from S3: {s3_key}")
            return True
        except Exception as e:
            logger.error(f"❌ S3 delete failed: {str(e)}")
            return False

# ==================== AWS SES Email Service ====================

class EmailService:
    """AWS SES email sending service"""
    
    def __init__(self):
        self.ses_client = boto3.client(
            "ses",
            region_name=settings.SES_REGION,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
        )
    
    async def send_email(
        self,
        to_email: str,
        subject: str,
        html_content: str,
        text_content: Optional[str] = None
    ) -> bool:
        """Send email using AWS SES"""
        try:
            response = self.ses_client.send_email(
                Source=settings.SES_SENDER_EMAIL,
                Destination={"ToAddresses": [to_email]},
                Message={
                    "Subject": {"Data": subject, "Charset": "UTF-8"},
                    "Body": {
                        "Html": {"Data": html_content, "Charset": "UTF-8"},
                        "Text": {"Data": text_content or subject, "Charset": "UTF-8"}
                    }
                }
            )
            
            logger.info(f"✅ Email sent to {to_email}: {response['MessageId']}")
            return True
            
        except Exception as e:
            logger.error(f"❌ Email sending failed: {str(e)}")
            return False
    
    async def send_signup_welcome_email(self, email: str, full_name: str) -> bool:
        """Send welcome email after signup"""
        html_content = f"""
        <html>
        <head></head>
        <body>
            <h2>Welcome to Cleero Financial Compass, {full_name}! 🎉</h2>
            <p>Thank you for signing up. We're excited to help you manage your finances better.</p>
            <p>Here's what you can do:</p>
            <ul>
                <li>Track your debts and EMIs</li>
                <li>Monitor your income and expenses</li>
                <li>Set and achieve financial goals</li>
                <li>Get smart financial insights</li>
            </ul>
            <p>Get started by logging into your dashboard!</p>
            <p>Best regards,<br/>Cleero Team</p>
        </body>
        </html>
        """
        
        return await self.send_email(
            to_email=email,
            subject="Welcome to Cleero Financial Compass",
            html_content=html_content
        )
    
    async def send_payment_reminder_email(
        self,
        email: str,
        debt_name: str,
        amount: float,
        due_date: str
    ) -> bool:
        """Send payment reminder email"""
        html_content = f"""
        <html>
        <head></head>
        <body>
            <h2>Payment Reminder ⏰</h2>
            <p>You have an upcoming payment:</p>
            <p>
                <strong>Debt:</strong> {debt_name}<br/>
                <strong>Amount:</strong> ₹{amount:,.2f}<br/>
                <strong>Due Date:</strong> {due_date}
            </p>
            <p>Please ensure timely payment to avoid penalties.</p>
            <p>Login to your dashboard to make the payment now!</p>
        </body>
        </html>
        """
        
        return await self.send_email(
            to_email=email,
            subject=f"Payment Reminder: {debt_name}",
            html_content=html_content
        )
    
    async def send_password_reset_email(
        self,
        email: str,
        reset_link: str
    ) -> bool:
        """Send password reset email"""
        html_content = f"""
        <html>
        <head></head>
        <body>
            <h2>Password Reset Request 🔐</h2>
            <p>Click the link below to reset your password:</p>
            <p><a href="{reset_link}">Reset Password</a></p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
        </body>
        </html>
        """
        
        return await self.send_email(
            to_email=email,
            subject="Password Reset - Cleero Financial Compass",
            html_content=html_content
        )

# ==================== OneSignal Notification Service ====================

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

# Initialize services
s3_service = S3Service()
email_service = EmailService()
notification_service = NotificationService()
