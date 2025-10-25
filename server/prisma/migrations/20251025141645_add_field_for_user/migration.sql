/*
  Warnings:

  - Added the required column `url_avatar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `url_avatar` VARCHAR(191) NOT NULL;
