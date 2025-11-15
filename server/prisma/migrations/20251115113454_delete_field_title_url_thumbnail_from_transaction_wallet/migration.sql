/*
  Warnings:

  - You are about to drop the column `title` on the `transactionwallet` table. All the data in the column will be lost.
  - You are about to drop the column `url_thumbnail` on the `transactionwallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transactionwallet` DROP COLUMN `title`,
    DROP COLUMN `url_thumbnail`;
