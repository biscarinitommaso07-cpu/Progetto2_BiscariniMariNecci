CREATE DATABASE IF NOT EXISTS prenotazione_aule;
USE prenotazione_aule;

CREATE TABLE Utente (
  ID       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  EMAIL    VARCHAR(120) NOT NULL UNIQUE,
  NOME     VARCHAR(60)  NOT NULL,
  COGNOME  VARCHAR(60)  NOT NULL,
  RUOLO    ENUM('studente','docente','ata','admin') NOT NULL,
  INDEX idx_email (EMAIL)
);

CREATE TABLE Aula (
  ID_AULA    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  NUMERO_AULA SMALLINT UNSIGNED NOT NULL UNIQUE,
  DESCRIZIONE VARCHAR(120),
  CAPIENZA    SMALLINT UNSIGNED,
  CONSTRAINT chk_numero CHECK (NUMERO_AULA BETWEEN 1 AND 119)
);

CREATE TABLE Classe (
  ID_CLASSE INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ANNO      TINYINT UNSIGNED NOT NULL,
  SEZIONE   CHAR(1) NOT NULL,
  INDIRIZZO VARCHAR(80) NOT NULL,
  CONSTRAINT chk_anno CHECK (ANNO BETWEEN 1 AND 5)
);

CREATE TABLE Prenotazione (
  ID_PRENOTAZIONE INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ID_AULA         INT UNSIGNED NOT NULL,
  ID_UTENTE       INT UNSIGNED NOT NULL,
  DATA            DATE NOT NULL,
  ORA_INIZIO      TIME NOT NULL,
  ORA_FINE        TIME NOT NULL,
  NOTE            VARCHAR(255),
  FOREIGN KEY (ID_AULA)   REFERENCES Aula(ID_AULA)   ON DELETE RESTRICT,
  FOREIGN KEY (ID_UTENTE) REFERENCES Utente(ID)       ON DELETE CASCADE,
  CONSTRAINT chk_orario CHECK (ORA_FINE > ORA_INIZIO),
  INDEX idx_aula_data (ID_AULA, DATA)
);

CREATE TABLE Pren_Classe (
  ID_PRENOTAZIONE INT UNSIGNED NOT NULL,
  ID_CLASSE       INT UNSIGNED NOT NULL,
  PRIMARY KEY (ID_PRENOTAZIONE, ID_CLASSE),
  FOREIGN KEY (ID_PRENOTAZIONE) REFERENCES Prenotazione(ID_PRENOTAZIONE) ON DELETE CASCADE,
  FOREIGN KEY (ID_CLASSE)       REFERENCES Classe(ID_CLASSE)             ON DELETE CASCADE
);

USE prenotazione_aule;

INSERT INTO Aula (NUMERO_AULA, DESCRIZIONE, CAPIENZA) VALUES
(1,  'Aula 1 - Piano 1 Ala Ovest', 28),
(2,  'Aula 2 - Piano 1 Ala Est', 30),
(3,  'Aula 3 - Piano Terra Corridoio Nord', 27),
(4,  'Aula 4 - Piano Terra Corridoio Sud', 26),
(5,  'Aula 5 - Piano 1 Ala Nord', 29),
(6,  'Aula 6 - Piano 1 Ala Sud', 30),
(7,  'Aula 7 - Piano 2 Ala Ovest', 28),
(8,  'Aula 8 - Piano 2 Ala Est', 31),
(9,  'Aula 9 - Piano 2 Corridoio Centrale', 27),
(10, 'Aula 10 - Piano 1 Ala Ovest', 30),
(11, 'Aula 11 - Piano Terra Ala Est', 25),
(12, 'Aula 12 - Piano Terra Ala Ovest', 26),
(13, 'Aula 13 - Piano 1 Corridoio Centrale', 28),
(14, 'Laboratorio Informatica - Piano 2', 30),
(43, 'Laboratorio Informatica - Piano 2', 25),
(53, 'Laboratorio Informatica - Piano 1', 35),
(56, 'Laboratorio Informatica e Sistemi e Reti - Piano 1', 40),
(15, 'Aula 15 - Piano 2 Ala Nord', 30),
(16, 'Aula 16 - Piano 2 Ala Sud', 29),
(17, 'Aula 17 - Piano 1 Ala Est', 27),
(18, 'Aula 18 - Piano Terra Corridoio Sud', 26),
(19, 'Aula 19 - Piano 1 Ala Ovest', 28),
(20, 'Aula 20 - Piano 2 Corridoio Centrale', 31);

INSERT INTO `classe` (`ANNO`, `SEZIONE`, `INDIRIZZO`) VALUES
-- Informatica e Telecomunicazioni
(1, 'AIT', 'Informatica e Telecomunicazioni'),
(2, 'BIT', 'Informatica e Telecomunicazioni'),
(3, 'AIA', 'Informatica e Telecomunicazioni'),
(5, 'BIA', 'Informatica e Telecomunicazioni'),

-- Elettronica ed Elettrotecnica
(1, 'AEE', 'Elettronica ed Elettrotecnica'),
(2, 'CEE', 'Elettronica ed Elettrotecnica'),
(3, 'BET', 'Elettronica ed Elettrotecnica'),
(5, 'AEC', 'Elettronica ed Elettrotecnica'),

-- Meccanica, Meccatronica ed Energia
(1, 'BMM', 'Meccanica, Meccatronica ed Energia'),
(2, 'AMM', 'Meccanica, Meccatronica ed Energia'),
(3, 'CMM', 'Meccanica, Meccatronica ed Energia'),
(4, 'DMM', 'Meccanica, Meccatronica ed Energia'),

-- Chimica e Materiali
(1, 'CCM', 'Chimica e Materiali'),
(2, 'BCM', 'Chimica e Materiali'),
(3, 'ABS', 'Chimica e Materiali'),
(5, 'CBS', 'Chimica e Materiali'),
-- Geometri
(1, 'BAE', 'Geometri'),
(2, 'AAE', 'Geometri'),
(3, 'CCA', 'Geometri'),
(4, 'ACA', 'Geometri');

INSERT INTO `utente` (`ID`, `EMAIL`, `NOME`, `COGNOME`, `RUOLO`) VALUES
(1, 'damiano.necci@ittterni.org', 'Damiano', 'Necci', 'admin'),
(2, 'federico.cini@ittterni.org', 'Federico', 'Cini', 'docente'),
(3, 'simone.austeri@ittterni.org', 'Simone', 'Austeri', 'docente'),
(4, 'andrea.mari@ittterni.org', 'Andrea', 'Mari', 'studente'),
(5, 'tommaso.biscarini@ittterni.org', 'Tommaso', 'Biscarini', 'ata');