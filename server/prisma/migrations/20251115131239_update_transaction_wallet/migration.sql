/*
  Warnings:

  - You are about to drop the column `email` on the `transactionwallet` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `TransactionWallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transactionwallet` DROP FOREIGN KEY `TransactionWallet_email_fkey`;

-- DropIndex
DROP INDEX `TransactionWallet_email_key` ON `transactionwallet`;

-- AlterTable
ALTER TABLE `transactionwallet` DROP COLUMN `email`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TransactionWallet` ADD CONSTRAINT `TransactionWallet_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
