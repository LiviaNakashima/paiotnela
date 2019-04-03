create database paiotnela;
use paiotnela;
CREATE TABLE Receita (
idReceita int PRIMARY KEY auto_increment,
nomeReceita varchar (50),
idUmidade int,
idTemp int
);

CREATE TABLE Umidade (
idUmidade int PRIMARY KEY auto_increment,
umidade float
);

CREATE TABLE Temperatura (
idTemp int PRIMARY KEY auto_increment,
temperatura float
);

CREATE TABLE Cadastro (
CPF char (11),
dataNasc varchar (20),
email varchar (30),
telefone char (9),
nome varchar (40),
senha varchar (40),
usuario varchar (20),
ídUsuario int PRIMARY KEY auto_increment
);

ALTER TABLE Receita ADD FOREIGN KEY(idUmidade) REFERENCES Umidade (idUmidade);
ALTER TABLE Receita ADD FOREIGN KEY(idTemp) REFERENCES Temperatura (idTemp);
