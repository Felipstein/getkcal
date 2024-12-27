/*
  Warnings:

  - Added the required column `total_daily_protein` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_daily_water` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "total_daily_protein" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "total_daily_water" DECIMAL(65,30) NOT NULL;
