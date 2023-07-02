import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authContext from './authContext';

function Login({ onLogin }) {
    const navigate = useNavigate();
    const { setLoggedIn, setIsAdmin } = useContext(authContext);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setErrors(Validation(values));
    //     if (errors.email === '' && errors.password === '') {
    //         axios.post('https://localhost:8081/user', values)
    //             .then(res => {
    //                 if (res.data === "Success") {
    //                     navigate('/user');
    //                 } else {
    //                     navigate('/admin')
    //                 }
    //             })
    //             .catch(err => console.log(err));
    //     }
    // }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = new URLSearchParams();

        body.append('name', email)
        body.append('password', password)

        const response = await fetch('http://localhost:8081/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body,
        });
        const data = await response.json();
        console.log(data)
        if (data.success && data.isAdmin) {
            setIsAdmin(true)
            setLoggedIn(true)
            navigate('/admin')
        } else if (data.success && !data.isAdmin) {
            setLoggedIn(true)
            navigate('/user')
        } else {
            setError(true)
        }


    }


    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action='' method='post' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email' className='m-3'><strong>Username</strong></label>
                        <input type='text' placeholder='Enter email or username' name='email'
                            onChange={handleEmail} value={email} className='form-control rounded-0' required />

                    </div>
                    <div className='mb-3'>
                        <label htmlFor='passsword' className='m-3'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter password' name='password'
                            onChange={handlePassword} value={password} className='form-control rounded-0' required />


                    </div>
                    {
                        error && (
                            <div>
                                ERROR INVALID CREDENTIALS
                            </div>
                        )
                    }
                    <button type='submit' className='btn btn-success w-100 my-1'> <strong>Log in</strong></button>
                    <br />
                    <button className='btn btn-default border w-100 my-4 bg-light'><strong>Create Account</strong></button>
                </form>
            </div>
        </div>
    )
}

export default Login
