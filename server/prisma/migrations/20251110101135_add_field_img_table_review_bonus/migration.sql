/*
  Warnings:

  - Added the required column `img` to the `Bonus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bonus` ADD COLUMN `img` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `review` ADD COLUMN `img` INTEGER NOT NULL;
