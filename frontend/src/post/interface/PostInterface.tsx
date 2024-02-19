export default interface Post {
    id: number;
    text: string;
    date: string;
}

export const emptyPost: Post = {
    id: 0,
    text: "loading...",
    date: "19-2-2024",
  };