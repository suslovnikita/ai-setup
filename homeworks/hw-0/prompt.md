# Промпт 1

## Инициализация проекта

### Backend (Ruby on Rails API)

* Создай новый Rails-проект в режиме API-only:

  * `rails new backend --api -d postgresql`
* Настрой:

  * PostgreSQL (database.yml)
  * RSpec
  * FactoryBot
  * RuboCop (включая rubocop-rails, rubocop-rspec, rubocop-performance)
* Добавь необходимые gems:

  * bcrypt
  * jwt
* Сгенерируй базовую структуру:

  * User model

### Frontend (Next.js)

* Создай приложение:

  * `npx create-next-app@latest frontend`
* Включи:

  * TypeScript
  * App Router
* Настрой:

  * Tailwind CSS
* Подготовь базовую структуру:

  * `/app`
  * `/components`
  * `/lib`

---

## Шаг 2. Реализация JWT аутентификации

### Backend (Rails API)

* Реализовать:

  * User (email + password_digest, has_secure_password)
  * Эндпоинты:

    * `POST /api/auth/signup`
    * `POST /api/auth/login`
* JWT:

  * Сервис для encode/decode токенов
  * Секрет хранить в ENV
* Аутентификация:

  * before_action :authorize_request
  * current_user
* Возвращать токен при логине/регистрации
* Добавить request specs (RSpec + FactoryBot)

---

### Frontend (Next.js)

* Реализовать:

  * Страницы: login, signup
  * AuthProvider (context)
* Логика:

  * Сохранение JWT
  * Добавление Authorization header
  * logout
  * проверка авторизации
* Защищённые роуты (redirect если не залогинен)

---

## Шаг 3. Интеграция

* Настроить CORS в Rails
* Настроить base API URL
* Проверить полный flow:
  signup → login → доступ к защищённому роуту

---

## Ограничения

* Строго следовать CLAUDE.MD
* Не добавлять лишние зависимости
* Вся бизнес-логика должна быть в Rails
* Код должен быть чистым и соответствовать RuboCop

# Промпт 2+. Коррекции

* добавь .gitignore файл и проанализируй и запиши туда все временные папки/файлы из backend/frontend
* добавь dev/test пользователей для базы данных/ и запиши их креды в соответствующие .env файлы
* прогони этап с созданием бд и миграциями  
* создай пользователей, если не получается, разберись, почему. докер образ с пг поднят
* подними всю инфру для дев
* не прогоняются тесты, исправь
* запускаю в backend rspec, падает с ActiveRecord::ConnectionNotEstablished:
  connection to server at "::1", port 5432 failed: fe_sendauth: no password supplied
