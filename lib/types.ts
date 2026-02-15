export interface UserState {
    name: string
    email: string
    role: "user" | "admin"
    isLoggedIn: boolean
    favorites: number[]
    history: number[]
    settings: {
        voiceEnabled: boolean
        notifications: boolean
        darkMode: boolean
        language: "en-IN" | "hi-IN"
    }
}
