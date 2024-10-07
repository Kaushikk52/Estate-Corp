-- V1__Create_User_Table.sql

-- Create User Table
CREATE TABLE IF NOT EXISTS `User` (
    `id` CHAR(36) NOT NULL, 
    `token` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(30) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone` VARCHAR(15) NOT NULL UNIQUE,
    `role` VARCHAR(10) NOT NULL DEFAULT 'ROLE_USER',
    PRIMARY KEY (`id`)
);

-- Create Project Table (Assuming Project exists and is already modeled)
CREATE TABLE IF NOT EXISTS `Project` (
    `id` BIGINT AUTO_INCREMENT,
    `owner_id` CHAR(36),
    -- Other columns for the Project entity
    PRIMARY KEY (`id`),
    CONSTRAINT FK_Project_User FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

-- Create Property Table (Assuming Property exists and is already modeled)
CREATE TABLE IF NOT EXISTS `Property` (
    `id` BIGINT AUTO_INCREMENT,
    `owner_id` CHAR(36),
    -- Other columns for the Property entity
    PRIMARY KEY (`id`),
    CONSTRAINT FK_Property_User FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

-- Optional: Indexes for faster queries on email, phone, and role
CREATE INDEX idx_user_email ON `User` (`email`);
CREATE INDEX idx_user_phone ON `User` (`phone`);
CREATE INDEX idx_user_role ON `User` (`role`);

-- If you need to revert the migration:
-- DROP TABLE IF EXISTS `User`;
-- DROP TABLE IF EXISTS `Project`;
-- DROP TABLE IF EXISTS `Property`;
