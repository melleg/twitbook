export default interface Post {
    id: number;
    content: string;
    postedDate: Date;
    author: {username: string};
}