import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();
    const local = JSON.parse(localStorage.getItem("users"));

    function handleLogout() {
        localStorage.clear();
        navigate("/login")
    }

    return (
        <header>
            <section>
                <nav>

                    {
                        local ? <span>{local.name}</span> : null
                    }
                    <div>
                        {
                            local ? <ul>
                                <li><Link to="/">Events</Link></li>
                                <li><Link to="/myevents">My Event</Link></li>
                                <li><Link to="/createevent">Create Event</Link></li>
                                <li><Link to="/participate">Participate</Link></li>
                                <li><Link to="/pendingevent">Pending</Link></li>

                            </ul> :
                                <ul>
                                    <li><Link to="/signup">Sign up</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                </ul>
                        }
                    </div>
                    {
                        local ? <button onClick={handleLogout} className="btn-header">Logout</button> : null
                    }
                </nav>
            </section>
        </header>
    )
}

export default Header