-- CreateTable
CREATE TABLE `room_characters` (
    `id` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(36) NOT NULL,
    `actorId` VARCHAR(36) NOT NULL,
    `sourceId` VARCHAR(36) NULL,
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
CREATE TABLE `room_actors` (
    `id` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(36) NOT NULL,
    `accountId` VARCHAR(36) NOT NULL,
    `role` ENUM('PLAYER', 'GAME_MASTER', 'OBSERVER') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notes` (
    `id` VARCHAR(191) NOT NULL,
    `actorId` VARCHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_character_items` (
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
CREATE TABLE `room_character_status` (
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
CREATE TABLE `class_bases` (
    `id` VARCHAR(191) NOT NULL,
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
CREATE TABLE `class_items` (
    `id` VARCHAR(191) NOT NULL,
    `itemName` VARCHAR(255) NOT NULL,
    `value` INTEGER NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `description` TEXT NULL,
    `diceId` VARCHAR(36) NULL,
    `classId` VARCHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class_status` (
    `id` VARCHAR(191) NOT NULL,
    `statusName` VARCHAR(255) NOT NULL,
    `value` INTEGER NOT NULL DEFAULT 0,
    `description` TEXT NULL,
    `classId` VARCHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `room_characters` ADD CONSTRAINT `room_characters_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_characters` ADD CONSTRAINT `room_characters_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `room_actors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_characters` ADD CONSTRAINT `room_characters_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_actors` ADD CONSTRAINT `room_actors_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_actors` ADD CONSTRAINT `room_actors_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `room_actors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_character_items` ADD CONSTRAINT `room_character_items_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `room_characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_character_items` ADD CONSTRAINT `room_character_items_diceId_fkey` FOREIGN KEY (`diceId`) REFERENCES `dice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_character_status` ADD CONSTRAINT `room_character_status_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `room_characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_bases` ADD CONSTRAINT `class_bases_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_items` ADD CONSTRAINT `class_items_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `class_bases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_items` ADD CONSTRAINT `class_items_diceId_fkey` FOREIGN KEY (`diceId`) REFERENCES `dice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_status` ADD CONSTRAINT `class_status_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `class_bases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
