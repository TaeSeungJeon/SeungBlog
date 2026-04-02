import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../api/postApi';
import type { PostDetail } from '../types';

function PostDetailPage() {
    const { filename } = useParams<{ filename: string }>();
    const [post, setPost] = useState<PostDetail | null>(null);

    useEffect(() => {
        if (filename) {
            getPost(filename).then(setPost);
        }
    }, [filename]);

    if (!post) return <div>로딩 중...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.date}</p>
            <pre>{post.content}</pre>
        </div>
    );
}

export default PostDetailPage;