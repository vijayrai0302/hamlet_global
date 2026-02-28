from datetime import datetime
from typing import Optional
from sqlalchemy import String, Float, Boolean, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum

from app.database.connection import Base


class ProductCategory(str, enum.Enum):
    GEMSTONE = "gemstone"
    JEWELLERY = "jewellery"
    PRE_OWNED = "pre-owned"


class CertificationAuthority(str, enum.Enum):
    GIA = "GIA"
    IGI = "IGI"
    SGL = "SGL"


class Product(Base):
    __tablename__ = "products"

    id: Mapped[str] = mapped_column(String(50), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[ProductCategory] = mapped_column(
        Enum(ProductCategory, values_callable=lambda x: [e.value for e in x], native_enum=False),
        nullable=False
    )
    subcategory: Mapped[str] = mapped_column(String(100), nullable=False)
    price: Mapped[Optional[float]] = mapped_column(Float, nullable=True)  # NULL = Request Price
    description: Mapped[str] = mapped_column(Text, nullable=False)

    # Certification
    cert_authority: Mapped[Optional[CertificationAuthority]] = mapped_column(
        Enum(CertificationAuthority), nullable=True
    )
    cert_number: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    # Stone Details
    weight: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    origin: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    cut: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    clarity: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    color: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    metal: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    occasion: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)

    # Flags
    is_available: Mapped[bool] = mapped_column(Boolean, default=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    is_new: Mapped[bool] = mapped_column(Boolean, default=True)

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # Relationships
    images: Mapped[list["ProductImage"]] = relationship(
        "ProductImage", back_populates="product", cascade="all, delete-orphan",
        order_by="ProductImage.position"
    )


class ProductImage(Base):
    __tablename__ = "product_images"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    product_id: Mapped[str] = mapped_column(ForeignKey("products.id"), nullable=False)
    url: Mapped[str] = mapped_column(String(500), nullable=False)
    position: Mapped[int] = mapped_column(default=0)

    product: Mapped["Product"] = relationship("Product", back_populates="images")
