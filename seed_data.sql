-- Inserare cărți
INSERT INTO books (title, author, description) VALUES
('Moara cu noroc', 'Ioan Slavici', 'Un roman clasic al literaturii române care explorează natura umană și destinul unui om prins în capcana viciilor.'),
('Ion', 'Liviu Rebreanu', 'Un roman care reflectă viața țăranilor din Transilvania și conflictele interne ale unui om cu dorința de putere.'),
('Enigma Otiliei', 'George Călinescu', 'Romanul explorează complexitatea relațiilor dintre personaje, cu un accent deosebit pe psihologia acestora.');

-- Inserare întrebări pentru "Moara cu noroc"
INSERT INTO true_false_questions (book_id, question, is_true) VALUES
(1, 'Personajul principal din "Moara cu noroc" este Lică Sămădăul.', 0),
(1, '"Moara cu noroc" este un roman scris de Ioan Slavici.', 1);

-- Inserare întrebări pentru "Ion"
INSERT INTO true_false_questions (book_id, question, is_true) VALUES
(2, 'Ion este un personaj care își dorește să devină bogat prin orice mijloace.', 1),
(2, 'Ion este un personaj pozitiv, fără niciun defect.', 0);

-- Inserare întrebări pentru "Enigma Otiliei"
INSERT INTO true_false_questions (book_id, question, is_true) VALUES
(3, 'Enigma Otiliei este un roman scris de George Călinescu.', 1),
(3, 'Otilia este un personaj care trăiește într-o atmosferă de mister.', 1);
