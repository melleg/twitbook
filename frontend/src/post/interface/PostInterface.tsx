export default interface Post {
    id: number;
    content: string;
    postedDate: string;
}

export const emptyPost: Post = {
    id: 1,
    content: "loading...",
    postedDate: "19-2-2024",
};

