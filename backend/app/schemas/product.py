from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from app.models.product import ProductCategory, CertificationAuthority


class ProductImageOut(BaseModel):
    id: int
    url: str
    position: int

    model_config = {"from_attributes": True}


class ProductOut(BaseModel):
    id: str
    name: str
    category: ProductCategory
    subcategory: str
    price: Optional[float]
    description: str
    cert_authority: Optional[CertificationAuthority]
    cert_number: Optional[str]
    weight: Optional[str]
    origin: Optional[str]
    cut: Optional[str]
    clarity: Optional[str]
    color: Optional[str]
    metal: Optional[str]
    occasion: Optional[str]
    is_available: bool
    is_featured: bool
    is_new: bool
    created_at: datetime
    images: list[ProductImageOut] = []

    model_config = {"from_attributes": True}


class ProductCreate(BaseModel):
    id: str
    name: str
    category: ProductCategory
    subcategory: str
    price: Optional[float] = None
    description: str
    cert_authority: Optional[CertificationAuthority] = None
    cert_number: Optional[str] = None
    weight: Optional[str] = None
    origin: Optional[str] = None
    cut: Optional[str] = None
    clarity: Optional[str] = None
    color: Optional[str] = None
    metal: Optional[str] = None
    occasion: Optional[str] = None
    is_available: bool = True
    is_featured: bool = False
    is_new: bool = True
    image_urls: list[str] = []


class ProductListOut(BaseModel):
    items: list[ProductOut]
    total: int
    page: int
    per_page: int
