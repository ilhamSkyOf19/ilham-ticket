/*
  Warnings:

  - You are about to drop the column `userId` on the `transactionwallet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `TransactionWallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `TransactionWallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transactionwallet` DROP FOREIGN KEY `TransactionWallet_userId_fkey`;

-- DropIndex
DROP INDEX `TransactionWallet_userId_fkey` ON `transactionwallet`;

-- AlterTable
ALTER TABLE `transactionwallet` DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `TransactionWallet_email_key` ON `TransactionWallet`(`email`);

-- AddForeignKey
ALTER TABLE `TransactionWallet` ADD CONSTRAINT `TransactionWallet_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
