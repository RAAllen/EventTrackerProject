-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eventdb` ;

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventdb` DEFAULT CHARACTER SET utf8 ;
USE `eventdb` ;

-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `description` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `activity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `activity` ;

CREATE TABLE IF NOT EXISTS `activity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `description` VARCHAR(1000) NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NULL,
  `activity_creation` DATETIME NOT NULL,
  `activity_update` DATETIME NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_activity_category_id_to_category_id_idx` (`category_id` ASC),
  CONSTRAINT `fk_activity_category_id_to_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO eventuser@localhost;
 DROP USER eventuser@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'eventuser'@'localhost' IDENTIFIED BY 'eventuser';

GRANT SELECT, INSERT, TRIGGER ON TABLE * TO 'eventuser'@'localhost';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'eventuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventdb`;
INSERT INTO `category` (`id`, `name`, `description`) VALUES (1, 'Test Category Name', 'This is a test category.');
INSERT INTO `category` (`id`, `name`, `description`) VALUES (2, 'Another Test Category', 'This is a category made to test against.');
INSERT INTO `category` (`id`, `name`, `description`) VALUES (3, 'A Third Category', 'This is another category made to run test.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `activity`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventdb`;
INSERT INTO `activity` (`id`, `name`, `description`, `start_time`, `end_time`, `activity_creation`, `activity_update`, `category_id`) VALUES (1, 'Test Activity', 'This is filler to test against.', '2018-05-11 12:05:07', '2018-05-11 15:35:23', '2018-05-11 17:35:23', NULL, 1);
INSERT INTO `activity` (`id`, `name`, `description`, `start_time`, `end_time`, `activity_creation`, `activity_update`, `category_id`) VALUES (2, 'Another Activity', 'This is another activity to test.', '2018-02-14 10:35:30', NULL, '2018-03-01 10:05:35', '2018-05-12 18:21:08', 2);
INSERT INTO `activity` (`id`, `name`, `description`, `start_time`, `end_time`, `activity_creation`, `activity_update`, `category_id`) VALUES (3, 'A Third Activity', 'This is another activity to use to run tests.', '2018-04-14 15:25:30', NULL, '2018-04-06 18:45:17', '2018-05-13 20:05:09', 3);

COMMIT;
