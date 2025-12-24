"""
AWS S3 file storage service
"""
import boto3
from app.core.config import settings
import logging
from typing import Optional
import uuid

logger = logging.getLogger(__name__)

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

# Initialize service
s3_service = S3Service()
