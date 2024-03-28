import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    me: User!
    getAllUsers: [User]!
    getAllPosts: [Post]!
    getUserById(id: String!): User
    getPostById(data: GetByIdInput!): Post!
  }

  type Mutation {
    addUser(data: AddUserInput!): LoginRes!
    login(data: LoginInput!): LoginRes!
    addPost(data: AddPostInput!): Post!
    deletePost(data: DeletePostInput!): Post!
    editPost(data: EditPostInput!): Post!
    ratePost(data: RatePostInput!): Boolean!
  }

  type LoginRes {
    token: String!
  }

  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    createDate: DateTime!
    lastOnline: DateTime
    writtenPosts: [Post]
    likedPosts: [PostOnUserLikes]
  }

  type Post {
    id: String!
    title: String!
    article: String!
    createDate: DateTime!
    author: User
    authorId: String
    likedBy: [PostOnUserLikes]
  }

  type PostOnUserLikes {
    userId: String!
    postId: String!
    post: Post!
    user: User!
    assignedAt: DateTime!
  }

  input AddUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AddPostInput {
    title: String!
    article: String!
  }

  input DeletePostInput {
    id: String!
  }

  input EditPostInput {
    id: String!
    title: String!
    article: String!
  }

  input RatePostInput {
    postId: String!
  }

  input GetByIdInput {
    id: String!
  }

  scalar DateTime

  enum Role {
    USER
    ADMIN
    TESTER
  }
`;
