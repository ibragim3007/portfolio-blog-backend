import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    me: User!
    getAllUsers: [User]!
    getAllPosts: [Post]!
    getUserById(id: String!): User
    getPostById(data: GetByIdInput!): Post!
    getCommentById(data: GetByIdInput!): Comment!
  }

  type Mutation {
    addUser(data: AddUserInput!): LoginRes!
    login(data: LoginInput!): LoginRes!
    addPost(data: AddPostInput!): Post!
    addComment(data: AddCommentInput!): Comment!
    deletePost(data: DeletePostInput!): Post!
    editPost(data: EditPostInput!): Post!
    ratePost(data: RatePostInput!): Post!
    rateComment(data: RateCommentInput!): Comment!
  }

  type Subscription {
    getCommentByPostId(data: GetCommentsByPostInput!): [Comment]
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
    comments: [Comment]
    likedComments: [LikesOnComments]
  }

  type Post {
    id: String!
    title: String!
    article: String!
    createDate: DateTime!
    author: User
    authorId: String
    likedBy: [PostOnUserLikes]
    likesAmount: Int!
    comments: [Comment]
    commentsAmount: Int!
  }

  type Comment {
    id: String!
    text: String!
    user: User
    userId: String!
    post: Post
    postId: String!
    likesAmount: Int!
    likedBy: [LikesOnComments]
    createDate: DateTime!
  }

  type PostOnUserLikes {
    userId: String!
    postId: String!
    post: Post
    user: User
    assignedAt: DateTime!
  }

  type LikesOnComments {
    commentId: String!
    userId: String!
    comment: Comment
    user: User
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

  input AddCommentInput {
    text: String!
    postId: String!
  }

  input RateCommentInput {
    commentId: String!
  }

  input GetCommentsByPostInput {
    postId: String!
  }

  scalar DateTime

  enum Role {
    USER
    ADMIN
    TESTER
  }
`;
