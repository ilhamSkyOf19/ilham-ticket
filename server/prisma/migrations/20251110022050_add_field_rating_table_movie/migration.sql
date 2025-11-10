/*
  Warnings:

  - Added the required column `rating` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie` ADD COLUMN `rating` INTEGER NOT NULL;
