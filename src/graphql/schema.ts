import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    me: User!
    getAllUsers: [User]!
    getAllPosts: [Post]!
    getUserById(id: String!): User
    getPostById(id: String!): Post
  }

  type Mutation {
    addUser(data: AddUserInput!): LoginRes!
    login(data: LoginInput!): LoginRes!
  }

  type LoginRes {
    token: String!
  }

  type User {
    id: String!
    firsName: String!
    lastName: String!
    email: String!
    role: Role!
    createDate: DateTime!
    lastOnline: DateTime
    writtenPosts: [Post]
  }

  type Post {
    id: String!
    title: String!
    article: String!
    createdDate: DateTime!
    author: User
    authorId: String
  }

  input AddUserInput {
    firsName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AddPost {
    title: String!
    article: String!
  }

  scalar DateTime

  enum Role {
    USER
    ADMIN
    TESTER
  }
`;
