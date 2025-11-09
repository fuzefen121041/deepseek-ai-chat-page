import { gql } from 'graphql-request'

// 获取对话历史的 Query（如果后端支持）
export const GET_CONVERSATION_HISTORY = gql`
  query GetConversationHistory($limit: Int) {
    conversationHistory(limit: $limit) {
      id
      role
      content
      timestamp
    }
  }
`

// 获取用户信息的 Query（示例）
export const GET_USER_INFO = gql`
  query GetUserInfo {
    user {
      id
      name
      email
    }
  }
`
