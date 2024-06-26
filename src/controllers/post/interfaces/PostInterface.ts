export interface PostAddInterface {
  title: string;
  article: string;
}

export interface PostDeleteInterface {
  id: string;
}

export interface PostWatchHistoryInterface {
  postId: string;
}

export interface PostEditInterface {
  id: string;
  title: string;
  article: string;
}
