import React, { useState } from 'react'

function useAuth({ className, value }) {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')


}

export default useAuth;