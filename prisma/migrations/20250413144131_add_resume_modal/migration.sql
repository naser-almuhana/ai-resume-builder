-- CreateTable
CREATE TABLE "resumes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "photo_url" TEXT,
    "color_hex" TEXT NOT NULL DEFAULT '#000000',
    "border_style" TEXT NOT NULL DEFAULT 'squircle',
    "summary" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "job_title" TEXT,
    "city" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);
