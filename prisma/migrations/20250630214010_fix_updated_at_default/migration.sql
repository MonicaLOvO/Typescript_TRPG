/*
  Warnings:

  - You are about to drop the `character_bases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `character_bases` DROP FOREIGN KEY `character_bases_accountId_fkey`;

-- DropTable
DROP TABLE `character_bases`;
