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
(1,  'Aula 1 - Piano 1 Ala Ovest', 30),
(2,  'Aula 2 - Piano 1 Ala Ovest', 30),
(3,  'Aula 3 - Piano 1 Ala Ovest', 30),
(4,  'Aula 4 - Piano 1 Ala Ovest', 30),
(5,  'Aula 5 - Piano 1 Ala Ovest', 30),
(6,  'Aula 6 - Piano 1 Ala Ovest', 30),
(7,  'Aula 7 - Piano 1 Ala Ovest', 30),
(8,  'Aula 8 - Piano 1 Ala Ovest', 30),
(9,  'Aula 9 - Piano 1 Ala Ovest', 30),
(10, 'Aula 10 - Piano 1 Ala Ovest', 30);

INSERT INTO `classe` (`ID_CLASSE`, `ANNO`, `SEZIONE`, `INDIRIZZO`) VALUES
(21, 1, 'A', 'Informatica e Telecomunicazioni'),
(22, 3, 'A', 'Informatica e Telecomunicazioni'),
(23, 2, 'B', 'Elettronica ed Elettrotecnica'),
(24, 4, 'B', 'Elettronica ed Elettrotecnica'),
(25, 1, 'C', 'Meccanica, Meccatronica ed Energia'),
(26, 3, 'C', 'Meccanica, Meccatronica ed Energia'),
(27, 1, 'A', 'Informatica e Telecomunicazioni'),
(28, 3, 'A', 'Informatica e Telecomunicazioni'),
(29, 2, 'B', 'Elettronica ed Elettrotecnica'),
(30, 4, 'B', 'Elettronica ed Elettrotecnica'),
(31, 1, 'C', 'Meccanica, Meccatronica ed Energia'),
(32, 3, 'C', 'Meccanica, Meccatronica ed Energia'),
(33, 1, 'C', 'Chimica e Materiali'),
(34, 3, 'C', 'Chimica e Materiali'),
(35, 1, 'C', 'Logistica'),
(36, 3, 'C', 'Logistica'),
(37, 1, 'C', 'Geometri'),
(38, 3, 'C', 'Geometri');

INSERT INTO `utente` (`ID`, `EMAIL`, `NOME`, `COGNOME`, `RUOLO`) VALUES
(1, 'damiano.necci@ittterni.org', 'Damiano', 'Necci', 'admin'),
(2, 'federico.cini@ittterni.org', 'Federico', 'Cini', 'docente'),
(3, 'simone.austeri@ittterni.org', 'Simone', 'Austeri', 'docente'),
(4, 'andrea.mari@ittterni.org', 'Andrea', 'Mari', 'studente'),
(5, 'tommaso.biscarini@ittterni.org', 'Tommaso', 'Biscarini', 'ata');