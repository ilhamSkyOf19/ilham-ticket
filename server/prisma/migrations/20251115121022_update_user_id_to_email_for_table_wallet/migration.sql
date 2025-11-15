/*
  Warnings:

  - You are about to drop the column `userId` on the `wallet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `wallet` DROP FOREIGN KEY `Wallet_userId_fkey`;

-- DropIndex
DROP INDEX `Wallet_userId_key` ON `wallet`;

-- AlterTable
ALTER TABLE `wallet` DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Wallet_email_key` ON `Wallet`(`email`);

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
