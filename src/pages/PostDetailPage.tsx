import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPost } from '../api/postApi';
import type { PostDetail } from '../types';

// ReactMarkdown의 code 컴포넌트에 전달되는 props 타입 정의
interface CodeProps {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
}

function PostDetailPage() {
    const { filename } = useParams<{ filename: string }>();
    const [post, setPost] = useState<PostDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (filename) {
            getPost(filename)
                .then(setPost)
                .finally(() => setIsLoading(false));
        }
    }, [filename]);

    if (isLoading) {
        return (
            <div className="space-y-8 pt-10">
                <div className="space-y-4">
                    <div className="h-8 w-64 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="pt-10 text-center space-y-4">
                <p className="text-gray-400 dark:text-gray-500">글을 찾을 수 없습니다.</p>
                <Link
                    to="/posts"
                    className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    ← 목록으로
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-10 pt-10">

            {/* 뒤로가기 */}
            <Link
                to="/posts"
                className="inline-flex items-center gap-1 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
                ← posts
            </Link>

            {/* 글 헤더 */}
            <div className="space-y-3 pb-8 border-b border-gray-100 dark:border-gray-800">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
                    <span>{post.date}</span>
                    {post.description && (
                        <>
                            <span>·</span>
                            <span>{post.description}</span>
                        </>
                    )}
                </div>
            </div>

            {/* 글 본문 */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
                <ReactMarkdown
                    components={{
                        // code 블록을 가로채서 SyntaxHighlighter로 교체
                        code({ inline, className, children }: CodeProps) {
                            // className이 "language-java" 형태로 오면 "java"만 추출
                            const match = /language-(\w+)/.exec(className || '');
                            const language = match ? match[1] : '';

                            // inline 코드(`backtick`)는 그냥 <code> 태그 그대로
                            if (inline || !language) {
                                return (
                                    <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono">
                                        {children}
                                    </code>
                                );
                            }

                            // 코드 블록(``` ```)은 SyntaxHighlighter로 렌더링
                            return (
                                <SyntaxHighlighter
                                    language={language}
                                    style={oneDark}
                                    customStyle={{
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        margin: '0',
                                    }}
                                    showLineNumbers
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            );
                        },
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>

        </div>
    );
}

export default PostDetailPage;