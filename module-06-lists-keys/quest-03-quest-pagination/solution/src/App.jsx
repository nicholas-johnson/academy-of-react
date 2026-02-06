import { useState } from 'react'
import './App.css'

const QUESTS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Quest ${i + 1}: ${['Retrieve', 'Defeat', 'Explore', 'Defend', 'Investigate'][i % 5]} the ${['Dragon', 'Temple', 'Forest', 'Village', 'Ruins'][Math.floor(i / 10) % 5]}`,
  difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
  rewardGold: 100 + (i * 50)
}))

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 8

  const totalPages = Math.ceil(QUESTS.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentQuests = QUESTS.slice(startIndex, endIndex)

  const goToPage = (page) => setCurrentPage(page)
  const nextPage = () => setCurrentPage(Math.min(currentPage + 1, totalPages))
  const prevPage = () => setCurrentPage(Math.max(currentPage - 1, 1))

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="app">
      <h1>🗺️ Available Quests</h1>
      <p className="page-info">Page {currentPage} of {totalPages} • Showing {currentQuests.length} quests</p>

      <div className="quest-list">
        {currentQuests.map(quest => (
          <div key={quest.id} className="quest-card">
            <div className="quest-info">
              <h3 className="quest-title">{quest.title}</h3>
              <span className={`difficulty ${quest.difficulty.toLowerCase()}`}>
                {quest.difficulty}
              </span>
            </div>
            <div className="quest-reward">
              <span className="gold-amount">💰 {quest.rewardGold}g</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          ← Previous
        </button>

        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}

        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next →
        </button>
      </div>
    </div>
  )
}

export default App
