import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    getAllUsers: [User]!
    getAllPosts: [Post]!
    getUserById(id: String!): User
    getPostById(id: String!): Post
  }

  type Mutation {
    addUser(data: AddUserInput): User!
  }

  input AddUserInput {
    name: String!
    email: String!
    age: Int
  }

  type User {
    id: String
    age: Int
    name: String
    email: String
    writtenPosts: [Post]
  }

  type Post {
    id: String!
    title: String!
    createdAt: DateTime!
    author: User
    authorId: String
  }

  scalar DateTime
`;
