import { useEffect, useState } from 'react';
import { getGuestbook } from '../api/guestbookApi';
import type { GuestbookItem } from '../types';

function GuestbookPage() {
    const [items, setItems] = useState<GuestbookItem[]>([]);

    useEffect(() => {
        getGuestbook().then(setItems);
    }, []);

    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    <p>{item.author}</p>
                </div>
            ))}
        </div>
    );
}

export default GuestbookPage;