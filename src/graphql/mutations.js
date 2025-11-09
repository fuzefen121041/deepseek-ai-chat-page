import { gql } from 'graphql-request'

// 发送聊天消息的 Mutation
export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($message: String!, $conversationHistory: [ConversationInput!]) {
    sendMessage(message: $message, conversationHistory: $conversationHistory) {
      message
      usage {
        promptTokens
        completionTokens
        totalTokens
      }
    }
  }
`

// 如果需要其他 Mutation，可以在这里继续添加
// 例如：清空对话历史
export const CLEAR_CONVERSATION_MUTATION = gql`
  mutation ClearConversation {
    clearConversation {
      success
    }
  }
`
