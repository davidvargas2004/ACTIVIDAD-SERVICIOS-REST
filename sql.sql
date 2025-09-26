CREATE DATABASE dbrest;

USE dbrest;

CREATE TABLE cliente (
    Codigo INT PRIMARY KEY,
    Nombre VARCHAR(25),
    Apellido VARCHAR(25),
    Direccion VARCHAR(25),
    Telefono VARCHAR(16),
    Email VARCHAR(25)
);

