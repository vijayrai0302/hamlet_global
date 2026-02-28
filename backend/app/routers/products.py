from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from sqlalchemy.orm import selectinload

from app.database.connection import get_db
from app.models.product import Product, ProductImage, ProductCategory
from app.schemas.product import ProductOut, ProductCreate, ProductListOut

router = APIRouter()


@router.get("", response_model=ProductListOut)
async def list_products(
    category: Optional[ProductCategory] = None,
    subcategory: Optional[str] = None,
    is_featured: Optional[bool] = None,
    is_available: Optional[bool] = True,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    filters = []
    if category:
        filters.append(Product.category == category)
    if subcategory:
        filters.append(Product.subcategory == subcategory)
    if is_featured is not None:
        filters.append(Product.is_featured == is_featured)
    if is_available is not None:
        filters.append(Product.is_available == is_available)

    count_q = select(func.count()).select_from(Product)
    if filters:
        count_q = count_q.where(and_(*filters))
    total = (await db.execute(count_q)).scalar_one()

    q = (
        select(Product)
        .options(selectinload(Product.images))
        .offset((page - 1) * per_page)
        .limit(per_page)
        .order_by(Product.is_featured.desc(), Product.created_at.desc())
    )
    if filters:
        q = q.where(and_(*filters))

    result = await db.execute(q)
    products = result.scalars().all()

    return {"items": products, "total": total, "page": page, "per_page": per_page}


@router.get("/{product_id}", response_model=ProductOut)
async def get_product(product_id: str, db: AsyncSession = Depends(get_db)):
    q = (
        select(Product)
        .options(selectinload(Product.images))
        .where(Product.id == product_id)
    )
    result = await db.execute(q)
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("", response_model=ProductOut, status_code=201)
async def create_product(data: ProductCreate, db: AsyncSession = Depends(get_db)):
    product = Product(
        id=data.id,
        name=data.name,
        category=data.category,
        subcategory=data.subcategory,
        price=data.price,
        description=data.description,
        cert_authority=data.cert_authority,
        cert_number=data.cert_number,
        weight=data.weight,
        origin=data.origin,
        cut=data.cut,
        clarity=data.clarity,
        color=data.color,
        metal=data.metal,
        occasion=data.occasion,
        is_available=data.is_available,
        is_featured=data.is_featured,
        is_new=data.is_new,
    )
    db.add(product)
    await db.flush()

    for i, url in enumerate(data.image_urls):
        img = ProductImage(product_id=product.id, url=url, position=i)
        db.add(img)

    await db.commit()
    await db.refresh(product)
    return product


@router.delete("/{product_id}", status_code=204)
async def delete_product(product_id: str, db: AsyncSession = Depends(get_db)):
    q = select(Product).where(Product.id == product_id)
    result = await db.execute(q)
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    await db.delete(product)
    await db.commit()
