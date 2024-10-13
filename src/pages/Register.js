import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        const local = localStorage.getItem("users");
        if (local) {
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function signUpData(e) {
        e.preventDefault();
        const obj = {
            username: username.trim(),
            password: password.trim()
        }
        if (obj.password !== "" && obj.username !== "") {
            const response = await fetch('http://localhost:5000/register', {
                method: "post",
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json();
            if (!data.error) {
                localStorage.setItem("users", JSON.stringify({ name: data.result.username, id: data.result._id }));
                localStorage.setItem("token", JSON.stringify(data.auth));
                navigate("/")
            } else {
                alert("Username already exist")
            }
        }
    }

    return (
        <section>
            <h1 className='heading'>Sign Up</h1>
            <form onSubmit={signUpData}>
                <label>Username : </label><br />
                <input type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} /><br />
                <label>Password : </label><br />
                <input type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} /><br />

                <button type='submit' className='btn-lr'>Sign up</button>
            </form>
        </section>
    )
}

export default Register