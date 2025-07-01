# Sistema de Autenticação CROSS API - Guia Completo

## Visão Geral

O Sistema CROSS API implementa um sistema de autenticação baseado em sessões que gera tokens únicos (`userSession`) utilizados como parâmetro de entrada em todos os endpoints protegidos. Este documento detalha como utilizar o sistema de autenticação completo.

## Fluxo de Autenticação

### 1. Login e Geração de Sessão

**Endpoint:** `POST /api/auth/login`

**Descrição:** Realiza autenticação do usuário e cria uma nova sessão, retornando o token `userSession` necessário para acessar outros endpoints.

**Request Body:**
```json
{
  "username": "seu_usuario",
  "password": "sua_senha",
  "clientInfo": "Informações do cliente (opcional)",
  "rememberMe": false
}
```

**Response (Sucesso - 200):**
```json
{
  "userSession": "SESS_1703123456_AbC123XyZ789",
  "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "seu_usuario",
  "loginTime": "2024-12-21T10:30:00Z",
  "expiresAt": "2024-12-21T18:30:00Z",
  "message": "Login realizado com sucesso"
}
```

**Response (Erro - 401):**
```json
{
  "error": "Credenciais inválidas"
}
```

**Exemplo de uso com cURL:**
```bash
curl -X POST "https://localhost:7000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "123456"
  }'
```

**Exemplo de uso com JavaScript:**
```javascript
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin',
    password: '123456'
  })
});

const loginData = await loginResponse.json();
const userSession = loginData.userSession;

// Armazenar o userSession para uso posterior
localStorage.setItem('userSession', userSession);
```

### 2. Usando o userSession em Outros Endpoints

Após obter o `userSession` através do login, você deve incluí-lo como parâmetro de query em todos os endpoints protegidos.

**Exemplo - Buscar lista de taxas:**
```bash
curl -X GET "https://localhost:7000/api/tax/list?userSession=SESS_1703123456_AbC123XyZ789"
```

**Exemplo - Buscar cidades:**
```bash
curl -X GET "https://localhost:7000/api/city/search-trade?userSession=SESS_1703123456_AbC123XyZ789&cityNamePrefix=São&countryIds=BR"
```

**Exemplo com JavaScript:**
```javascript
const userSession = localStorage.getItem('userSession');

// Buscar taxas
const taxesResponse = await fetch(`/api/tax/list?userSession=${userSession}`);
const taxes = await taxesResponse.json();

// Buscar cidades
const citiesResponse = await fetch(`/api/city/search-trade?userSession=${userSession}&cityNamePrefix=Rio`);
const cities = await citiesResponse.json();
```

### 3. Validação de Sessão

**Endpoint:** `GET /api/auth/validate-session`

**Descrição:** Verifica se uma sessão está válida e ativa.

**Parâmetros:**
- `userSession` (query): Token de sessão a ser validado

**Response (Sessão Válida):**
```json
{
  "isValid": true,
  "username": "admin",
  "loginTime": "2024-12-21T10:30:00Z",
  "lastAccess": "2024-12-21T14:15:00Z",
  "expiresAt": "2024-12-21T22:15:00Z",
  "message": "Sessão válida"
}
```

**Response (Sessão Inválida):**
```json
{
  "isValid": false,
  "message": "Sessão não encontrada ou inativa"
}
```

### 4. Renovação de Sessão

**Endpoint:** `POST /api/auth/renew-session`

**Descrição:** Renova uma sessão existente, estendendo seu tempo de vida.

**Parâmetros:**
- `userSession` (query): Token de sessão a ser renovado

**Response:**
```json
{
  "userSession": "SESS_1703123456_AbC123XyZ789",
  "renewedAt": "2024-12-21T15:00:00Z",
  "expiresAt": "2024-12-21T23:00:00Z",
  "message": "Sessão renovada com sucesso"
}
```

### 5. Logout

**Endpoint:** `POST /api/auth/logout`

**Descrição:** Invalida uma sessão ativa.

**Parâmetros:**
- `userSession` (query): Token de sessão a ser invalidado

**Response:**
```json
{
  "message": "Logout realizado com sucesso"
}
```

## Exemplos Práticos de Uso

### Exemplo 1: Fluxo Completo de Autenticação

```javascript
class CrossApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.userSession = null;
  }

  async login(username, password) {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        this.userSession = data.userSession;
        localStorage.setItem('userSession', this.userSession);
        return data;
      } else {
        throw new Error('Login falhou');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async getTaxList() {
    if (!this.userSession) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${this.baseUrl}/api/tax/list?userSession=${this.userSession}`);
    return await response.json();
  }

  async searchCities(cityNamePrefix, countryIds = '') {
    if (!this.userSession) {
      throw new Error('Usuário não autenticado');
    }

    const params = new URLSearchParams({
      userSession: this.userSession,
      cityNamePrefix: cityNamePrefix
    });

    if (countryIds) {
      params.append('countryIds', countryIds);
    }

    const response = await fetch(`${this.baseUrl}/api/city/search-trade?${params}`);
    return await response.json();
  }

  async logout() {
    if (this.userSession) {
      await fetch(`${this.baseUrl}/api/auth/logout?userSession=${this.userSession}`, {
        method: 'POST'
      });
      this.userSession = null;
      localStorage.removeItem('userSession');
    }
  }
}

// Uso da classe
const client = new CrossApiClient('https://localhost:7000');

// Login
await client.login('admin', '123456');

// Usar endpoints
const taxes = await client.getTaxList();
const cities = await client.searchCities('São Paulo', 'BR');

// Logout
await client.logout();
```

### Exemplo 2: Implementação com Renovação Automática

```javascript
class CrossApiClientWithAutoRenewal {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.userSession = localStorage.getItem('userSession');
    this.renewalInterval = null;
  }

  async login(username, password) {
    const response = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      this.userSession = data.userSession;
      localStorage.setItem('userSession', this.userSession);
      
      // Configurar renovação automática a cada 30 minutos
      this.startAutoRenewal();
      
      return data;
    }
    throw new Error('Login falhou');
  }

  startAutoRenewal() {
    this.renewalInterval = setInterval(async () => {
      try {
        await this.renewSession();
      } catch (error) {
        console.error('Erro na renovação automática:', error);
        this.logout();
      }
    }, 30 * 60 * 1000); // 30 minutos
  }

  async renewSession() {
    if (!this.userSession) return;

    const response = await fetch(`${this.baseUrl}/api/auth/renew-session?userSession=${this.userSession}`, {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('Falha na renovação da sessão');
    }

    return await response.json();
  }

  async makeAuthenticatedRequest(endpoint, options = {}) {
    if (!this.userSession) {
      throw new Error('Usuário não autenticado');
    }

    // Adicionar userSession aos parâmetros
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.append('userSession', this.userSession);

    const response = await fetch(url.toString(), options);

    if (response.status === 401) {
      // Sessão expirou, fazer logout
      this.logout();
      throw new Error('Sessão expirada');
    }

    return response;
  }

  async logout() {
    if (this.renewalInterval) {
      clearInterval(this.renewalInterval);
    }

    if (this.userSession) {
      await fetch(`${this.baseUrl}/api/auth/logout?userSession=${this.userSession}`, {
        method: 'POST'
      });
    }

    this.userSession = null;
    localStorage.removeItem('userSession');
  }
}
```

## Configurações de Segurança

### Timeout de Sessão

O timeout padrão de sessão é de 8 horas, configurável no `appsettings.json`:

```json
{
  "SessionTimeoutHours": 8
}
```

### Configurações de Autenticação

```json
{
  "Authentication": {
    "EnableJwtValidation": true,
    "RequireHttps": false,
    "AllowMultipleSessions": true,
    "SessionCleanupIntervalMinutes": 60
  }
}
```

## Tratamento de Erros

### Códigos de Status HTTP

- **200 OK**: Operação realizada com sucesso
- **400 Bad Request**: Parâmetros inválidos ou ausentes
- **401 Unauthorized**: Credenciais inválidas ou sessão expirada
- **500 Internal Server Error**: Erro interno do servidor

### Respostas de Erro Comuns

**Sessão Inválida:**
```json
{
  "error": "Sessão inválida ou expirada"
}
```

**Parâmetros Ausentes:**
```json
{
  "error": "Token de sessão é obrigatório"
}
```

**Credenciais Inválidas:**
```json
{
  "error": "Credenciais inválidas"
}
```

## Melhores Práticas

### 1. Armazenamento Seguro do Token
- Use `localStorage` ou `sessionStorage` para SPAs
- Para aplicações móveis, use armazenamento seguro específico da plataforma
- Nunca armazene tokens em cookies sem configurações de segurança adequadas

### 2. Renovação Proativa
- Implemente renovação automática antes da expiração
- Monitore respostas 401 para detectar expiração de sessão
- Redirecione para login quando necessário

### 3. Logout Adequado
- Sempre chame o endpoint de logout ao sair da aplicação
- Limpe o armazenamento local de tokens
- Invalide sessões no servidor

### 4. Tratamento de Erros
- Implemente retry logic para falhas de rede
- Trate adequadamente erros de autenticação
- Forneça feedback claro ao usuário

### 5. Segurança
- Use HTTPS em produção
- Implemente rate limiting para endpoints de login
- Monitore tentativas de login suspeitas
- Considere implementar 2FA para maior segurança

## Integração com Frontend

### React Example

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(localStorage.getItem('userSession'));
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        setUserSession(data.userSession);
        setUser({ username: data.username });
        localStorage.setItem('userSession', data.userSession);
        return data;
      }
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (userSession) {
      await fetch(`/api/auth/logout?userSession=${userSession}`, {
        method: 'POST'
      });
    }
    setUserSession(null);
    setUser(null);
    localStorage.removeItem('userSession');
  };

  const apiCall = async (endpoint, options = {}) => {
    if (!userSession) {
      throw new Error('Not authenticated');
    }

    const url = new URL(endpoint, window.location.origin);
    url.searchParams.append('userSession', userSession);

    const response = await fetch(url.toString(), options);

    if (response.status === 401) {
      logout();
      throw new Error('Session expired');
    }

    return response;
  };

  return (
    <AuthContext.Provider value={{ userSession, user, login, logout, apiCall }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

## Conclusão

O sistema de autenticação do CROSS API fornece uma base sólida para controle de acesso seguro. O token `userSession` gerado no login deve ser incluído em todas as requisições subsequentes para endpoints protegidos. Implemente as melhores práticas de segurança e tratamento de erros para garantir uma experiência de usuário robusta e segura.

