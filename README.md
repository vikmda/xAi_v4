# AI Sexter Bot - Универсальный ИИ-бот для чатов

## 🚀 Обзор

Универсальная система ИИ-бота для работы с различными чат-платформами через ZennoPoster. Система поддерживает:

- **Многоязычность** - русский, английский и другие языки
- **Персонализация** - настройка персонажей через JSON файлы
- **Обучение** - ручное обучение и система рейтингов
- **Статистика** - подробная аналитика работы
- **Универсальность** - легкая адаптация к любым чат-платформам

## 📁 Структура проекта

```
/app/
├── backend/                    # FastAPI сервер
│   ├── server.py              # Основной сервер
│   ├── models/                # JSON файлы персонажей
│   │   ├── rus_girl_1.json   # Русская девушка 1
│   │   ├── rus_girl_2.json   # Русская девушка 2
│   │   └── eng_girl_1.json   # Английская девушка 1
│   ├── requirements.txt       # Зависимости Python
│   └── .env                   # Переменные окружения
├── frontend/                  # React панель управления
│   ├── src/
│   │   ├── App.js            # Основное приложение
│   │   └── App.css           # Стили
│   └── package.json          # Зависимости Node.js
└── zenno_bot.js              # Универсальный JS для ZennoPoster
```

## 🔧 API Эндпоинты

### Основные эндпоинты:

- `POST /api/chat` - Основной чат с ИИ
- `POST /api/test` - Тестирование модели
- `POST /api/rate` - Оценка ответов (1-10)
- `POST /api/train` - Ручное обучение
- `GET /api/models` - Список доступных моделей
- `GET /api/statistics` - Статистика системы
- `GET /api/health` - Проверка здоровья системы

### Формат запроса к чату:

```json
{
  "model": "rus_girl_1",
  "user_id": "user123",
  "message": "Привет!"
}
```

### Формат ответа:

```json
{
  "response": "Приветик! Как дела? 😘",
  "message_number": 1,
  "is_semi": false,
  "is_last": false,
  "emotion": "flirty",
  "model_used": "rus_girl_1"
}
```

## 🎭 Настройка персонажей

Каждый персонаж описывается JSON файлом в папке `backend/models/`:

```json
{
  "name": "Анна",
  "age": 23,
  "country": "Россия",
  "city": "Москва",
  "language": "ru",
  "interests": ["фотография", "путешествия"],
  "mood": "игривое",
  "message_count": 5,
  "semi_message": "Хочешь увидеть мои фото? 📸",
  "final_message": "Переходи в мой телеграм @anna_model 😘",
  "learning_enabled": true,
  "response_length": 15,
  "use_emoji": true,
  "personality_traits": ["flirty", "playful", "sweet"]
}
```

## 📱 Веб-панель управления

Доступна по адресу: `https://your-domain.com`

### Функции:

1. **Выбор модели** - Выпадающий список всех персонажей
2. **Тестирование** - Тестирование ответов с оценкой 1-10
3. **Обучение** - Ручное добавление пар вопрос-ответ
4. **Статистика** - Подробная аналитика работы системы

### Статистика включает:
- Общее количество диалогов и пользователей
- Статус системы и подключений
- Статистику по моделям
- Популярные ответы
- Проблемные вопросы (низкий рейтинг)

## 🤖 Использование с ZennoPoster

### 1. Настройка переменных:

```javascript
{-Variable.chatAuth-}    // Токен авторизации чата
{-Variable.model-}       // Название модели (rus_girl_1, eng_girl_1, etc.)
```

### 2. Пример использования:

```javascript
// Установите переменные в ZennoPoster:
// chatAuth = "your_chat_token"
// model = "rus_girl_1"
```

### 3. Логика работы:

1. Бот подключается к чату через WebSocket
2. Получает сообщения от пользователей
3. Отправляет запросы к ИИ с выбранной моделью
4. Продолжает диалог до появления ссылки/TG в ответе
5. Завершает диалог при обнаружении триггера

## 🔄 Алгоритм работы

1. **Подключение** - Бот подключается к чату
2. **Диалог** - Получение сообщений и генерация ответов
3. **Анализ** - Проверка ответа на триггеры завершения
4. **Завершение** - Окончание диалога при обнаружении ссылки/TG
5. **Статистика** - Сохранение данных в базу

## 🌐 Поддерживаемые языки

- **Русский** (ru) - Полная поддержка
- **Английский** (en) - Полная поддержка
- Другие языки добавляются через JSON конфигурацию

## 📊 База данных

Используется MongoDB для хранения:

- **conversations** - История диалогов
- **ratings** - Оценки ответов
- **trained_responses** - Обученные ответы
- **statistics** - Статистические данные

## 🛠️ Разработка

### Добавление новой модели:

1. Создайте JSON файл в `backend/models/`
2. Настройте параметры персонажа
3. Перезапустите сервер
4. Модель автоматически появится в списке

### Настройка для нового чата:

1. Скопируйте `zenno_bot.js`
2. Измените WebSocket URL и события
3. Настройте обработчики сообщений
4. Выберите нужную модель

## 🚀 Запуск

```bash
# Backend
cd backend
python server.py

# Frontend
cd frontend
npm start
```

## 📝 Примеры использования

### Для российского сайта знакомств:
```javascript
CONFIG.model = "rus_girl_1";
```

### Для международного сайта:
```javascript
CONFIG.model = "eng_girl_1";
```

### Для специализированного чата:
```javascript
CONFIG.model = "rus_girl_2";
```

## 🔐 Безопасность

- Все запросы к ИИ идут через локальную сеть
- Нет передачи конфиденциальных данных
- Система работает автономно

## 📈 Мониторинг

Используйте эндпоинт `/api/health` для мониторинга:

```json
{
  "status": "healthy",
  "database": true,
  "models_loaded": 3,
  "active_conversations": 12
}
```

## 🤝 Поддержка

Система полностью автономна и не требует внешних зависимостей для работы ИИ.

---

**Система готова к использованию!** 🎉
