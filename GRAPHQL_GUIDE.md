# GraphQL 改造说明文档

## 前端改造总结

### 1. 安装的依赖包
```bash
npm install graphql-request graphql
```

### 2. 新增的文件

#### `src/utils/graphqlClient.js`
GraphQL 客户端配置文件，连接到后端的 `/graphql` 端点。

#### `src/graphql/mutations.js`
定义所有的 GraphQL Mutation 操作（如发送消息）。

#### `src/graphql/queries.js`
定义所有的 GraphQL Query 操作（如获取对话历史）。

### 3. 修改的文件

#### `src/App.jsx`
- 移除了 `axios` 依赖
- 引入了 `graphqlClient` 和 `SEND_MESSAGE_MUTATION`
- 将原来的 REST API 调用改为 GraphQL Mutation 调用
- 调整了错误处理逻辑以适配 GraphQL 错误格式

---

## 后端需要实现的 GraphQL Schema

### Schema 定义（使用 GraphQL SDL）

```graphql
# 输入类型：对话历史项
input ConversationInput {
  role: String!
  content: String!
}

# 返回类型：Token 使用情况
type Usage {
  promptTokens: Int
  completionTokens: Int
  totalTokens: Int
}

# 返回类型：聊天响应
type ChatResponse {
  message: String!
  usage: Usage
}

# Mutation 定义
type Mutation {
  # 发送消息
  sendMessage(
    message: String!
    conversationHistory: [ConversationInput!]
  ): ChatResponse!

  # 清空对话（可选）
  clearConversation: ClearResponse
}

# 清空对话响应（可选）
type ClearResponse {
  success: Boolean!
}

# Query 定义（可选，未来扩展用）
type Query {
  # 获取对话历史
  conversationHistory(limit: Int): [ConversationMessage!]

  # 获取用户信息
  user: User
}

# 对话消息类型（可选）
type ConversationMessage {
  id: ID!
  role: String!
  content: String!
  timestamp: String!
}

# 用户类型（可选）
type User {
  id: ID!
  name: String
  email: String
}
```

---

## 后端实现示例（Node.js + Apollo Server）

### 1. 安装依赖
```bash
npm install apollo-server graphql
```

### 2. 创建 GraphQL Server

```javascript
const { ApolloServer, gql } = require('apollo-server')

// 定义 Schema
const typeDefs = gql`
  input ConversationInput {
    role: String!
    content: String!
  }

  type Usage {
    promptTokens: Int
    completionTokens: Int
    totalTokens: Int
  }

  type ChatResponse {
    message: String!
    usage: Usage
  }

  type Mutation {
    sendMessage(
      message: String!
      conversationHistory: [ConversationInput!]
    ): ChatResponse!
  }

  type Query {
    _empty: String
  }
`

// 定义 Resolvers
const resolvers = {
  Mutation: {
    sendMessage: async (_, { message, conversationHistory }) => {
      // 这里调用你原来的 DeepSeek API 逻辑
      // 例如：
      try {
        const response = await callDeepSeekAPI(message, conversationHistory)

        return {
          message: response.message,
          usage: {
            promptTokens: response.usage.prompt_tokens,
            completionTokens: response.usage.completion_tokens,
            totalTokens: response.usage.total_tokens
          }
        }
      } catch (error) {
        throw new Error(`AI 服务错误: ${error.message}`)
      }
    }
  },

  Query: {
    _empty: () => 'GraphQL server is running'
  }
}

// 创建 Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // 开启 schema 查询（开发环境）
  playground: true,    // 开启 GraphQL Playground（开发环境）
})

// 启动服务器
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 GraphQL Server ready at ${url}`)
})
```

---

## 后端实现示例（Express + Express-GraphQL）

```javascript
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// 定义 Schema
const schema = buildSchema(`
  input ConversationInput {
    role: String!
    content: String!
  }

  type Usage {
    promptTokens: Int
    completionTokens: Int
    totalTokens: Int
  }

  type ChatResponse {
    message: String!
    usage: Usage
  }

  type Mutation {
    sendMessage(
      message: String!
      conversationHistory: [ConversationInput!]
    ): ChatResponse!
  }

  type Query {
    _empty: String
  }
`)

// 定义 Resolvers
const root = {
  sendMessage: async ({ message, conversationHistory }) => {
    // 调用 DeepSeek API
    const response = await callDeepSeekAPI(message, conversationHistory)

    return {
      message: response.message,
      usage: {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens,
        totalTokens: response.usage.total_tokens
      }
    }
  },

  _empty: () => 'GraphQL server is running'
}

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // 开启 GraphiQL 界面
}))

app.listen(4000, () => {
  console.log('🚀 GraphQL Server running on http://localhost:4000/graphql')
})
```

---

## 环境变量配置

前端 `.env` 文件需要修改：

```env
# 原来的 REST API 端点
# VITE_API_URL=http://localhost:3000

# 新的 GraphQL 端点（去掉 /api/chat，只保留基础 URL）
VITE_API_URL=http://localhost:4000
```

**注意**：GraphQL 客户端会自动添加 `/graphql` 路径（见 `src/utils/graphqlClient.js`）。

---

## 测试 GraphQL API

### 使用 GraphQL Playground（如果使用 Apollo Server）

访问 `http://localhost:4000/graphql`，在 Playground 中测试：

```graphql
mutation {
  sendMessage(
    message: "你好"
    conversationHistory: []
  ) {
    message
    usage {
      promptTokens
      completionTokens
      totalTokens
    }
  }
}
```

### 使用 curl 测试

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation($message: String!, $conversationHistory: [ConversationInput!]) { sendMessage(message: $message, conversationHistory: $conversationHistory) { message usage { totalTokens } } }",
    "variables": {
      "message": "你好",
      "conversationHistory": []
    }
  }'
```

---

## GraphQL vs REST 对比

### 原来的 REST API
```
POST /api/chat
{
  "message": "你好",
  "conversationHistory": [...]
}
```

### 现在的 GraphQL
```
POST /graphql
{
  "query": "mutation SendMessage($message: String!, ...) { ... }",
  "variables": {
    "message": "你好",
    "conversationHistory": [...]
  }
}
```

---

## 常见问题

### Q1: 前端请求 404 错误？
**A**: 检查后端是否正确启动在 `/graphql` 路径，以及 `.env` 中的 `VITE_API_URL` 是否正确。

### Q2: CORS 错误？
**A**: 后端需要配置 CORS，允许前端域名访问。

Apollo Server 示例：
```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: 'http://localhost:5173', // 前端地址
    credentials: true
  }
})
```

### Q3: 如何查看 GraphQL Schema？
**A**: 访问 GraphQL Playground（Apollo Server）或 GraphiQL（Express-GraphQL），右侧会显示完整的 Schema 文档。

---

## 下一步

1. **后端实现 GraphQL Server**
   - 选择框架（Apollo Server 或 Express-GraphQL）
   - 实现上述 Schema 和 Resolvers
   - 集成原有的 DeepSeek API 调用逻辑

2. **测试联调**
   - 启动后端 GraphQL 服务
   - 启动前端开发服务器
   - 测试聊天功能是否正常

3. **可选优化**
   - 添加 GraphQL Subscription 支持实时消息推送
   - 实现分页查询对话历史
   - 添加用户认证和授权

---

## 参考资源

- [GraphQL 官方文档](https://graphql.org/)
- [Apollo Server 文档](https://www.apollographql.com/docs/apollo-server/)
- [graphql-request 文档](https://github.com/jasonkuhrt/graphql-request)
- [Express-GraphQL 文档](https://github.com/graphql/express-graphql)
