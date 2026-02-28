from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr


class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    country: Optional[str] = None
    interest: Optional[str] = None
    budget: Optional[str] = None
    message: str
    product_id: Optional[str] = None


class InquiryOut(BaseModel):
    id: int
    name: str
    email: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
