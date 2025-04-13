/*
  Warnings:

  - You are about to drop the column `borderStyle` on the `resumes` table. All the data in the column will be lost.
  - You are about to drop the column `colorHex` on the `resumes` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `resumes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `resumes` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `resumes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resumes" DROP COLUMN "borderStyle",
DROP COLUMN "colorHex",
DROP COLUMN "photoUrl",
DROP COLUMN "userId",
ADD COLUMN     "border_style" TEXT NOT NULL DEFAULT 'squircle',
ADD COLUMN     "color_hex" TEXT NOT NULL DEFAULT '#000000',
ADD COLUMN     "photo_url" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL;
