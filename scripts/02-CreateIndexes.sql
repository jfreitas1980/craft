-- Script de criação dos índices para otimização de performance

-- Índices para tabela CSAG311 (Sessões de usuário)
CREATE INDEX IX_CSAG311_ATIVO ON CSAG311(Ativo);

-- Índices para tabela CSAG325 (Cidades)
CREATE INDEX IX_CSAG325_ATIVO ON CSAG325(Ativo);
CREATE INDEX IX_CSAG325_DESCRICAO ON CSAG325(Descricao);
CREATE INDEX IX_CSAG325_PAIS ON CSAG325(Pais);

-- Índices para tabela HCGS3001 (Taxas)
CREATE INDEX IX_HCGS3001_ATIVO ON HCGS3001(Ativo);
CREATE INDEX IX_HCGS3001_CLASSE_TAXA ON HCGS3001(ClasseTaxa);
CREATE INDEX IX_HCGS3001_NM_TAXA ON HCGS3001(NmTaxa);

-- Índices para tabela HCGS3000 (Tarifários)
CREATE INDEX IX_HCGS3000_ORIGEM_DESTINO ON HCGS3000(Origem, Destino);
CREATE INDEX IX_HCGS3000_VALIDADE ON HCGS3000(DtValidadeInicio, DtValidadeFim);

-- Índices para tabela HCGS3000_AIRFR8 (Tarifários aéreos)
CREATE INDEX IX_HCGS3000_AIRFR8_ORIGEM_DESTINO ON HCGS3000_AIRFR8(Origem, Destino);

PRINT 'Índices criados com sucesso!';

