import { Level } from 'level';
import { User } from '@/types';

const db = new Level("./db", { valueEncoding: "json" })

export const userDb = db.sublevel<string, User>('users', { valueEncoding: 'json' });
export const likesDb = db.sublevel<string, { userId: string; photoId: string }>('likes', { valueEncoding: 'json' });

// here i initial dummy users
async function initUsers() {
    const users: User[] = [
        { id: 'muser1', username: 'muser1', password: 'mpassword1', isBlocked: false },
        { id: 'muser2', username: 'muser2', password: 'mpassword2', isBlocked: false },
        { id: 'muser3', username: 'muser3', password: 'mpassword3', isBlocked: true },
    ];

    try {
        for (const user of users) {
            await userDb.put(user.id, user);
        }
    } catch (error) {
        console.error('Error initializing users:', error);
    }
}

initUsers();