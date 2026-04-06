См. PROJECT.md для описания проекта.

## Stack

TypeScript, Next.js (App Router), React, Ruby on Rails 8.1 (API), PostgreSQL 15, RSpec, FactoryBot, RuboCop, Playwright

## Key commands

* `npm run dev` — запуск фронтенда
* `bin/dev` — запуск Rails API
* `npm run test` — тесты фронтенда
* `bundle exec rspec` — тесты бэкенда
* `bundle exec rubocop` — статический анализ кода
* `bin/rails db:migrate` — миграции

## Conventions

* Использовать TypeScript везде на фронтенде (strict mode)

* Использовать Next.js App Router и Server Components

* Фронтенд и бэкенд разделены: Next.js (UI) + Rails (API)

* Взаимодействие через REST API (JSON)

* Rails использовать в режиме API-only

* Бизнес-логика:

  * Frontend → минимальная, только UI/состояние
  * Backend → вся основная логика в Rails (models/services)

* Структура Rails:

  * controllers → обработка HTTP-запросов
  * models → бизнес-логика и работа с данными
  * services → сложная бизнес-логика
  * serializers → формирование JSON-ответов (если используется)

* Тестирование (RSpec + FactoryBot):

  * Использовать RSpec для всех типов тестов (models, requests, services)
  * Использовать FactoryBot для создания тестовых данных
  * Фабрики хранить в `/spec/factories`
  * Не использовать реальные данные — только фабрики
  * Тесты должны быть изолированными и детерминированными

* Статический анализ (RuboCop):

  * Следовать стандартному стилю Ruby (community style guide)
  * Использовать:

    * rubocop
    * rubocop-rails
    * rubocop-rspec
    * rubocop-performance
  * Исправлять предупреждения перед коммитом

* Работа с БД:

  * Использовать ActiveRecord
  * Все изменения схемы только через миграции

* Аутентификация:

  * JWT

* Переменные окружения:

  * `.env` (frontend)
  * Rails credentials / ENV (backend)

* Нейминг:

  * camelCase (frontend)
  * snake_case (backend)
  * PascalCase для React-компонентов и Ruby-классов

* Стили:

  * Tailwind CSS (frontend)

* Получение данных:

  * Frontend → через fetch/axios к Rails API
  * Избегать лишнего клиентского состояния

## Constraints

* Не добавлять новые зависимости (npm или gems) без явного разрешения
* Не изменять схему базы данных без миграций Rails
* Не писать тесты без использования FactoryBot
* Не игнорировать ошибки RuboCop
* Не игнорировать упавшие тесты Rspec
* Не смешивать бизнес-логику между фронтендом и бэкендом
* Не сохранять чуствительные данные/секреты/креды в git
* Не хранить секреты в коде (использовать env/credentials)
* Не использовать `any` в TypeScript без крайней необходимости
* Не обходить валидации моделей Rails
* Не менять структуру Next.js или Rails без явного указания
* Не вызывать внешние API без документирования
* Не реализовывать логику на фронтенде, если она должна быть на бэкенде
