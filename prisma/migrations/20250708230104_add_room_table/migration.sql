-- CreateTable
CREATE TABLE `character_bases` (
    `id` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `age` INTEGER NULL,
    `gender` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `occupation` VARCHAR(255) NULL,
    `era` VARCHAR(100) NULL,
    `imageId` VARCHAR(36) NULL,
    `str` INTEGER NOT NULL DEFAULT 0,
    `con` INTEGER NOT NULL DEFAULT 0,
    `siz` INTEGER NOT NULL DEFAULT 0,
    `dex` INTEGER NOT NULL DEFAULT 0,
    `app` INTEGER NOT NULL DEFAULT 0,
    `int` INTEGER NOT NULL DEFAULT 0,
    `pow` INTEGER NOT NULL DEFAULT 0,
    `edu` INTEGER NOT NULL DEFAULT 0,
    `luck` INTEGER NULL,
    `hp` INTEGER NOT NULL DEFAULT 0,
    `mp` INTEGER NOT NULL DEFAULT 0,
    `san` INTEGER NOT NULL DEFAULT 0,
    `mov` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_items` (
    `id` VARCHAR(191) NOT NULL,
    `itemName` VARCHAR(255) NOT NULL,
    `value` INTEGER NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `description` TEXT NULL,
    `diceId` VARCHAR(36) NULL,
    `characterId` VARCHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_status` (
    `id` VARCHAR(191) NOT NULL,
    `statusName` VARCHAR(255) NOT NULL,
    `value` INTEGER NOT NULL DEFAULT 0,
    `description` TEXT NULL,
    `characterId` VARCHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(500) NOT NULL,
    `altText` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dice` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `sides` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `character_bases` ADD CONSTRAINT `character_bases_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_bases` ADD CONSTRAINT `character_bases_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_items` ADD CONSTRAINT `character_items_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `character_bases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_items` ADD CONSTRAINT `character_items_diceId_fkey` FOREIGN KEY (`diceId`) REFERENCES `dice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_status` ADD CONSTRAINT `character_status_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `character_bases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
