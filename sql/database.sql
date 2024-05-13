-- DB 관리
CREATE DATABASE library;

-- users 서비스
CREATE TABLE `Users` (
    `userId` BIGINT auto_increment NOT NULL , 
    `isAdmin` BOOLEAN NOT NULL, 
    `name` VARCHAR(255) NOT NULL, 
    `nickname` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `penaltyPoint` BIGINT NOT NULL,
    `createdAt` DATETIME, 
    `updatedAt` DATETIME, 
    PRIMARY KEY (`userId`));

-- reports 서비스
CREATE TABLE `Books` (
  `bookId` BIGINT  auto_increment,
  `userId` BIGINT NOT NULL,
  `bookName` VARCHAR(255) NOT NULL,
  `bookState` ENUM('대출가능','대출중','연체','분실','대출불가','폐기') NOT NULL,
  `category` ENUM('소설 ', '만화 ', '종교 ','예술','역사','과학 ','철학 ') NOT NULL, 
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (`bookId`));
  FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)

