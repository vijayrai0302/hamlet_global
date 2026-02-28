from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

from app.config import settings
from app.routers import products, contact
from app.middleware.logging import log_requests


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print(f"Starting {settings.APP_NAME}")
    yield
    # Shutdown
    print("Shutting down")


app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="API for Hamlet Global — luxury gemstones and fine jewellery",
    lifespan=lifespan,
)

# ─── Middleware ───────────────────────────────────────────────────────────────
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(BaseHTTPMiddleware, dispatch=log_requests)

# ─── Routers ──────────────────────────────────────────────────────────────────
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(contact.router, prefix="/api/inquiries", tags=["Inquiries"])


# ─── Health ───────────────────────────────────────────────────────────────────
@app.get("/health", tags=["System"])
async def health():
    return {"status": "ok", "service": settings.APP_NAME}


@app.get("/", tags=["System"])
async def root():
    return {
        "message": "Hamlet Global API",
        "docs": "/docs",
        "health": "/health",
    }
