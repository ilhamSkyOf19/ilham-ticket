-- AlterTable
ALTER TABLE `transactionwallet` ADD COLUMN `status` ENUM('success', 'pending', 'failed') NOT NULL DEFAULT 'pending';
