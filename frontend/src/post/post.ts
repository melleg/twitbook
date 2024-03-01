export default interface Post {
    id: number;
    content: string;
    postedDate: Date;
    username: string;
    likes: number;
    hasLiked: boolean;
}
