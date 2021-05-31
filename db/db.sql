CREATE DATABASE IF NOT EXISTS guadaltech;

USE guadaltech;

CREATE TABLE person (
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    direction VARCHAR(50) DEFAULT NULL,
    PRIMARY KEY(id)
);

SELECT * FROM PERSON;


INSERT INTO person VALUES 
	(1, 'Antonio Bermudo Serrano', 'Sierra Gredos 12'), 
	(2, 'Juan Cabeza Lopez', 'Vidal 2'), 
	(3, 'Jose García Salgado', 'Puerto Real 5');
    
DESCRIBE person;

CREATE DEFINER=`root`@`localhost` PROCEDURE `personAddOrEdit`(
	IN _id INT,
    IN _name VARCHAR(45),
    IN _direction VARCHAR(50)
)
BEGIN
	IF _id = 0 THEN
		INSERT INTO person(name, direction)
		VALUES (_name, _direction);
        
		SET _id = LAST_INSERT_ID();
    ELSE
		UPDATE person
		SET 
			name = _name,
			direction = _direction
			WHERE id = _id;
    END IF;
    
    SELECT _id AS id;
END