import { useState } from 'react'

function App() {
  const [page, setPage] = useState('home')
  const [game, setGame] = useState(null)

  const goToGame = (gameName) => {
    setGame(gameName)
    setPage('game')
  }

  const renderPage = () => {
    switch(page) {
      case 'game':
        return <GamePage game={game} setPage={setPage} />
      default:
        return <HomePage setPage={setPage} goToGame={goToGame} />
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo" onClick={() => { setPage('home'); setGame(null) }}>🎮 GamerHub</h1>
      </nav>

      <main className="main-content">
        {renderPage()}
      </main>

      <div className="bottom-buttons">
        <a href="https://matcherino.com/support" className="support-btn" target="_blank">Support</a>
        <button onClick={() => { setPage('home'); setGame(null) }} className="home-btn">🏠 На главную</button>
      </div>
    </div>
  )
}

// === ГЛАВНАЯ СТРАНИЦА ===
function HomePage({ setPage, goToGame }) {
  const games = [
    { name: 'Brawl Stars', icon: '🏆', color: '#ff7b00', desc: 'Турниры, Matcherino, гайды и мета' },
    { name: 'Майнкрафт', icon: '⛏️', color: '#5e9e3a', desc: 'Ресурспаки, моды, постройки и редстоун' },
    { name: 'Стандофф 2', icon: '🔫', color: '#d43f1a', desc: 'Гайды, донаты, карты и новости' }
  ]

  return (
    <div className="page">
      <div className="hero">
        <h1>Добро пожаловать в GamerHub! 🎮</h1>
        <p>Всё для игроков: новости, гайды, донаты и общение</p>
      </div>

      <h2 className="section-title">🎲 Игры на сайте</h2>
      <div className="games-grid">
        {games.map(game => (
          <div key={game.name} className="game-card" style={{ borderBottom: `4px solid ${game.color}` }} onClick={() => goToGame(game.name)}>
            <div className="game-icon">{game.icon}</div>
            <h3>{game.name}</h3>
            <p>{game.desc}</p>
            <span className="game-link">Перейти в раздел →</span>
          </div>
        ))}
      </div>

      <h2 className="section-title">📰 Новости сайта</h2>
      <div className="news-list">
        <div className="news-item">
          <span className="news-date">16.06.2026</span>
          <h3>🎉 Добро пожаловать на GamerHub!</h3>
          <p>Мы запустили сайт с разделами по Brawl Stars, Майнкрафт и Стандофф 2. Добавляйте в закладки!</p>
        </div>
        <div className="news-item">
          <span className="news-date">15.06.2026</span>
          <h3>🏆 Новый турнир Matcherino в Brawl Stars</h3>
          <p>Призовой фонд $500 и эксклюзивные пины. Регистрация открыта!</p>
        </div>
      </div>
    </div>
  )
}

// === СТРАНИЦА ИГРЫ ===
function GamePage({ game, setPage }) {
  if (game === 'Brawl Stars') return <BrawlStarsPage setPage={setPage} />
  if (game === 'Майнкрафт') return <MinecraftPage setPage={setPage} />
  if (game === 'Стандофф 2') return <StandoffPage setPage={setPage} />
  return <div>Страница не найдена</div>
}

// === BRAWL STARS ===
function BrawlStarsPage({ setPage }) {
  const [activeSection, setActiveSection] = useState('main')

  if (activeSection !== 'main') {
    return <BrawlStarsSubSection section={activeSection} setActiveSection={setActiveSection} />
  }

  const sections = [
    { id: 'matcherino', icon: '🏆', title: 'Matcherino турниры', desc: 'Пины, донаты и турниры' },
    { id: 'discord', icon: '💬', title: 'Discord сервер', desc: 'Общение и поиск команды' },
    { id: 'donate', icon: '💰', title: 'Проверенные сайты доната', desc: 'Безопасные сервисы' },
    { id: 'news', icon: '📰', title: 'Новости Brawl Stars', desc: 'Патчи, ивенты, обновления' },
    { id: 'guides', icon: '📖', title: 'Гайды на бравлеров', desc: 'Советы и билды' },
    { id: 'meta', icon: '📊', title: 'Мета бравлеров', desc: 'Актуальный тир-лист' }
  ]

  return (
    <div className="page">
      <button className="back-btn" onClick={() => setPage('home')}>← Назад к играм</button>
      <h1>🏆 Brawl Stars</h1>
      <div className="game-sections">
        {sections.map(s => (
          <div key={s.id} className="section-card" onClick={() => setActiveSection(s.id)}>
            <div className="section-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function BrawlStarsSubSection({ section, setActiveSection }) {
  const content = {
    matcherino: {
      title: '🏆 Matcherino турниры',
      body: <>
        <p><strong>Как получить эксклюзивные пины?</strong></p>
        <div className="steps"><div className="step">1️⃣ Зарегистрируйся через Supercell ID</div><div className="step">2️⃣ Найди турнир с пином</div><div className="step">3️⃣ Пополни призовой фонд от $2.50</div><div className="step">4️⃣ Получи пин в течение 14 дней</div></div>
        <a href="https://matcherino.com" className="donate-link" target="_blank">Перейти на Matcherino →</a>
      </>
    },
    discord: {
      title: '💬 Discord сервер',
      body: <><p>Присоединяйся к нашему Discord-серверу для поиска команды, общения и обсуждения турниров!</p><a href="https://discord.gg/ваша_ссылка" className="discord-link" target="_blank">Присоединиться →</a></>
    },
    donate: {
      title: '💰 Проверенные сайты доната',
      body: <><p><strong>Безопасные сервисы для пополнения:</strong></p><ul><li>Matcherino — официальный донат на турниры</li><li>FunPay — донат за внутриигровые предметы</li><li>DonationAlerts — для стримеров</li></ul><p className="note">⚠️ Используйте только проверенные сайты!</p></>
    },
    news: {
      title: '📰 Новости Brawl Stars',
      body: <>
        <div className="news-item"><span className="news-date">16.06.2026</span><h3>Балансный патч</h3><p>Изменены характеристики Спайка и Леона</p></div>
        <div className="news-item"><span className="news-date">15.06.2026</span><h3>Новый сезон "Киберпанк"</h3><p>Новые скины и ивенты</p></div>
      </>
    },
    guides: {
}

function MinecraftSubSection({ section, setActiveSection }) {
  const content = {
    resources: {
      title: '🎨 Ресурспаки / Моды / Карты',
      body: <>
        <p><strong>Скачать и установить:</strong></p>
        <ul>
          <li><a href="#">Faithful 64x64 — ресурспак</a></li>
          <li><a href="#">OptiFine — мод для оптимизации</a></li>
          <li><a href="#">Карта "Skyblock v4"</a></li>
          <li><a href="#">X-Ray пак — для поиска руд</a></li>
        </ul>
        <p className="note">📁 Все ссылки проверены на вирусы</p>
      </>
    },
    redstone: {
      title: '🔴 Гайды на редстоун',
      body: <>
        <p><strong>Популярные схемы:</strong></p>
        <ul>
          <li>Автоматическая ферма пшеницы</li>
          <li>Поршневой лифт</li>
          <li>Калькулятор на редстоуне</li>
          <li>Потайная дверь</li>
        </ul>
        <p className="note">🎥 Видео-гайды в нашем Discord</p>
      </>
    },
    donate: {
      title: '💰 Проверенные сайты доната',
      body: <>
        <p><strong>Безопасные сервисы:</strong></p>
        <ul>
          <li>LetyShops — донат через бонусы</li>
          <li>FunPay — покупка предметов</li>
          <li>DonationAlerts — для серверов</li>
        </ul>
        <p className="note">⚠️ Не вводите пароль от аккаунта на сторонних сайтах!</p>
      </>
    },
    news: {
      title: '📰 Новости Майнкрафт',
      body: <>
        <div className="news-item"><span className="news-date">16.06.2026</span><h3>Анонс Minecraft 1.21</h3><p>Новые мобы и биомы уже в разработке</p></div>
        <div className="news-item"><span className="news-date">10.06.2026</span><h3>Новый ресурспак от сообщества</h3><p>Вышел популярный обновлённый ресурспак Faithful 64x</p></div>
      </>
    }
  }

  const current = content[section]

  return (
    <div className="page">
      <button className="back-btn" onClick={() => setActiveSection('main')}>← Назад к разделам</button>
      <h1>{current.title}</h1>
      <div className="subsection-content">{current.body}</div>
    </div>
  )
}

// === СТАНДОФФ 2 ===
function StandoffPage({ setPage }) {
  const [activeSection, setActiveSection] = useState('main')

  if (activeSection !== 'main') {
    return <StandoffSubSection section={activeSection} setActiveSection={setActiveSection} />
  }

  const sections = [
    { id: 'donate', icon: '💰', title: 'Проверенные сайты доната', desc: 'Безопасные сервисы' },
    { id: 'guides', icon: '🗺️', title: 'Подсады и гайды на картах', desc: 'Стратегии и тактики' },
    { id: 'news', icon: '📰', title: 'Новости Стандофф 2', desc: 'Обновления и ивенты' }
  ]

  return (
    <div className="page">
      <button className="back-btn" onClick={() => setPage('home')}>← Назад к играм</button>
      <h1>🔫 Стандофф 2</h1>
      <div className="game-sections">
        {sections.map(s => (
          <div key={s.id} className="section-card" onClick={() => setActiveSection(s.id)}>
            <div className="section-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function StandoffSubSection({ section, setActiveSection }) {
  const content = {
    donate: {
      title: '💰 Проверенные сайты доната',
      body: <>
        <p><strong>Безопасные сервисы:</strong></p>
        <ul>
          <li>FunPay — покупка скинов и оружия</li>
          <li>MMОGР — внутриигровая валюта</li>
          <li>Plati.market — донат от проверенных продавцов</li>
        </ul>
        <p className="note">⚠️ Покупайте только у продавцов с высоким рейтингом</p>
      </>
    },
    guides: {
      title: '🗺️ Подсады и гайды на картах',
      body: <>
        <p><strong>Карта "Завод":</strong> лучшие позиции для снайпера — верхняя бочка и ангар.</p>
        <p><strong>Карта "Город":</strong> тактика для штурма здания администрации.</p>
        <p><strong>Карта "Порт":</strong> скрытные пути за спину врага.</p>
        <p className="note">🎥 Ещё больше гайдов на нашем Discord-сервере</p>
      </>
    },
    news: {
      title: '📰 Новости Стандофф 2',
      body: <>
        <div className="news-item"><span className="news-date">16.06.2026</span><h3>Новогоднее обновление</h3><p>Новые скины и режим "Битва в снегу"</p></div>
        <div className="news-item"><span className="news-date">10.06.2026</span><h3>Баланс оружия</h3><p>Изменена точность AK-47 и M4</p></div>
      </>
    }
  }

  const current = content[section]

  return (
    <div className="page">
      <button className="back-btn" onClick={() => setActiveSection('main')}>← Назад к разделам</button>
      <h1>{current.title}</h1>
      <div className="subsection-content">{current.body}</div>
    </div>
  )
}

export default App