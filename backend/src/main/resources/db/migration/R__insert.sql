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
INSERT INTO `tournaments` VALUES (1,_binary '','Open - man',0,NULL,1,1),(2,_binary '','Open - woman',0,NULL,1,1),(3,_binary '','Junior - M',0,NULL,3,2),(4,_binary '','Junior - W',0,NULL,4,2),(5,_binary '','U15 - M',0,NULL,5,2),(6,_binary '','Man',0,NULL,1,5),(7,_binary '\0','Woman',0,NULL,2,5),(8,_binary '\0','Test - M',0,NULL,1,4),(9,_binary '\0','Test - W',0,NULL,2,4),(10,_binary '\0','U15 - M',0,NULL,5,3),(11,_binary '\0','U15 - W',0,NULL,6,3);

INSERT INTO `game` VALUES (1,NULL,1,0,0,'CREATED',NULL,NULL,NULL,1),(2,1,2,0,0,'CREATED',NULL,11,NULL,1),(3,2,3,3,2,'DONE',11,1,11,1),(4,3,4,0,0,'WALK_OVER',NULL,1,NULL,1),(5,3,4,3,0,'DONE',11,13,11,1),(6,2,3,0,0,'SCHEDULED',4,6,NULL,1),(7,6,4,0,3,'DONE',17,6,6,1),(8,6,4,3,1,'DONE',4,18,4,1),(9,1,2,0,0,'CREATED',NULL,NULL,NULL,1),(10,9,3,0,0,'SCHEDULED',8,3,NULL,1),(11,10,4,0,0,'WALK_OVER',NULL,3,NULL,1),(12,10,4,3,0,'DONE',8,16,8,1),(13,9,3,0,0,'SCHEDULED',9,2,NULL,1),(14,13,4,2,3,'DONE',14,9,9,1),(15,13,4,0,0,'WALK_OVER',2,NULL,NULL,1),(16,NULL,1,0,0,'CREATED',NULL,NULL,NULL,2),(17,16,2,0,0,'CREATED',NULL,NULL,NULL,2),(18,17,3,0,0,'CREATED',NULL,11,NULL,2),(19,18,4,0,0,'WALK_OVER',NULL,11,NULL,2),(20,18,4,0,0,'SCHEDULED',3,13,NULL,2),(21,17,3,0,0,'CREATED',NULL,NULL,NULL,2),(22,21,4,0,0,'SCHEDULED',17,9,NULL,2),(23,21,4,0,0,'SCHEDULED',8,18,NULL,2),(24,16,2,0,0,'CREATED',NULL,NULL,NULL,2),(25,24,3,0,0,'CREATED',NULL,6,NULL,2),(26,25,4,0,0,'WALK_OVER',NULL,6,NULL,2),(27,25,4,0,0,'SCHEDULED',1,16,NULL,2),(28,24,3,0,0,'CREATED',NULL,4,NULL,2),(29,28,4,0,0,'SCHEDULED',14,2,NULL,2),(30,28,4,0,0,'WALK_OVER',4,NULL,NULL,2),(31,NULL,1,0,0,'CREATED',NULL,2,NULL,3),(32,31,2,0,3,'DONE',8,2,2,3),(33,31,2,0,0,'SCHEDULED',3,4,NULL,3),(34,NULL,1,0,0,'SCHEDULED',10,5,NULL,4),(35,34,2,0,3,'DONE',15,5,5,4),(36,34,2,0,3,'DONE',7,10,10,4),(37,NULL,1,0,0,'CREATED',NULL,NULL,NULL,5),(38,37,2,0,0,'SCHEDULED',11,2,NULL,5),(39,38,3,0,0,'WALK_OVER',NULL,2,NULL,5),(40,38,3,1,3,'DONE',8,11,11,5),(41,37,2,0,0,'SCHEDULED',3,4,NULL,5),(42,41,3,0,0,'WALK_OVER',NULL,4,NULL,5),(43,41,3,0,0,'WALK_OVER',3,NULL,NULL,5),(44,NULL,1,0,0,'CREATED',NULL,NULL,NULL,6),(45,44,2,0,0,'CREATED',NULL,NULL,NULL,6),(46,45,3,0,0,'SCHEDULED',3,11,NULL,6),(47,45,3,0,0,'SCHEDULED',8,9,NULL,6),(48,44,2,0,0,'CREATED',NULL,NULL,NULL,6),(49,48,3,0,0,'SCHEDULED',1,6,NULL,6),(50,48,3,0,0,'SCHEDULED',4,2,NULL,6);

INSERT INTO `points_away` VALUES (5,11),(5,11),(5,11),(7,0),(7,0),(7,0),(8,11),(8,11),(8,11),(8,11),(12,11),(12,11),(12,11),(14,11),(14,11),(14,0),(14,0),(14,0),(3,11),(3,0),(3,0),(3,11),(3,11),(32,0),(32,0),(32,0),(35,0),(35,0),(35,0),(36,0),(36,0),(36,0),(40,0),(40,11),(40,0),(40,0);
INSERT INTO `points_home` VALUES (5,0),(5,0),(5,0),(7,11),(7,11),(7,11),(8,0),(8,0),(8,13),(8,0),(12,0),(12,0),(12,0),(14,0),(14,0),(14,11),(14,11),(14,11),(3,0),(3,11),(3,11),(3,0),(3,0),(32,11),(32,11),(32,11),(35,11),(35,11),(35,11),(36,11),(36,11),(36,11),(40,11),(40,0),(40,11),(40,11);
INSERT INTO `tournament_player` VALUES (1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,9),(1,11),(1,13),(1,14),(1,16),(1,17),(1,18),(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,9),(2,11),(2,13),(2,14),(2,16),(2,17),(2,18),(3,2),(3,3),(3,4),(3,8),(4,5),(4,7),(4,10),(4,15),(5,2),(5,3),(5,4),(5,8),(5,11),(6,1),(6,2),(6,3),(6,4),(6,6),(6,8),(6,9),(6,11);
