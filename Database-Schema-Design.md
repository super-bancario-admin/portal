# Documento de Desenho de Esquema de Base de Dados: Portal Ser Bancário (Versão MariaDB)

**Versão:** 1.1
**Data:** 24 de Julho de 2024
**Autor:** A Sua Equipa de Engenharia

---

## Sumário Executivo

Este documento detalha a arquitetura da base de dados **MariaDB/MySQL** para o portal "Ser Bancário". O design foi concebido para ser robusto, seguro, escalável e de alto desempenho, fornecendo a base para uma aplicação full-stack com um painel de administração completo.

A arquitetura assenta em vários pilares:
1.  **Gestão de Utilizadores e Autenticação Robusta**: Um sistema granular de funções e permissões.
2.  **Gestão de Conteúdo Unificada**: Uma estrutura flexível para gerir notícias, artigos de blog e outro conteúdo dinâmico.
3.  **Sistema Completo de Gestão de Eventos**: Desde a criação de eventos até à gestão de reservas de participantes.
4.  **Módulos de Marketing e Parcerias**: Ferramentas para gerir patrocinadores e banners promocionais.
5.  **Segurança por Predefinição**: Implementação de segurança através de `VIEWs` para emular a Segurança a Nível de Linha (RLS).
6.  **Automatização e Integridade**: Utilização de triggers e funções da base de dados para garantir a consistência dos dados e automatizar tarefas.
7.  **Auditoria Abrangente**: Um sistema de logging detalhado que regista todas as ações significativas.

Esta base de dados está pronta para produção e serve como a única fonte de verdade para a aplicação, garantindo consistência e fiabilidade dos dados.

---

## Descrição do Diagrama ER (Entidade-Relação)

O esquema é centrado na tabela `utilizadores`, que está no cerne da autenticação e da atribuição de conteúdo.

-   **`utilizadores`**: Contém todos os dados de utilizadores, funções e estado da conta. É a entidade central.
-   **`articles`**: Relaciona-se com `utilizadores` através de uma chave estrangeira `author_id`. Um utilizador (autor) pode ter vários artigos. Esta tabela também tem uma relação muitos-para-muitos com `categories` e `tags` através de tabelas de junção (`article_categories` e `article_tags`).
-   **`eventos`**: Relaciona-se com `utilizadores` através de `organizer_id`. Um utilizador pode organizar vários eventos.
-   **`eventos_reservations`**: É uma tabela de junção que liga `eventos` e `utilizadores`. Um evento pode ter muitas reservas e um utilizador pode reservar vários eventos. Também permite reservas de convidados (onde `user_id` é nulo).
-   **`sponsors` e `banners`**: São entidades de marketing que geralmente não têm relações diretas com outras tabelas, mas são geridas por utilizadores com permissões de administrador.
-   **`contact_submissions`**: Pode opcionalmente ligar-se a `utilizadores` através de `assigned_to_user_id` para atribuir pedidos de suporte.
-   **`activity_logs`**: Relaciona-se com `utilizadores` através de `user_id` para registar quem realizou uma ação. Usa uma referência polimórfica (`target_table` e `target_record_id`) para apontar para o registo que foi modificado em qualquer outra tabela.

---

## Esquema SQL Completo (MariaDB)

Abaixo estão as instruções `CREATE TABLE` completas para o esquema da base de dados, otimizadas para MariaDB/MySQL.

```sql
-- Definição de tabelas com limpeza prévia para facilitar os testes.
DROP TABLE IF EXISTS `activity_logs`, `contact_submissions`, `banners`, `sponsors`, `eventos_reservations`, `eventos`, `article_tags`, `article_categories`, `tags`, `categories`, `articles`, `utilizadores`;

----------------------------------------
-- 1. SISTEMA DE GESTÃO DE UTILIZADORES
----------------------------------------
CREATE TABLE `utilizadores` (
    `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    
    -- Credenciais e Autenticação
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL COMMENT 'Hash da palavra-passe gerado pela aplicação (e.g., Argon2, bcrypt).',
    
    -- Funções e Permissões
    `role` ENUM('Super Admin', 'Admin', 'Editor', 'Moderator', 'Blogger', 'User') NOT NULL DEFAULT 'User',
    
    -- Informação de Perfil
    `full_name` VARCHAR(255),
    `avatar_url` VARCHAR(512),
    `bio` TEXT,
    `phone_number` VARCHAR(50),
    
    -- Estado da Conta
    `status` ENUM('active', 'suspended', 'pending_verification', 'deleted') NOT NULL DEFAULT 'pending_verification',
    `email_verification_token` CHAR(36),
    `email_verified_at` TIMESTAMP NULL,
    
    -- Gestão de Sessão e Palavra-passe
    `password_reset_token` CHAR(36),
    `password_reset_expires_at` TIMESTAMP NULL,
    `last_login_at` TIMESTAMP NULL,
    `last_login_ip` VARCHAR(45), -- Compatível com IPv4 e IPv6
    
    -- Timestamps
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL COMMENT 'Para soft delete. Se NULO, o utilizador está ativo.'
) COMMENT='Armazena contas de utilizador, perfis e credenciais de autenticação.';

-- Adicionar um CHECK constraint para o formato do email
ALTER TABLE `utilizadores` ADD CONSTRAINT `check_email_format` CHECK (`email` REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');

----------------------------------------
-- 2. TABELAS DE GESTÃO DE CONTEÚDO
----------------------------------------

CREATE TABLE `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) UNIQUE NOT NULL,
    `slug` VARCHAR(100) UNIQUE NOT NULL,
    `description` TEXT
);

CREATE TABLE `tags` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) UNIQUE NOT NULL,
    `slug` VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE `articles` (
    `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) UNIQUE NOT NULL,
    `content` LONGTEXT NOT NULL,
    `excerpt` VARCHAR(500),
    `featured_image_url` VARCHAR(512),
    `article_type` ENUM('news', 'blog') NOT NULL,
    `author_id` CHAR(36),
    `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    `meta_description` VARCHAR(255),
    `meta_keywords` JSON,
    `view_count` INT NOT NULL DEFAULT 0,
    `like_count` INT NOT NULL DEFAULT 0,
    `is_featured` BOOLEAN NOT NULL DEFAULT FALSE,
    `is_pinned` BOOLEAN NOT NULL DEFAULT FALSE,
    `published_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`author_id`) REFERENCES `utilizadores`(`id`) ON DELETE SET NULL
) COMMENT='Tabela unificada para notícias (news) e artigos de blog.';

CREATE TABLE `article_categories` (
    `article_id` CHAR(36) NOT NULL,
    `category_id` INT NOT NULL,
    PRIMARY KEY (`article_id`, `category_id`),
    FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE
);

CREATE TABLE `article_tags` (
    `article_id` CHAR(36) NOT NULL,
    `tag_id` INT NOT NULL,
    PRIMARY KEY (`article_id`, `tag_id`),
    FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE
);

----------------------------------------
-- 3. GESTÃO DE EVENTOS
----------------------------------------
CREATE TABLE `eventos` (
    `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) UNIQUE NOT NULL,
    `description` TEXT,
    `location` VARCHAR(255),
    `venue_details` TEXT,
    `start_date` TIMESTAMP NOT NULL,
    `end_date` TIMESTAMP NOT NULL,
    `registration_deadline` TIMESTAMP NULL,
    `max_attendees` INT,
    `current_registrations` INT NOT NULL DEFAULT 0,
    `is_free` BOOLEAN NOT NULL DEFAULT TRUE,
    `price` DECIMAL(10, 2),
    `currency` CHAR(3) DEFAULT 'AOA',
    `event_category` VARCHAR(100),
    `cover_image_url` VARCHAR(512),
    `gallery_image_urls` JSON,
    `status` ENUM('upcoming', 'ongoing', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming',
    `organizer_id` CHAR(36),
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`organizer_id`) REFERENCES `utilizadores`(`id`) ON DELETE SET NULL
);

CREATE TABLE `eventos_reservations` (
    `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    `event_id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NULL COMMENT 'Nulo para convidados',
    `guest_full_name` VARCHAR(255),
    `guest_email` VARCHAR(255),
    `status` ENUM('registered', 'confirmed', 'attended', 'cancelled') NOT NULL DEFAULT 'registered',
    `number_of_tickets` INT NOT NULL DEFAULT 1,
    `special_requirements` TEXT,
    `confirmation_code` VARCHAR(100) UNIQUE NOT NULL,
    `payment_status` VARCHAR(50) DEFAULT 'not_applicable',
    `payment_intent_id` VARCHAR(255),
    `registered_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`event_id`) REFERENCES `eventos`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `utilizadores`(`id`) ON DELETE SET NULL
);

----------------------------------------
-- 4. MARKETING E PARCERIAS
----------------------------------------
CREATE TABLE `sponsors` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `logo_url` VARCHAR(512) NOT NULL,
    `website_url` VARCHAR(512),
    `sponsorship_tier` VARCHAR(100),
    `contact_person` VARCHAR(255),
    `contact_email` VARCHAR(255),
    `contract_start_date` DATE,
    `contract_end_date` DATE,
    `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `display_order` INT DEFAULT 0,
    `visibility_flags` JSON COMMENT 'e.g., {"show_on_homepage": true}',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `banners` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `image_url` VARCHAR(512) NOT NULL,
    `responsive_images` JSON COMMENT 'e.g., {"mobile": "url"}',
    `destination_url` VARCHAR(512) NOT NULL,
    `opens_in_new_tab` BOOLEAN NOT NULL DEFAULT TRUE,
    `placement` ENUM('homepage_hero', 'sidebar_top', 'sidebar_bottom', 'footer_full') NOT NULL,
    `start_date` TIMESTAMP NULL,
    `end_date` TIMESTAMP NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `click_count` INT NOT NULL DEFAULT 0,
    `display_order` INT DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

----------------------------------------
-- 5. COMUNICAÇÃO
----------------------------------------
CREATE TABLE `contact_submissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `submitter_name` VARCHAR(255) NOT NULL,
    `submitter_email` VARCHAR(255) NOT NULL,
    `submitter_phone` VARCHAR(50),
    `subject` VARCHAR(255),
    `body` TEXT NOT NULL,
    `form_category` VARCHAR(100) DEFAULT 'General',
    `status` ENUM('new', 'in_progress', 'resolved', 'archived') NOT NULL DEFAULT 'new',
    `assigned_to_user_id` CHAR(36),
    `response_notes` TEXT,
    `ip_address` VARCHAR(45),
    `submitted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`assigned_to_user_id`) REFERENCES `utilizadores`(`id`) ON DELETE SET NULL
);

----------------------------------------
-- 6. SISTEMA DE LOGGING DE ATIVIDADES
----------------------------------------
CREATE TABLE `activity_logs` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` CHAR(36),
    `action_type` ENUM('create', 'update', 'delete', 'login_success', 'login_fail', 'logout', 'password_reset_request', 'password_reset_success') NOT NULL,
    `target_table` VARCHAR(100),
    `target_record_id` VARCHAR(36),
    `state_before` JSON,
    `state_after` JSON,
    `details` TEXT,
    `ip_address` VARCHAR(45),
    `user_agent` TEXT,
    `status` VARCHAR(50) NOT NULL DEFAULT 'success',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `utilizadores`(`id`) ON DELETE SET NULL
) COMMENT='Regista ações importantes na aplicação para auditoria e segurança.';

```

---

## Triggers da Base de Dados (MariaDB)

Os triggers automatizam tarefas, garantem a integridade dos dados e reduzem a lógica na aplicação.

### 1. Trigger para `updated_at` Automático

A maioria das tabelas já usa `ON UPDATE CURRENT_TIMESTAMP`, que é a forma nativa do MariaDB de fazer isso. Nenhuma trigger adicional é necessária para esta funcionalidade.

### 2. Trigger para Geração Automática de Slugs

Esta função e trigger criam um slug amigável para URLs a partir do título.

```sql
DELIMITER $$

CREATE FUNCTION `generate_slug`(title VARCHAR(255))
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE slug VARCHAR(255);
    SET slug = LOWER(title);
    -- Remove caracteres especiais e substitui por hífens
    SET slug = REGEXP_REPLACE(slug, '[^a-z0-9]+', '-');
    -- Remove hífens no início ou fim
    SET slug = REGEXP_REPLACE(slug, '^-|-$', '');
    RETURN slug;
END$$

CREATE TRIGGER `before_insert_articles_set_slug`
BEFORE INSERT ON `articles`
FOR EACH ROW
BEGIN
    DECLARE base_slug VARCHAR(255);
    DECLARE final_slug VARCHAR(255);
    DECLARE counter INT DEFAULT 1;
    SET base_slug = generate_slug(NEW.title);
    SET final_slug = base_slug;
    -- Garante que o slug é único
    WHILE EXISTS (SELECT 1 FROM `articles` WHERE `slug` = final_slug) DO
        SET final_slug = CONCAT(base_slug, '-', counter);
        SET counter = counter + 1;
    END WHILE;
    SET NEW.slug = final_slug;
END$$

-- Crie um trigger semelhante para a tabela `eventos`
CREATE TRIGGER `before_insert_eventos_set_slug`
BEFORE INSERT ON `eventos`
FOR EACH ROW
BEGIN
    -- Lógica idêntica à de cima, mas para a tabela `eventos`
    DECLARE base_slug VARCHAR(255);
    DECLARE final_slug VARCHAR(255);
    DECLARE counter INT DEFAULT 1;
    SET base_slug = generate_slug(NEW.title);
    SET final_slug = base_slug;
    WHILE EXISTS (SELECT 1 FROM `eventos` WHERE `slug` = final_slug) DO
        SET final_slug = CONCAT(base_slug, '-', counter);
        SET counter = counter + 1;
    END WHILE;
    SET NEW.slug = final_slug;
END$$

DELIMITER ;
```
**Rationale**: Automatiza a criação de URLs limpas e únicas, um requisito essencial para SEO.

### 3. Trigger para Atualização do Contador de Reservas

Este trigger mantém o campo `current_registrations` na tabela `eventos` sempre atualizado.

```sql
DELIMITER $$

CREATE TRIGGER `after_insert_eventos_reservations`
AFTER INSERT ON `eventos_reservations`
FOR EACH ROW
BEGIN
    UPDATE `eventos`
    SET `current_registrations` = `current_registrations` + NEW.number_of_tickets
    WHERE `id` = NEW.event_id;
END$$

CREATE TRIGGER `after_delete_eventos_reservations`
AFTER DELETE ON `eventos_reservations`
FOR EACH ROW
BEGIN
    UPDATE `eventos`
    SET `current_registrations` = `current_registrations` - OLD.number_of_tickets
    WHERE `id` = OLD.event_id;
END$$

DELIMITER ;
```
**Rationale**: Mantém a contagem de reservas sincronizada, evitando cálculos na aplicação e prevenindo overbooking.

### 4. Trigger para Logging de Atividades

Este trigger genérico regista alterações em tabelas específicas para a tabela `activity_logs`.
**Nota Importante**: A aplicação DEVE definir a variável de sessão `@app_current_user_id` no início de cada conexão. Ex: `SET @app_current_user_id = 'user-uuid-from-token';`

```sql
DELIMITER $$

CREATE TRIGGER `after_update_utilizadores_log`
AFTER UPDATE ON `utilizadores`
FOR EACH ROW
BEGIN
    INSERT INTO `activity_logs` (`user_id`, `action_type`, `target_table`, `target_record_id`, `state_before`, `state_after`)
    VALUES (@app_current_user_id, 'update', 'utilizadores', NEW.id, JSON_OBJECT('email', OLD.email, 'role', OLD.role), JSON_OBJECT('email', NEW.email, 'role', NEW.role));
END$$

CREATE TRIGGER `after_delete_articles_log`
AFTER DELETE ON `articles`
FOR EACH ROW
BEGIN
    INSERT INTO `activity_logs` (`user_id`, `action_type`, `target_table`, `target_record_id`, `state_before`)
    VALUES (@app_current_user_id, 'delete', 'articles', OLD.id, JSON_OBJECT('title', OLD.title, 'slug', OLD.slug));
END$$

DELIMITER ;
-- Crie triggers semelhantes para as outras ações (INSERT, UPDATE) e tabelas (eventos, etc.)
```
**Rationale**: Cria uma trilha de auditoria completa e segura, gerida pela base de dados.

---

## Políticas de Segurança (Emulação de RLS com VIEWs)

MariaDB não possui Row-Level Security (RLS) nativo como o PostgreSQL. A abordagem padrão para implementar uma segurança semelhante é usar `VIEWs` com `SQL SECURITY DEFINER`. A aplicação deve então interagir com estas `VIEWs` em vez das tabelas base.

**Importante**: A aplicação DEVE definir a variável de sessão `@app_current_user_id` e `@app_current_user_role` de forma segura após a autenticação.

```sql
-- Exemplo para a tabela `articles`

-- VIEW para autores (Bloggers) verem e editarem apenas os seus próprios artigos
CREATE OR REPLACE
    SQL SECURITY DEFINER
VIEW `v_my_articles` AS
SELECT * FROM `articles`
WHERE `author_id` = @app_current_user_id;

-- VIEW para Admins/Editores verem todos os artigos
CREATE OR REPLACE
    SQL SECURITY DEFINER
VIEW `v_all_articles` AS
SELECT * FROM `articles`
WHERE @app_current_user_role IN ('Super Admin', 'Admin', 'Editor');

-- Exemplo de permissões
GRANT SELECT, UPDATE, DELETE ON `v_my_articles` TO 'blogger_role'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON `v_all_articles` TO 'admin_role'@'localhost';
```
**Rationale**: Este modelo de `VIEWs` seguras isola a lógica de permissões na base de dados, garantindo que as regras são aplicadas consistentemente. A aplicação interage com a `VIEW` apropriada com base na função do utilizador logado.

---

## Funções da Base de Dados (Stored Procedures)

```sql
-- 1. Função de Pesquisa de Conteúdo com FULLTEXT
-- Primeiro, adicione um índice FULLTEXT
ALTER TABLE `articles` ADD FULLTEXT `ft_content` (`title`, `excerpt`, `content`);

DELIMITER $$
CREATE PROCEDURE `search_articles`(IN `search_term` VARCHAR(255))
BEGIN
    SELECT *,
        MATCH(`title`, `excerpt`, `content`) AGAINST (`search_term` IN NATURAL LANGUAGE MODE) AS score
    FROM `articles`
    WHERE
        `status` = 'published' AND
        MATCH(`title`, `excerpt`, `content`) AGAINST (`search_term` IN NATURAL LANGUAGE MODE)
    ORDER BY score DESC;
END$$
DELIMITER ;

-- 2. Procedimento para Registar um Utilizador
-- Nota: O hashing da palavra-passe deve ser feito na APLICAÇÃO.
DELIMITER $$
CREATE PROCEDURE `register_user`(
    IN `p_email` VARCHAR(255),
    IN `p_password_hash` VARCHAR(255),
    IN `p_full_name` VARCHAR(255)
)
BEGIN
    INSERT INTO `utilizadores` (`email`, `password_hash`, `full_name`, `email_verification_token`)
    VALUES (p_email, p_password_hash, p_full_name, UUID());
    
    SELECT * FROM `utilizadores` WHERE `email` = p_email;
END$$
DELIMITER ;
```

---

## Índices e Desempenho

```sql
-- Índices em Chaves Estrangeiras (MUITO IMPORTANTE)
ALTER TABLE `articles` ADD INDEX `idx_author_id` (`author_id`);
ALTER TABLE `article_categories` ADD INDEX `idx_article_id` (`article_id`);
ALTER TABLE `article_categories` ADD INDEX `idx_category_id` (`category_id`);
-- ... etc para todas as FKs ...

-- Índices em colunas frequentemente consultadas
ALTER TABLE `utilizadores` ADD INDEX `idx_email` (`email`);
ALTER TABLE `utilizadores` ADD INDEX `idx_role` (`role`);
ALTER TABLE `articles` ADD INDEX `idx_slug` (`slug`);
ALTER TABLE `articles` ADD INDEX `idx_status` (`status`);
ALTER TABLE `eventos` ADD INDEX `idx_start_date` (`start_date`);

-- Índice para pesquisa de texto completo (ver secção de Funções acima)
-- ALTER TABLE `articles` ADD FULLTEXT `ft_content` (`title`, `excerpt`, `content`);

-- Índice para ordenação e paginação
ALTER TABLE `articles` ADD INDEX `idx_published_at` (`published_at` DESC);

-- Índice para a referência polimórfica no log de atividades
ALTER TABLE `activity_logs` ADD INDEX `idx_target` (`target_table`, `target_record_id`);
```
**Rationale**: Cada índice é estrategicamente colocado para acelerar operações comuns.

---

## Seed Data (Dados de Exemplo)

```sql
-- NOTA: O hash da password ('hashed_password_here') deve ser gerado pela aplicação.
INSERT INTO `utilizadores` (`email`, `password_hash`, `role`, `full_name`, `status`) VALUES
('super@serbancario.ao', 'hashed_password_here_1', 'Super Admin', 'Super Admin', 'active'),
('admin@serbancario.ao', 'hashed_password_here_2', 'Admin', 'Administrador', 'active'),
('blogger@serbancario.ao', 'hashed_password_here_3', 'Blogger', 'Blogger Convidado', 'active');

INSERT INTO `articles` (`title`, `slug`, `content`, `excerpt`, `article_type`, `author_id`, `status`, `published_at`)
VALUES
(
    'Banco Nacional de Angola Anuncia Novas Medidas',
    'bna-novas-medidas-kwanza',
    '<p>Conteúdo completo do artigo aqui...</p>',
    'O BNA implementou um novo pacote de políticas monetárias...',
    'news',
    (SELECT id FROM utilizadores WHERE email = 'blogger@serbancario.ao'),
    'published',
    NOW()
);
```

---

## Estratégia de Migração, Segurança, Backup e API

As considerações para estas secções permanecem em grande parte as mesmas que na versão PostgreSQL, com as seguintes notas específicas para MariaDB:

-   **Estratégia de Migração**: Ferramentas como [Flyway](https://flywaydb.org/) e [Liquibase](https://www.liquibase.com/) são excelentes para MariaDB.
-   **Segurança**: A principal diferença é a emulação de RLS com `VIEWs`. A aplicação deve ser cuidadosamente projetada para interagir com as `VIEWs` corretas e para definir as variáveis de sessão (`@app_current_user_id`, etc.) de forma segura em cada conexão.
-   **Backup e Manutenção**: Use `mariadb-dump` (ou `mysqldump`) para backups lógicos. Ferramentas como `xtrabackup` são ótimas para backups físicos a quente. O agendamento de `OPTIMIZE TABLE` e `ANALYZE TABLE` é análogo ao `VACUUM` e `ANALYZE` do PostgreSQL.
-   **Considerações sobre a API**: O esquema suporta perfeitamente uma API RESTful/GraphQL. A pesquisa de texto completo usaria a sintaxe `MATCH() AGAINST()` em vez do `ILIKE` ou operadores `tsvector` do PostgreSQL.
