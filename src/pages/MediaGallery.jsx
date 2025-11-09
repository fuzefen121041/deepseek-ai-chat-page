import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mediaList } from '../data/mediaList'
import './MediaGallery.css'

function MediaGallery() {
  const [activeTab, setActiveTab] = useState('all') // all, videos, images
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // 获取筛选后的媒体列表
  const getFilteredMedia = () => {
    let items = []

    if (activeTab === 'all') {
      items = [
        ...mediaList.videos.map(v => ({ ...v, type: 'video' })),
        ...mediaList.images.map(i => ({ ...i, type: 'image' }))
      ]
    } else if (activeTab === 'videos') {
      items = mediaList.videos.map(v => ({ ...v, type: 'video' }))
    } else if (activeTab === 'images') {
      items = mediaList.images.map(i => ({ ...i, type: 'image' }))
    }

    // 搜索过滤
    if (searchTerm) {
      items = items.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return items
  }

  const filteredMedia = getFilteredMedia()

  return (
    <div className="media-gallery">
      {/* 背景动画 */}
      <div className="bg-animation">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <motion.div
        className="gallery-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 头部 */}
        <div className="gallery-header">
          <h1 className="gallery-title">
            <span className="icon">🎬</span>
            媒体资源库
          </h1>
          <p className="gallery-subtitle">浏览和管理你的视频与图片资源</p>
        </div>

        {/* 搜索和筛选 */}
        <div className="gallery-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="搜索媒体资源..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="tabs">
            {[
              { id: 'all', label: '全部', icon: '📁' },
              { id: 'videos', label: '视频', icon: '🎥' },
              { id: 'images', label: '图片', icon: '🖼️' }
            ].map(tab => (
              <motion.button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="tab-icon">{tab.icon}</span>
                {tab.label}
                <span className="tab-count">
                  ({tab.id === 'all'
                    ? mediaList.videos.length + mediaList.images.length
                    : tab.id === 'videos'
                      ? mediaList.videos.length
                      : mediaList.images.length})
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 媒体网格 */}
        <div className="media-grid">
          {filteredMedia.length === 0 ? (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="empty-icon">📭</div>
              <h3>暂无媒体资源</h3>
              <p>请在 <code>src/data/mediaList.js</code> 中添加媒体资源配置</p>
              <p>并将文件放置在 <code>public/media/</code> 目录下</p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {filteredMedia.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="media-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedMedia(item)}
                >
                  <div className="media-preview">
                    {item.type === 'video' ? (
                      <div className="video-preview">
                        {item.thumbnail ? (
                          <img src={item.thumbnail} alt={item.title} />
                        ) : (
                          <div className="video-placeholder">
                            <span className="play-icon">▶️</span>
                          </div>
                        )}
                        <div className="media-type-badge video">视频</div>
                      </div>
                    ) : (
                      <div className="image-preview">
                        <img src={item.url} alt={item.title} />
                        <div className="media-type-badge image">图片</div>
                      </div>
                    )}
                  </div>
                  <div className="media-info">
                    <h3 className="media-title">{item.title || '未命名'}</h3>
                    {item.description && (
                      <p className="media-description">{item.description}</p>
                    )}
                    <div className="media-actions">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        📎 查看链接
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {/* 媒体预览模态框 */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="media-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedMedia(null)}
              >
                ✕
              </button>

              <div className="modal-media">
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="modal-video"
                  >
                    您的浏览器不支持视频播放
                  </video>
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    className="modal-image"
                  />
                )}
              </div>

              <div className="modal-info">
                <h2>{selectedMedia.title || '未命名'}</h2>
                {selectedMedia.description && (
                  <p>{selectedMedia.description}</p>
                )}
                <div className="modal-link">
                  <strong>链接:</strong>
                  <a
                    href={selectedMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedMedia.url}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MediaGallery
