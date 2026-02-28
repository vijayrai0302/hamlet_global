from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Hamlet Global API"
    DEBUG: bool = False

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://hamlet:hamlet_secure_2024@localhost:5432/hamlet_gems"

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    # WhatsApp
    WHATSAPP_NUMBER: str = "971555626108"

    # AWS S3
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "us-east-1"
    S3_BUCKET: str = "hamlet-global-media"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
