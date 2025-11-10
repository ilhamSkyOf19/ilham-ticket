/*
  Warnings:

  - You are about to drop the column `img` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `url_img` on the `review` table. All the data in the column will be lost.
  - Added the required column `img` to the `Theater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_img` to the `Theater` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `img`,
    DROP COLUMN `url_img`;

-- AlterTable
ALTER TABLE `theater` ADD COLUMN `img` VARCHAR(191) NOT NULL,
    ADD COLUMN `url_img` VARCHAR(191) NOT NULL;
