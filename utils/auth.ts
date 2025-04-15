export const logout = async () => {

    // Get the token from localStorage
    const token = localStorage.getItem('token')
    
    if (!token) {
        throw new Error('No authentication token found')
    }

    try {
        // Call the backend logout endpoint with the correct path
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

        // // Clear authentication data
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        // // Remove the cookie
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        
        // Redirect to login page
        window.location.assign('/Application/Organisms/LandingPage')

    } catch (error) {
        console.error('Logout error:', error)
        // // Even if the API call fails, clear local data and redirect
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        window.location.assign('/Application/Organisms/LandingPage')
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