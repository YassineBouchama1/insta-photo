import QuickLRU from "quick-lru"
import type { User } from "@/types"

const userDb = new QuickLRU<string, User>({ maxSize: 1000 })
const likesDb = new QuickLRU<string, { userId: string; photoId: string }>({ maxSize: 1000 })

// Initialize sample users
function initUsers() {
    const users: User[] = [
        { id: "muser1", username: "muser1", password: "mpassword1", isBlocked: false },
        { id: "muser2", username: "muser2", password: "mpassword2", isBlocked: false },
        { id: "muser3", username: "muser3", password: "mpassword3", isBlocked: true },
    ]


    try {

        for (const user of users) {
            userDb.set(user.id, user)
        }


    } catch (error) {
        console.error('Error initializing users:', error);
    }
}

initUsers()

export { userDb, likesDb }

