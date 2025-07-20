import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Компонент для выбора модели
const ModelSelector = ({ models, selectedModel, onModelChange }) => {
  return (
    <div className="flex-1 mr-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Выберите модель персонажа:
      </label>
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Выберите модель...</option>
        {models.map((model) => (
          <option key={model.name} value={model.name}>
            {model.display_name} ({model.language.toUpperCase()}) - {model.country}
          </option>
        ))}
      </select>
    </div>
  );
};

// Компонент для тестирования
const TestComponent = ({ selectedModel }) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    if (!selectedModel || !message.trim()) return;
    
    setLoading(true);
    try {
      const res = await axios.post(`${API}/test`, {
        message: message.trim(),
        model: selectedModel
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Ошибка тестирования:', error);
      setResponse('Ошибка при получении ответа');
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async () => {
    if (!response || !message.trim()) return;
    
    try {
      await axios.post(`${API}/rate`, {
        user_id: 'test_user',
        message: message.trim(),
        response: response,
        rating: rating,
        model: selectedModel
      });
      alert('Рейтинг сохранен!');
    } catch (error) {
      console.error('Ошибка рейтинга:', error);
      alert('Ошибка при сохранении рейтинга');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Тестирование модели</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Введите сообщение:
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Привет, как дела?"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && handleTest()}
        />
      </div>

      <button
        onClick={handleTest}
        disabled={!selectedModel || !message.trim() || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 mb-4"
      >
        {loading ? 'Тестирование...' : 'Тестировать'}
      </button>

      {response && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ответ модели:
          </label>
          <div className="p-3 bg-gray-100 rounded-md">
            {response}
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Оценка (1-10):
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium">{rating}</span>
            <button
              onClick={handleRating}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              Оценить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Компонент для ручного обучения
const TrainingComponent = ({ selectedModel }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [priority, setPriority] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleTrain = async () => {
    if (!selectedModel || !question.trim() || !answer.trim()) return;
    
    setLoading(true);
    try {
      await axios.post(`${API}/train`, {
        question: question.trim(),
        answer: answer.trim(),
        model: selectedModel,
        priority: priority
      });
      alert('Обучающие данные сохранены!');
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error('Ошибка обучения:', error);
      alert('Ошибка при сохранении обучающих данных');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Ручное обучение</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Вопрос:
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Как дела?"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ответ:
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Отлично, спасибо! А у тебя как дела?"
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">
          Приоритет (1-10):
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={priority}
          onChange={(e) => setPriority(parseInt(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm font-medium">{priority}</span>
      </div>

      <button
        onClick={handleTrain}
        disabled={!selectedModel || !question.trim() || !answer.trim() || loading}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400"
      >
        {loading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </div>
  );
};

// Компонент статистики
const StatisticsComponent = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const response = await axios.get(`${API}/statistics`);
      setStats(response.data);
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Загрузка статистики...</div>;
  if (!stats) return <div>Ошибка загрузки статистики</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Статистика системы</h3>
      
      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900">Всего диалогов</h4>
          <p className="text-2xl font-bold text-blue-600">{stats.total_conversations}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-900">Всего пользователей</h4>
          <p className="text-2xl font-bold text-green-600">{stats.total_users}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium text-purple-900">Активных моделей</h4>
          <p className="text-2xl font-bold text-purple-600">{stats.system_status.models_loaded}</p>
        </div>
      </div>

      {/* Статус системы */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Статус системы</h4>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${stats.system_status.database_connected ? 'text-green-600' : 'text-red-600'}`}>
            <div className={`w-3 h-3 rounded-full ${stats.system_status.database_connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            База данных
          </div>
          <div className="text-blue-600">
            Активных диалогов: {stats.system_status.active_conversations}
          </div>
        </div>
      </div>

      {/* Статистика по моделям */}
      {stats.models_stats && stats.models_stats.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-2">Статистика по моделям</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Модель</th>
                  <th className="px-4 py-2 text-left">Диалоги</th>
                  <th className="px-4 py-2 text-left">Средний рейтинг</th>
                </tr>
              </thead>
              <tbody>
                {stats.models_stats.map((model, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{model._id}</td>
                    <td className="px-4 py-2">{model.conversations}</td>
                    <td className="px-4 py-2">{model.avg_rating ? model.avg_rating.toFixed(1) : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Топ ответов */}
      {stats.top_responses && stats.top_responses.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-2">Популярные ответы</h4>
          <div className="space-y-2">
            {stats.top_responses.slice(0, 5).map((response, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm truncate">{response._id}</span>
                <span className="text-sm font-medium">{response.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Проблемные вопросы */}
      {stats.problem_questions && stats.problem_questions.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Проблемные вопросы (низкий рейтинг)</h4>
          <div className="space-y-2">
            {stats.problem_questions.slice(0, 3).map((item, index) => (
              <div key={index} className="p-2 bg-red-50 rounded">
                <div className="text-sm text-red-800">
                  <strong>Вопрос:</strong> {item.message}
                </div>
                <div className="text-sm text-red-600">
                  <strong>Ответ:</strong> {item.response}
                </div>
                <div className="text-sm text-red-500">
                  Рейтинг: {item.rating}/10 | Модель: {item.model}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={loadStatistics}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Обновить статистику
      </button>
    </div>
  );
};

// Основной компонент
const App = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [activeTab, setActiveTab] = useState('test');
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({ auto_save: true });
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    loadModels();
    loadSettings();
  }, []);

  // Убираем автосохранение - пользователь хочет кнопку мгновенного сохранения

  const loadModels = async () => {
    try {
      const response = await axios.get(`${API}/models`);
      setModels(response.data.models);
      if (response.data.models.length > 0) {
        setSelectedModel(response.data.models[0].name);
      }
    } catch (error) {
      console.error('Ошибка загрузки моделей:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await axios.get(`${API}/settings`);
      setSettings(response.data);
      if (response.data.default_model) {
        setSelectedModel(response.data.default_model);
      }
    } catch (error) {
      console.error('Ошибка загрузки настроек:', error);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      await axios.post(`${API}/settings`, newSettings);
      setSaveStatus('Настройки сохранены ✓');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error);
      setSaveStatus('Ошибка сохранения ✗');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleModelChange = (modelName) => {
    setSelectedModel(modelName);
  };

  const handleSaveSettings = async () => {
    const newSettings = { 
      default_model: selectedModel,
      auto_save: false  // Убираем автосохранение
    };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const toggleAutoSave = () => {
    // Эта функция больше не нужна, но оставляем для совместимости
    const newAutoSave = !settings.auto_save;
    const newSettings = { ...settings, auto_save: newAutoSave };
    setSettings(newSettings);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            AI Sexter Bot Panel
          </h1>
          <p className="text-gray-600">
            Универсальная панель управления ИИ-ботом
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Панель настроек */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center justify-between">
              <ModelSelector
                models={models}
                selectedModel={selectedModel}
                onModelChange={handleModelChange}
              />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.auto_save}
                    onChange={toggleAutoSave}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Автосохранение</span>
                </label>
                {saveStatus && (
                  <div className={`text-sm font-medium ${saveStatus.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                    {saveStatus}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Табы */}
          <div className="mb-6">
            <nav className="flex space-x-1 bg-white rounded-lg p-1">
              <button
                onClick={() => setActiveTab('test')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                  activeTab === 'test'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Тестирование
              </button>
              <button
                onClick={() => setActiveTab('training')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                  activeTab === 'training'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Обучение
              </button>
              <button
                onClick={() => setActiveTab('statistics')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                  activeTab === 'statistics'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Статистика
              </button>
            </nav>
          </div>

          {/* Контент табов */}
          {activeTab === 'test' && <TestComponent selectedModel={selectedModel} />}
          {activeTab === 'training' && <TrainingComponent selectedModel={selectedModel} />}
          {activeTab === 'statistics' && <StatisticsComponent />}
        </div>
      </div>
    </div>
  );
};

export default App;