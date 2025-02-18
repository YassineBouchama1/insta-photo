import QuickLRU from "quick-lru"
import type { User, UnsplashToken } from "@/types"

// extand User type to include optional Unsplash token
interface UserWithToken extends User {
    unsplashToken?: UnsplashToken;

}

const userDb = new QuickLRU<string, UserWithToken>({ maxSize: 1000 })

// iniztal sample users
function initUsers() {
    const users: User[] = [
        { id: "muser1", username: "muser1", password: "mpassword1", isBlocked: false },
        { id: "muser2", username: "muser2", password: "mpassword2", isBlocked: false },
        { id: "muser3", username: "muser3", password: "mpassword3", isBlocked: true },
    ]

    try {
        for (const user of users) {
            userDb.set(user.username, user)
        }
    } catch (error) {
        console.error('Error initializing users:', error)
    }
}

// Enhanced database operations
const enhancedDb = {
    get: (username: string): UserWithToken | undefined => {
        return userDb.get(username)
    },



}

initUsers()

export { enhancedDb as userDb }