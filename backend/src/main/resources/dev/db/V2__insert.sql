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