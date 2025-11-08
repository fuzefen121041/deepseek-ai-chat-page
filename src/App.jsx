import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (userMessage) => {
    // 添加用户消息
    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      // 构建对话历史（只发送最近的10条消息以节省 tokens）
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      // 调用后端 API
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        {
          message: userMessage,
          conversationHistory: conversationHistory
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      // 添加 AI 回复
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date(),
        usage: response.data.usage
      }
      setMessages(prev => [...prev, aiMessage])

    } catch (error) {
      console.error('发送消息失败:', error)

      // 添加错误消息
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `抱歉，发生了错误：${error.response?.data?.details || error.message}`,
        timestamp: new Date(),
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
  }

  return (
    <div className="app">
      {/* 背景动画 */}
      <div className="bg-animation">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* 主容器 */}
      <motion.div
        className="chat-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 头部 */}
        <div className="chat-header">
          <div className="header-content">
            <h1 className="title">
              <span className="logo">🤖</span>
              DeepSeek AI Chat
            </h1>
            {messages.length > 0 && (
              <motion.button
                className="clear-btn"
                onClick={clearMessages}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                清空对话
              </motion.button>
            )}
          </div>
        </div>

        {/* 消息区域 */}
        <div className="messages-container">
          {messages.length === 0 ? (
            <motion.div
              className="welcome-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="welcome-icon">💬</div>
              <h2>欢迎使用 DeepSeek AI</h2>
              <p>开始对话，体验智能 AI 助手</p>
              <div className="suggestions">
                <button onClick={() => sendMessage('你好，请介绍一下你自己')}>
                  👋 你好，请介绍一下你自己
                </button>
                <button onClick={() => sendMessage('帮我写一个 Python 快速排序算法')}>
                  💻 帮我写一个排序算法
                </button>
                <button onClick={() => sendMessage('解释一下什么是机器学习')}>
                  🧠 什么是机器学习？
                </button>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  index={index}
                />
              ))}
            </AnimatePresence>
          )}

          {/* 加载动画 */}
          {isLoading && (
            <motion.div
              className="loading-indicator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="loading-text">AI 正在思考...</span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </motion.div>
    </div>
  )
}

export default App
