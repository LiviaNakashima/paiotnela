create database PaIoTnela;
create table Usuario (
idUsuario int primary key identity (1,1),
dataNasc varchar (12),
CPF char (11),
telefone char (9),
email varchar (30),
nome varchar (40)
);
create table LoginUsuario (
idLogin int primary key identity (1,1),
usuario varchar (20),
senha varchar (20)
);
create table Receita (
idReceita int primary key identity (1,1),
nomeReceita varchar (30)
);
create table Temperatura (
idTemp int primary key identity (1,1),
temperatura_minima varchar (20),
temperatura_maxima varchar (20)
);
create table Umidade (
idUmidade int primary key identity (1,1),
umidade_minima varchar (20),
umidade_maxima varchar (20)
);