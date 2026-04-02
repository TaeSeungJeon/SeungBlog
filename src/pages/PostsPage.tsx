import { useEffect, useState } from 'react';
import { getPosts } from '../api/postApi';
import type { Post } from '../types';

function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts().then(setPosts);
    }, []);

    return (
        <div>
            {posts.map((post) => (
                <div key={post.filename}>
                    <h2>{post.title}</h2>
                    <p>{post.date}</p>
                    <p>{post.description}</p>
                </div>
            ))}
        </div>
    );
}

export default PostsPage;