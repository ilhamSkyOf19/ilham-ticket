/*
  Warnings:

  - You are about to drop the column `expired` on the `wallet` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `TransactionWallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactionwallet` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `wallet` DROP COLUMN `expired`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
