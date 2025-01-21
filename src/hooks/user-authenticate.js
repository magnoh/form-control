// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'


// export const useAuthentication = () => {
    
//     const navigation = useNavigate()
//     const [formValues, setFormValues] = useState({
//             login: '',
//             password: ''
//     })

//     function handleChangeValues(e) {
//         const fieldName = e.target.name
//         const fieldValue = e.target.value
//         setFormValues((current) => {
//             return {
//                 ...current,
//                 [fieldName]: fieldValue,
//             }
//         })
//     }
//     async function submit(e) {
//         e.preventDefault()
//         try {
//             const _baseURL = `${process.env.REACT_APP_FASTAPI}/usuarios/login`
//             const response = await fetch(_baseURL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 login: formValues.login,
//                 password: formValues.password
//             }
//         )

//             const token = response.data.token
//             if (response.status === 400) {
//                 return
//             }
//             sessionStorage.setItem('@Auth:token', token)
//             sessionStorage.setItem('@Auth:user', response.data.user)
//             sessionStorage.setItem('@Auth:email', response.data.email)
//             sessionStorage.setItem('@Auth:role', response.data.role)
//             sessionStorage.setItem('@Auth:senhaatualizada', response.data.senha_atualizada)
//             setTimeout(() => navigation("/home"), 300)

//         } catch (err) {
//             if (err.response.data.error) {
//                 toast.error(err.response.data.error)
//             }
//             console.error(err.response.data.error)
//         }
//     }
//     return { handleChangeValues, formValues, submit }

//     }