export const logout = async () => {

    const token = localStorage.getItem('token')

    try {
        const response = await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })

        if (!response.ok) {
            const data = await response.json().catch(() => ({}))
            throw new Error(data.message || 'Failed to logout. Please try again.')
        }

        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        
       window.location.href = '/Application/Organisms/LandingPage'

    } catch (error) {
        // console.error('Logout error:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        window.location.href = '/Application/Organisms/LandingPage'
    }
}

export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('token')
}

export const getToken = () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
}

export const getUser = () => {
    if (typeof window === 'undefined') return null
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
} 