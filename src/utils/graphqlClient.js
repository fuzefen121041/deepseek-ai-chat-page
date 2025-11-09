import { GraphQLClient } from 'graphql-request'

// 创建 GraphQL 客户端实例
const endpoint = `${import.meta.env.VITE_API_URL}/graphql`

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
})

// 导出客户端供其他文件使用
export default graphqlClient
