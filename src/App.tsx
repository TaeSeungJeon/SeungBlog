import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';
import AboutPage from './pages/AboutPage';
import GuestbookPage from './pages/GuestbookPage';
import PlaygroundPage from './pages/PlaygroundPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/:filename" element={<PostDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/guestbook" element={<GuestbookPage />} />
                <Route path="/playground" element={<PlaygroundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;