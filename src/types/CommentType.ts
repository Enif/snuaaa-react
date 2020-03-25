import ContentType from './ContentType';
import UserType from './UserType';

interface CommentType {
    comment_id: number;
    comment_uuid: string;
    parent_id: number;
    author_id: number;
    text: string;
    like_num: number;
    createdAt: string;
    updatedAt: string;
    content: ContentType;
    user: UserType;
}

export default CommentType;
