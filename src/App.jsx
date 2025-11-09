import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import ChatPage from './pages/ChatPage'
import MediaGallery from './pages/MediaGallery'
import HomeWork from './pages/HomeWork'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        {/* 背景动画 */}
        <div className="bg-animation">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        {/* 导航栏 */}
        <Navigation />

        {/* 路由配置 */}
        <Routes>
          <Route path="/" element={<ChatPage />} />
          {/* <Route path="/media" element={<MediaGallery />} /> */}
          <Route path="/homework" element={<HomeWork />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
