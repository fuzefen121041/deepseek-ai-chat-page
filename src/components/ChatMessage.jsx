import { motion } from 'framer-motion'
import { useState } from 'react'
import './ChatMessage.css'

function ChatMessage({ message, index }) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'
  const isError = message.isError

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      className={`message ${isUser ? 'user-message' : 'ai-message'} ${isError ? 'error-message' : ''}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut"
      }}
    >
      <div className="message-avatar">
        {isUser ? '👤' : '🤖'}
      </div>

      <div className="message-content">
        <div className="message-header">
          <span className="message-author">
            {isUser ? '你' : 'DeepSeek AI'}
          </span>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>

        <div className="message-text">
          {message.content}
        </div>

        {!isUser && !isError && (
          <div className="message-actions">
            <motion.button
              className="copy-btn"
              onClick={copyToClipboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? '✓ 已复制' : '📋 复制'}
            </motion.button>

            {message.usage && (
              <span className="token-usage">
                Tokens: {message.usage.total_tokens}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ChatMessage
