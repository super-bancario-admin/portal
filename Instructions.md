# Instruções do Portal Ser Bancário

Este documento fornece um guia completo para entender, configurar e expandir a aplicação do portal Ser Bancário.

## 0. Descarregar e Utilização Offline

Para executar esta aplicação, apenas precisa de um navegador de internet (browser) moderno.

### Como Descarregar a Aplicação

Pode descarregar o código-fonte da aplicação para uso offline ou para fins de desenvolvimento.

**Usando uma ferramenta de linha de comando (como o wget):**
```bash
# Este comando descarrega recursivamente todos os ficheiros necessários (html, js, css, etc.)
wget --recursive --no-clobber --page-requisites --html-extension --convert-links --restrict-file-names=windows --domains O_SEU_DOMINIO --no-parent O_SEU_URL
```
*Substitua `O_SEU_DOMINIO` e `O_SEU_URL` pelo domínio e URL real onde a aplicação está hospedada.*

**Descarga Manual:**
1.  Abra a aplicação no seu navegador (browser).
2.  Clique com o botão direito na página e selecione "Guardar Como..." ou "Salvar Página Como...".
3.  Escolha o formato "Página Web, Completa" para guardar o ficheiro `index.html` juntamente com uma pasta contendo todos os seus recursos (JavaScript, CSS, imagens).
4.  Para executar a aplicação, abra o ficheiro `index.html` que guardou no seu navegador.

### Gerar a Build de Produção

Para compilar a aplicação para produção (gerando ficheiros otimizados para o servidor), siga estes passos. Este processo requer que tenha o Node.js e o npm (ou yarn) instalados no seu computador.

1.  **Instalar Dependências:**
    Abra um terminal na pasta raiz do projeto e execute o seguinte comando para instalar todas as dependências necessárias:
    ```bash
    npm install
    ```
    *Ou se preferir usar o yarn:*
    ```bash
    yarn install
    ```

2.  **Gerar a Build:**
    Após a instalação das dependências, execute o comando de build:
    ```bash
    npm run build
    ```
    *Ou com yarn:*
    ```bash
    yarn build
    ```

3.  **Resultado:**
    Este comando irá criar uma pasta `dist` (ou `build`) no diretório do projeto. Esta pasta contém todos os ficheiros estáticos (HTML, CSS, JavaScript) otimizados e prontos para serem publicados num servidor web.


## 1. Explicação da Aplicação

O portal **Ser Bancário** é uma aplicação web moderna e responsiva, projetada para ser o centro de notícias, análises e eventos do setor financeiro e bancário angolano. Serve como um recurso vital para profissionais, investidores e entusiastas se manterem informados e conectados.

### Funcionalidades Principais:

*   **Página Inicial**: Uma página de entrada dinâmica que oferece uma visão geral completa das ofertas do portal. Inclui:
    *   Uma secção de destaque (hero) que apresenta a missão do portal.
    *   Uma vitrine de funcionalidades chave: "Notícias Exclusivas", "Análises Profundas" e "Eventos Premium".
    *   Secções para as últimas notícias e artigos de blog.
    *   Uma lista dos próximos eventos para incentivar a participação.
    *   Um carrossel de parceiros e patrocinadores que rola automaticamente.
*   **Secções de Conteúdo**:
    *   **Notícias**: Uma página dedicada que lista todos os artigos de notícias.
    *   **Blog**: Uma página semelhante para análises aprofundadas e artigos de opinião.
    *   **Eventos**: Uma página que lista tanto os eventos futuros como os passados.
*   **Páginas de Detalhe**:
    *   **Página do Artigo**: Uma página limpa e focada no leitor para os artigos.
    *   **Página de Detalhes do Evento**: Uma visão abrangente para cada evento.
*   **Funcionalidades Interativas**:
    *   **Sistema de Reserva de Eventos**: Os utilizadores podem reservar uma vaga para um evento através de um formulário modal.
    *   **Pesquisa**: Uma barra de pesquisa funcional no cabeçalho permite que os utilizadores pesquisem em todo o conteúdo.
*   **Painel de Administração (Admin Dashboard)**:
    *   **Autenticação Segura**: Acesso ao painel protegido por login.
    *   **Controlo Baseado em Funções (Role-Based Access Control)**: Diferentes tipos de utilizadores (Super Admin, Admin, Manager, Blogger) têm permissões distintas.
    *   **Gestão de Utilizadores**: Admins podem criar, editar e apagar contas de utilizadores.
    *   **Gestão de Conteúdo Completa (CRUD)**: Utilizadores autorizados podem criar, ler, atualizar e apagar notícias, artigos de blog e eventos. Bloggers só podem gerir o seu próprio conteúdo.
    *   **Navegação Intuitiva**: Uma barra lateral organizada permite navegar facilmente entre as diferentes secções de gestão.

## 2. Esquema da Base de Dados, RLS e Permissões

Para um ambiente de produção, os dados devem ser migrados para uma base de dados. Abaixo está um esquema PostgreSQL sugerido, juntamente com políticas de Segurança a Nível de Linha (RLS - Row-Level Security).

### Esquema da Base de Dados (SQL)

```sql
-- ENUM para tipos de artigo
CREATE TYPE article_type AS ENUM ('news', 'blog');
-- ENUM para funções de utilizador
CREATE TYPE user_role AS ENUM ('Super Admin', 'Admin', 'Manager', 'Blogger');

-- Tabela para Utilizadores
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para artigos de Notícias e Blog
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users(id) ON DELETE SET NULL,
    type article_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    body TEXT,
    author_name VARCHAR(100), -- Mantido para consistência com o seed, mas pode ser obtido por JOIN
    categories TEXT[],
    tags TEXT[],
    published_at TIMESTAMPTZ DEFAULT NOW(),
    cover_image_url VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para Eventos
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    date VARCHAR(20) NOT NULL,
    time VARCHAR(50),
    location VARCHAR(255),
    description TEXT,
    is_past BOOLEAN DEFAULT FALSE,
    cover_image_url VARCHAR(255),
    banner_image_url VARCHAR(255),
    gallery_images_urls TEXT[],
    capacity INT NOT NULL DEFAULT 0,
    attendees INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para Patrocinadores
CREATE TABLE sponsors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para Reservas de Eventos
CREATE TABLE event_reservations (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    contact_method VARCHAR(20) CHECK (contact_method IN ('email', 'phone')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### RLS (Segurança a Nível de Linha) e Permissões

```sql
-- Ativar RLS em todas as tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_reservations ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACESSO PÚBLICO (Leitura)
CREATE POLICY "Permitir acesso de leitura público" ON articles FOR SELECT USING (true);
CREATE POLICY "Permitir acesso de leitura público" ON events FOR SELECT USING (true);
CREATE POLICY "Permitir acesso de leitura público" ON sponsors FOR SELECT USING (true);

-- POLÍTICAS DE ACESSO AUTENTICADO (CRUD)
-- Assumindo que tem uma função `auth.uid()` que retorna o ID do utilizador logado
-- e `get_user_role(auth.uid())` que retorna a função do utilizador.

-- Artigos: Bloggers só podem modificar os seus próprios artigos. Admins/Managers podem modificar todos.
CREATE POLICY "Permitir CRUD em artigos próprios para bloggers" ON articles
    FOR ALL
    USING (author_id = auth.uid())
    WITH CHECK (author_id = auth.uid());

CREATE POLICY "Permitir acesso total a admins/managers" ON articles
    FOR ALL
    USING (get_user_role(auth.uid()) IN ('Super Admin', 'Admin', 'Manager'));

-- Utilizadores: Apenas Admins podem gerir outros utilizadores (com restrições)
CREATE POLICY "Admins podem gerir managers e bloggers" ON users
    FOR ALL
    USING (get_user_role(auth.uid()) IN ('Super Admin', 'Admin') AND role IN ('Manager', 'Blogger'));

-- (Políticas semelhantes seriam necessárias para as outras tabelas)
```

## 3. Instruções de Integração com o Backend

A aplicação foi refatorada para usar um `DataContext` para simular um backend. Para conectar a um backend real, precisará de substituir a lógica de manipulação de estado no `DataContext` por requisições HTTP (`fetch`) para a sua API.

### Passo 1: Configurar Endpoints da API

O seu backend deve expor endpoints de API RESTful.

| Recurso | Método | Endpoint Sugerido | Descrição |
| --- | --- | --- | --- |
| **Utilizadores** | GET | `/api/users` | Obter lista de utilizadores. |
| | POST | `/api/users` | Criar um novo utilizador. |
| | PUT | `/api/users/:id` | Atualizar um utilizador existente. |
| | DELETE | `/api/users/:id` | Apagar um utilizador. |
| **Artigos** | GET | `/api/articles` | Obter lista de artigos (com filtros ?type=news). |
| | GET | `/api/articles/:id` | Obter um único artigo. |
| | POST | `/api/articles` | Criar um novo artigo. |
| | PUT | `/api/articles/:id` | Atualizar um artigo existente. |
| | DELETE | `/api/articles/:id` | Apagar um artigo. |
| **Eventos** | GET | `/api/events` | Obter lista de eventos. |
| | POST | `/api/events` | Criar um novo evento. |
| | PUT | `/api/events/:id` | Atualizar um evento existente. |
| | DELETE | `/api/events/:id` | Apagar um evento. |
| **Reservas** | POST | `/api/events/:eventId/reservations` | Submeter uma nova reserva. |
| **Sponsors** | GET | `/api/sponsors` | Obter lista de patrocinadores. |
| | POST | `/api/sponsors` | Criar um novo patrocinador. |
| | PUT | `/api/sponsors/:id` | Atualizar um patrocinador. |
| | DELETE | `/api/sponsors/:id` | Apagar um patrocinador. |


### Passo 2: Atualizar o `context/DataContext.tsx`

Modifique as funções dentro do `DataProvider` para fazerem chamadas `fetch` em vez de manipularem o estado local.

**Exemplo: Atualizando `deleteUser`**

```typescript
// context/DataContext.tsx

// ...
const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // ...
    
    const deleteUser = async (userId: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Falha ao apagar utilizador');
            }
            // Se a chamada à API for bem-sucedida, atualize o estado local
            setUsers(currentUsers => currentUsers.filter(u => u.id !== userId));
        } catch (error) {
            console.error("Erro ao apagar utilizador:", error);
            // Opcional: mostrar uma notificação de erro ao utilizador
        }
    };

    // ...
}
```

**Carregamento Inicial dos Dados**

No `DataProvider`, use um `useEffect` para carregar os dados iniciais da sua API quando o componente é montado.

```typescript
// context/DataContext.tsx

useEffect(() => {
    constfetchAllData = async () => {
        try {
            const [usersRes, newsRes, blogRes, eventsRes, sponsorsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/users`),
                fetch(`${API_BASE_URL}/articles?type=news`),
                fetch(`${API_BASE_URL}/articles?type=blog`),
                fetch(`${API_BASE_URL}/events`),
                fetch(`${API_BASE_URL}/sponsors`),
            ]);

            // Lógica para verificar se as respostas estão OK e converter para JSON
            
            setUsers(await usersRes.json());
            setNews(await newsRes.json());
            // ... e assim por diante para os outros
            
            setLoading(false);
        } catch (error) {
            console.error("Falha ao carregar os dados iniciais:", error);
            // Tratar o estado de erro
        }
    };

    fetchAllData();
}, []);
```
Ao seguir estes passos, pode fazer a transição do portal Ser Bancário de uma aplicação com dados simulados para uma plataforma totalmente funcional e dinâmica, alimentada por um backend e uma base de dados reais.
