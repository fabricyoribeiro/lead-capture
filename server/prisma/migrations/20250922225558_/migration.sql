/*
  Warnings:

  - Added the required column `phone` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Lead" ADD COLUMN     "phone" TEXT NOT NULL;
