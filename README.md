# 🔮 Что внутри?

- ⚡ [Vite](https://vitejs.dev/) - Инструменты следующего поколения для фронтенд-разработки.
  - 📦 [Imagemin](https://github.com/vbenjs/vite-plugin-imagemin) - Плагин для сжатия изображений.
  - 📦 [Vite Plugin HTML](https://github.com/vbenjs/vite-plugin-html) - Плагин для обработки HTML с минификацией.
- 🌟 [React](https://reactjs.org/) - Библиотека JavaScript для создания пользовательских интерфейсов.
- 🔀 [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview) - Декларативный роутинг для приложений на React любого масштаба.
- 💜 [TypeScript](https://www.typescriptlang.org/) - Надмножество JavaScript.
- 🎨 [Tailwind](https://tailwindcss.com/) - Фреймворк CSS, основанный на классах.
- ⚙️ [Babel](https://babeljs.io/) с [preset-env](https://babeljs.io/docs/en/babel-preset-env) - Компилятор для следующего поколения JavaScript.
- 💅 [Prettier](https://prettier.io/) - Форматировщик кода с определенными настройками.
- 🔍 [ESLint](https://eslint.org/) - Инструмент для идентификации и отчета о шаблонах в коде ECMAScript/JavaScript.
  - 📦 [Simple Import Sort](https://github.com/lydell/eslint-plugin-simple-import-sort/) - Простая автоматическая сортировка импортов.
  - 📦 [Import Plugin](https://github.com/benmosher/eslint-plugin-import/) - Правила, которые помогают валидировать правильные импорты.
  - 📦 [Tailwind Plugin](https://github.com/francoismassart/eslint-plugin-tailwindcss/) - Плагин для использования Tailwind CSS.
  - И еще несколько правил, связанных с ES2015+.
- 🐶 [Husky](https://github.com/typicode/husky) - Простые гит-хуки.
  - 🪝 commit-msg
  - 🪝 pre-commit
- 🚫 [Lint Staged](https://github.com/okonet/lint-staged) - Запуск линтеров на файлы, которые находятся в стейдже git.
- ✍️ [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) с 🎉 [Gitmoji](https://gitmoji.dev/) - Спецификация для добавления человекочитаемого и машинно-читаемого значения в сообщения коммитов.
- 🚦 [GitHub Actions](https://github.com/features/actions) -  Автоматизируйте свой рабочий процесс на GitHub.
- 🔺 [Vercel](https://vercel.com/) - Разверните свое приложение на Vertical.



<!-- GETTING STARTED -->

# 🚀 Начало работы

## 🚨 Предварительные требования

Вам понадобятся эти технологии:

- [Node 16>=](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads/)
- [Vercel Account](https://vercel.com/signup)
- [Vercel CLI](https://vercel.com/cli)
- [Gitmoji CLI](https://github.com/carloscuesta/gitmoji-cli#install)

## 💻 Запуск локально

1.  Клонируйте весь репозиторий.

```bash
git clone https://github.com/mospolytech-finapp/web.git
```

2. Перейдите в директорию проекта.

```bash
cd web
```

3. Install dependencies.

```bash
npm install
```

4. Запустите сервер.

```bash
npm run dev
```

## 🐕‍🦺 Настройка Husky

1. Запустите команду Husky.

```bash
npx --yes husky install
```

2. Используйте Gitmoji CLI для коммита изменений.

```bash
gitmoji -c
```

3. Напишите свои коммиты, следуя правилам [Conventional Commit](https://github.com/Drumpy/vrttv-boilerplate#-conventional-commit-rules). Примеры:

```bash
feat: added navbar component
```

```bash
fix(navbar): fixed all the broken links
```

### 📜 Правила конвенциональных коммитов

Используйте эту таблицу в качестве справочника при написании коммитов. Husky будет проверять соответствие правилам.

| Тип коммита | Название                 | Описание                                                                                                    |
| ----------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `feat`      | Features                 | Добавление новой функциональности или возможности.                                                          |
| `fix`       | Bug Fixes                | Исправление ошибки.                                                                                         |
| `docs`      | Documentation            | Изменения только в документации.                                                                            |
| `style`     | Styles                   | Изменения, которые не влияют на смысл кода (отступы, форматирование, пропущенные точки с запятой и т.д.).   |
| `refactor`  | Code Refactoring         | Изменения в коде, которые не исправляют ошибки и не добавляют функциональности.                             |
| `perf`      | Performance Improvements | Изменения в коде, которые улучшают производительность.                                                      |
| `test`      | Tests                    | Добавление недостающих тестов или исправление существующих тестов.                                          |
| `build`     | Builds                   | Изменения, которые влияют на систему сборки или внешние зависимости (например, gulp, broccoli, npm).        |
| `ci`        | Continuous Integrations  | Изменения в нашей конфигурации CI-системы или скриптах (например, Travis, Circle, BrowserStack, SauceLabs). |
| `chore`     | Chores                   | Другие изменения, которые не изменяют файлы src или test.                                                   |
| `revert`    | Reverts                  | Отменяет предыдущий коммит.                                                                                 |



<p align="right">(<a href="#top">back to top</a>)</p>
