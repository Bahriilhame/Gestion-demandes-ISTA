CREATE DATABASE Gestion_demandes_ista;
-- Table Stagiaire
CREATE TABLE Stagiaire (
    CIN VARCHAR(20),
    nom VARCHAR(50),
    prenom VARCHAR(50),
    filiere VARCHAR(50),
    groupe INT,
    anneeScolaire INT,
    PRIMARY KEY (CIN)
);

-- Table Demande
CREATE TABLE Demande (
    idDemande INT AUTO_INCREMENT,
    CIN_stagiaire VARCHAR(20),
    dateSoumission DATE,
    typeDemande VARCHAR(50),
    PRIMARY KEY (idDemande),
    FOREIGN KEY (CIN_stagiaire) REFERENCES Stagiaire(CIN)
);

-- Table Administrateur
CREATE TABLE Administrateur (
    idGestionnaire INT AUTO_INCREMENT,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    email VARCHAR(100),
    mdp VARCHAR(100),
    role VARCHAR(50),
    PRIMARY KEY (idGestionnaire)
);