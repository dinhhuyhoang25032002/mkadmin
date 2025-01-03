import http from "~/configs/fetch-api";

// auth
export const handleLogin = (email: string, password: string) => {
    return http.post('auth/login', { email, password })
}

export const handleRegister = (email: string, password: string, fullname: string) => { 
    return http.post('auth/sign-up', { email, password, fullname })
}

export const handleLogout = () => {
    return http.get('auth/logout')
}

// contact

export const handleContact = (values: { email: string, phone: string, name: string, topic: string, content: string }) => {
    const { email, phone, name, topic, content } = values
    return http.post('contact-mailer/support', { email, phone, name, topic, content })
}

// update user info
export const handleUpdateUserInfo = (info: { fullname: string, email: string, address: string, dateOfBirth: string }) => {
    return http.put('users', info)
}