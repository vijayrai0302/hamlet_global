from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database.connection import get_db
from app.models.inquiry import Inquiry
from app.schemas.inquiry import InquiryCreate, InquiryOut

router = APIRouter()


async def _notify_whatsapp(inquiry: Inquiry):
    """In production, send a notification to the WhatsApp business API."""
    # Integration point: connect to WhatsApp Business API or Twilio
    pass


@router.post("", response_model=InquiryOut, status_code=201)
async def submit_inquiry(
    data: InquiryCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    inquiry = Inquiry(
        name=data.name,
        email=data.email,
        phone=data.phone,
        country=data.country,
        interest=data.interest,
        budget=data.budget,
        message=data.message,
        product_id=data.product_id,
    )
    db.add(inquiry)
    await db.commit()
    await db.refresh(inquiry)

    background_tasks.add_task(_notify_whatsapp, inquiry)

    return inquiry


@router.get("", response_model=list[InquiryOut])
async def list_inquiries(
    status: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    q = select(Inquiry).order_by(Inquiry.created_at.desc())
    if status:
        q = q.where(Inquiry.status == status)
    result = await db.execute(q)
    return result.scalars().all()
