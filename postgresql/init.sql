
-- init.sql 사용안함. 
-- 각 서비스에서 직접 테이블 생성 및 초기화 수행

-- 스키마 생성 
-- docker-compose.yml의 PG_DATABASE 값인 "Southbottle"을 직접 사용합니다.
CREATE SCHEMA IF NOT EXISTS Southbottle;

-- sbuser 에게 Southbottle 스키마에 대한 권한 부여
GRANT USAGE ON SCHEMA Southbottle TO sbuser;
GRANT CREATE ON SCHEMA Southbottle TO sbuser;
-- init.sql 파일에 다음 내용을 추가합니다.

-- sbuser 사용자의 기본 검색 경로를 'Southbottle' 스키마로 설정합니다.
-- PostgreSQL은 이제 'public' 스키마보다 'Southbottle' 스키마를 먼저 확인합니다.
-- 설정하지 않으면 public -> Southbottle 순으로 public에 테이블이 없으면 오류 발생
-- 또는 select * from  Southbottle.user 형식으로 바꿔야함.
-- ALTER ROLE sbuser SET search_path TO Southbottle, public;

-- 테이블 생성: users
CREATE TABLE IF NOT EXISTS Southbottle.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 테이블 생성: posts
CREATE TABLE IF NOT EXISTS Southbottle.posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES Southbottle.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- products 테이블
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- orders 테이블 (items 필드는 JSONB 타입)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    items JSONB NOT NULL,
    total DECIMAL(10, 2) NOT NULL
);


-- 초기 데이터 삽입
INSERT INTO Southbottle.users (username, email) VALUES ('admin', 'admin@example.com');

INSERT INTO Southbottle.posts (title, content, user_id) VALUES
('첫 번째 게시물', '안녕하세요', 1),
('두 번째 게시물', 'Node.js는 멋져요', 1);