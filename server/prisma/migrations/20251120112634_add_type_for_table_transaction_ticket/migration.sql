/*
  Warnings:

  - Added the required column `type` to the `TransactionTicket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactionticket` ADD COLUMN `type` ENUM('plus', 'min') NOT NULL;
