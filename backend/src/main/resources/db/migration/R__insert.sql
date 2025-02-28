INSERT INTO users (email, fullname, password, role, is_active)
VALUES ('admin@admin.com', 'admin', '$2a$12$XyObMPQaVXaBqzCI2kCe1uv9Bs5G6WGtdv7eSYr1uNhRU4ghLv3D2', 0, true);
INSERT INTO users (email, fullname, password, role, is_active)
VALUES ('test@test.com', 'test', '$2a$12$GT2s70BrrLLdCXIl3WsBx.NDbDx2aZUHeiPgjwPs3EKn0d45QHj7y', 2, true);
INSERT INTO categories (name, type, age_limit, gender)
VALUES ('Senior - man', 'SINGLE', 999, 'MAN');
INSERT INTO categories (name, type, age_limit, gender)
VALUES ('Senior - woman', 'SINGLE', 999, 'WOMAN');
INSERT INTO categories (name, type, age_limit, gender)
VALUES ('U19 - man', 'SINGLE', 19, 'MAN');
INSERT INTO categories (name, type, age_limit, gender)
VALUES ('U19 - woman', 'SINGLE', 19, 'WOMAN');
INSERT INTO categories (name, type, age_limit, gender)
VALUES ('U15 - man', 'SINGLE', 15, 'MAN');
INSERT INTO categories (name, type, age_limit, gender)
VALUES ('U15 - woman', 'SINGLE', 15, 'WOMAN');

INSERT INTO `players`
VALUES (1, '2000-10-11', 'Jan', 'MAN', 'Kowalski'),
       (2, '2018-06-15', 'Janusz ', 'MAN', 'Kowalczuk'),
       (3, '2025-02-28', 'Young', 'MAN', 'Player'),
       (4, '2010-02-11', 'Exmaple', 'MAN', 'Example'),
       (5, '2015-12-18', 'Player', 'WOMAN', 'Woman'),
       (6, '1999-02-18', 'Test', 'MAN', 'Test'),
       (7, '2014-02-04', 'Firstname', 'WOMAN', 'Lastname'),
       (8, '2012-01-12', 'Piotr', 'MAN', 'Wiśniewski'),
       (9, '2002-08-15', 'Tomasz', 'MAN', 'Lewandowski'),
       (10, '2017-06-15', 'Anna', 'WOMAN', 'Nowak'),
       (11, '2010-11-10', 'Hubert', 'MAN', 'Wajda'),
       (12, '1999-02-19', 'Karolina', 'WOMAN', 'Lis'),
       (13, '2010-06-17', 'Mateusz', 'MAN', 'Pawlak'),
       (14, '1996-02-07', 'Bartosz', 'MAN', 'Król'),
       (15, '2016-10-12', 'Zofia', 'WOMAN', 'Górksa'),
       (16, '2007-07-05', 'Taduesz', 'MAN', 'Luz'),
       (17, '2015-02-26', 'Przykladowy', 'MAN', 'Zawodnik'),
       (18, '2004-06-17', 'FPlayer', 'MAN', 'LPlayer');
INSERT INTO `player_category`
VALUES (1, 100, 1, 1),
       (2, 100, 1, 2),
       (3, 100, 3, 2),
       (4, 100, 5, 2),
       (5, 100, 1, 3),
       (6, 100, 3, 3),
       (7, 100, 5, 3),
       (8, 100, 1, 4),
       (9, 100, 3, 4),
       (10, 100, 5, 4),
       (11, 100, 2, 5),
       (12, 100, 4, 5),
       (13, 100, 6, 5),
       (14, 100, 1, 6),
       (15, 100, 2, 7),
       (16, 100, 4, 7),
       (17, 100, 6, 7),
       (18, 100, 1, 8),
       (19, 100, 3, 8),
       (20, 100, 5, 8),
       (21, 100, 1, 9),
       (22, 100, 2, 10),
       (23, 100, 4, 10),
       (24, 100, 6, 10),
       (25, 100, 1, 11),
       (26, 100, 3, 11),
       (27, 100, 5, 11),
       (28, 100, 2, 12),
       (29, 100, 1, 13),
       (30, 100, 3, 13),
       (31, 100, 5, 13),
       (32, 100, 1, 14),
       (33, 100, 2, 15),
       (34, 100, 4, 15),
       (35, 100, 6, 15),
       (36, 100, 1, 16),
       (37, 100, 3, 16),
       (38, 100, 1, 17),
       (39, 100, 3, 17),
       (40, 100, 5, 17),
       (41, 100, 1, 18);

INSERT INTO `events` VALUES (1,'2025-02-01','Example Event'),(2,'2025-01-08','Example2'),(3,'2024-03-07','TEST'),(4,'2025-01-01','TEST2'),(5,'2025-02-28','Mistrzostwa Polski'),(6,'2025-02-06','Turniej 1'),(7,'2025-02-15','Turniej 2'),(8,'2025-02-08','Turniej3'),(9,'2024-06-11','Example3'),(10,'2025-02-28','II Mistrzostwa Polski'),(11,'2025-02-24','WTT Contender');