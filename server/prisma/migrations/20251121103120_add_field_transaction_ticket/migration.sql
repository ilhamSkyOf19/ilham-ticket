/*
  Warnings:

  - Added the required column `bookingFee` to the `TransactionTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `TransactionTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ppn` to the `TransactionTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal` to the `TransactionTicket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactionticket` ADD COLUMN `bookingFee` INTEGER NOT NULL,
    ADD COLUMN `discount` INTEGER NOT NULL,
    ADD COLUMN `ppn` INTEGER NOT NULL,
    ADD COLUMN `subTotal` INTEGER NOT NULL;
