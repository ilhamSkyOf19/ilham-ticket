/*
  Warnings:

  - You are about to drop the column `url` on the `transactionticket` table. All the data in the column will be lost.
  - Added the required column `token` to the `TransactionTicket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactionticket` DROP COLUMN `url`,
    ADD COLUMN `token` VARCHAR(191) NOT NULL;
