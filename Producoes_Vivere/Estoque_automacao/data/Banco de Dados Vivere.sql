USE vivere_estoque

CREATE TABLE inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100),
    material VARCHAR(255) NOT NULL,
    quantidade INT DEFAULT 0,
    observacoes TEXT
);

SELECT * FROM inventario;

SELECT * FROM inventario
WHERE quantidade < 10
ORDER BY quantidade ASC;

SELECT * FROM inventario
WHERE material LIKE '%treliça%'
ORDER BY quantidade ASC;

SELECT * FROM inventario
WHERE material LIKE '%fechamento%'
ORDER BY quantidade ASC;

SELECT * FROM inventario
WHERE material LIKE '%MÃO FRANCESA%'
ORDER BY quantidade ASC;

SELECT * FROM inventario
WHERE material LIKE '%calha%'
ORDER BY quantidade ASC;

SELECT * FROM inventario
WHERE material LIKE '%parafuso%'
ORDER BY quantidade ASC;

SELECT * FROM inventario
WHERE material LIKE '%tenda%'
ORDER BY quantidade ASC;

SHOW CREATE TABLE materiais;


DROP TABLE IF EXISTS movimentos;
DELETE FROM movimentos LIMIT 10000;
SELECT COUNT(*) FROM movimentos;

SELECT material,categoria, quantidade FROM inventario;


SELECT * FROM inventario;

DROP TABLE IF EXISTS movimentos;



CREATE TABLE movimentos (
    id_movimento INT AUTO_INCREMENT PRIMARY KEY,
    material VARCHAR(255) NOT NULL,
    tipo ENUM('entrada', 'saida') NOT NULL,
    quantidade INT NOT NULL,
    horario DATETIME NOT NULL
);






