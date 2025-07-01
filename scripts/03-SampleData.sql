-- Script de inserção de dados de exemplo

-- Países
INSERT INTO CSAG329 (Sigla, Descricao) VALUES 
('BR', 'Brasil'),
('US', 'Estados Unidos'),
('CN', 'China'),
('DE', 'Alemanha'),
('JP', 'Japão');

-- Classes de taxa
INSERT INTO CCGS221 (Classe, Descricao) VALUES 
('O', 'Origem'),
('F', 'Frete'),
('D', 'Destino');

-- Cidades
INSERT INTO CSAG325 (IdCidade, Descricao, Uf, Pais, Ativo) VALUES 
('SP001', 'São Paulo', 'SP', 'BR', 'S'),
('RJ001', 'Rio de Janeiro', 'RJ', 'BR', 'S'),
('NYC001', 'New York', 'NY', 'US', 'S'),
('LAX001', 'Los Angeles', 'CA', 'US', 'S'),
('SHA001', 'Shanghai', '', 'CN', 'S');

-- Aeroportos
INSERT INTO HSAG325_AIR (IdCidade, Iata, Nome) VALUES 
('SP001', 'GRU', 'Aeroporto Internacional de São Paulo'),
('RJ001', 'GIG', 'Aeroporto Internacional do Rio de Janeiro'),
('NYC001', 'JFK', 'John F. Kennedy International Airport'),
('LAX001', 'LAX', 'Los Angeles International Airport'),
('SHA001', 'PVG', 'Shanghai Pudong International Airport');

-- Clientes
INSERT INTO CSAG340 (IdCliente, Nome, Tipo) VALUES 
('CLI001', 'Cliente Exemplo 1', 'PF'),
('CLI002', 'Cliente Exemplo 2', 'PJ'),
('CLI003', 'Cliente VIP', 'VIP');

-- Taxas
INSERT INTO HCGS3001 (IdTaxa, NmTaxa, ClasseTaxa, Ativo) VALUES 
('TAX001', 'Taxa de Origem', 'O', 'S'),
('TAX002', 'Taxa de Frete', 'F', 'S'),
('TAX003', 'Taxa de Destino', 'D', 'S'),
('TAX004', 'Taxa Administrativa', 'O', 'S'),
('TAX005', 'Taxa de Seguro', 'F', 'S');

-- Sessão de exemplo
INSERT INTO CSAG311 (UsuarioSessao, IdUsuario, DtInicio, DtUltimoAcesso, IpOrigem, Ativo) VALUES 
('SESS123456789', 'USER001', GETDATE(), GETDATE(), '192.168.1.1', 'S');

PRINT 'Dados de exemplo inseridos com sucesso!';

