"""
AWS SES email sending service
"""
import boto3
from app.core.config import settings
import logging
from typing import Optional

logger = logging.getLogger(__name__)

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

# Initialize service
email_service = EmailService()
