CREATE DATABASE apiMaps;
USE apiMaps;

CREATE TABLE users(
	useID INT PRIMARY KEY auto_increment,
    useNombre VARCHAR(100),
    useApellido VARCHAR(100),
    useDocumento bigINT(12),
    useDireccion VARCHAR (255),
    useCoordinates POINT DEFAULT NULL
    );
    
INSERT INTO users (useNombre, useApellido, useDocumento, useDireccion, useCoordinates) 
VALUES("Pepito", "Pérez", 1019424121, "Cra 12 #13-35", POINT("-74.11723625998194", "4.638173619819734")),
("Felipe", "LongeCoak", 10147842321, "Cl. 152 #9-80", POINT(-74.03367693628556, 4.730298652427989)),
("Kevin", "Olaya", 10144788952, "Cl. 44 Sur #31-79 a 31-1", POINT(-74.12822313248088, 4.585763589860159));

DELIMITER //
CREATE PROCEDURE buscarUsuarios(
	IN coordX VARCHAR(255),
	IN coordY VARCHAR(255)
)
BEGIN
SELECT users.useNombre, users.useApellido, users.useDocumento, users.useDireccion, users.useCoordinates, ST_Distance_Sphere(useCoordinates, POINT(coordX,coordY)) AS distances 
FROM users ORDER BY distances ASC;
END//

DELIMITER //
CREATE PROCEDURE crearUsuarios(
	IN userName VARCHAR(70),
	IN userLastname VARCHAR(70),
	IN userDoc INT,
	IN userDirection VARCHAR(150),
	IN coordY VARCHAR(255),
	IN coordX VARCHAR(255)
)
BEGIN
INSERT INTO users (useNombre, useApellido, useDocumento, useDireccion, useCoordinates) 
VALUES(userName, userLastname, userDoc, userDirection, POINT(coordY, coordX));
END//

-- TRIGGER 
CREATE TABLE audit_Users(
	codigo INT PRIMARY KEY AUTO_INCREMENT, 
    nombre varchar(25),
    descripcion varchar(255),
    fecha datetime,
    usuario varchar(50),
    tipoOperacion varchar(1) 
);

CREATE TRIGGER Audit_users_Insert AFTER insert ON users
	FOR EACH ROW
		INSERT INTO audit_Users (nombre, descripcion, fecha,
			usuario, tipoOperacion) 
		VALUES (
        new.useNombre, 
        new.useDocumento, 
        now(),
        current_user(),
        'I'
        );
CALL buscarUsuarios(-74.04099598475692,4.784468966579362);
CALL crearUsuarios("Pepito", "Pérez", 1019424121, "Cra 12 #13-35", "-74.11723625998194","4.638173619819734");