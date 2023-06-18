CREATE database k_disneyVillainsDB;

USE k_disneyVillainsDB;

CREATE TABLE villains (
    name VARCHAR(255),
    movie VARCHAR(255),
    slug VARCHAR(255),
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deletedAt DATETIME,
    PRIMARY KEY(slug)
);

INSERT INTO villains (
    name, movie, slug
) VALUES ('Captain Hook', 'Peter Pan', 'captain-hook'),
('Cruella de vil', 'One Hundred and One Dalmations', 'cruella-de-vil'),
('Gaston', 'Beauty and the Beast', 'gaston'),
('Hades', 'Hercules', 'hades'),
('Horned King', 'The Black Cauldron', 'horned-king'),
('Jafar', 'Aladdin', 'jafar'),
('Lady Tremaine', 'Cinderella', 'lady-tremaine'),
('Madame Medusa', 'The Rescuers', 'madame-medusa'),
('Madam Mim', 'The Sword in the Stone', 'madam-mim'),
('Maleficent', 'Sleeping Beauty', 'maleficent'),
('Prince John', 'Robin Hood', 'prince-john'),
('Sir Hiss', 'Robin Hood', 'sir-hiss'),
('Queen Grimhilde', 'Snow White and the Seven Dwarfs', 'queen-grimhilde'),
('Queen of Hearts', 'Alice in Wonderland', 'queen-of-hearts'),
('Scar', 'The Lion King', 'scar'),
('Shan Yu', 'Mulan', 'shan-yu'),
('Shere Khan', 'The Jungle Book', 'shere-khan'),
('Ursula', 'The Little Mermaid', 'ursula');



CREATE USER 'k_villains_user'@"%" IDENTIFIED WITH mysql_native_password BY 'disneyVillains';

GRANT ALL ON k_disneyVillainsDB.* TO 'k_villains_user'@'%';

    