import React, { useEffect, useState } from 'react'
import SingleEvent from '../components/SingleEvent';

const Events = ({ eventFunction }) => {

    const [events, setEvents] = useState([]);

    const fetchEvents = async (name) => {
        const response = await fetch(`http://localhost:5000/events/${name}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                authorization: `${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        const data = await response.json();
        const ans = data.filter((event) => {
            if (event.pending.includes(name) === false && event.currentParticipants.includes(name) === false) {
                return event
            }
        })
        setEvents(ans);
    }

    const handleRequest = async (id) => {
        const local = JSON.parse(localStorage.getItem('users'))
        const response = await fetch(`http://localhost:5000/pending/${id}`, {
            method: "PUT",
            body: JSON.stringify({ name: local.name }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        const data = await response.json();
        eventFunction(local.id);
        fetchEvents(local.name);
    }

    async function handleSearch(e) {
        const key = e.target.value;
        const local = JSON.parse(localStorage.getItem("users"));
        if (key) {
            const response = await fetch(`http://localhost:5000/events/${local.name}/${key}`, {
                method: "GET",
                headers: {
                    authorization: `${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            const data = await response.json();

            setEvents(data);
        } else {

            fetchEvents(local.name);
        }
    }

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("users"));
        fetchEvents(local.name);
        eventFunction(local.id);
    }, [])

    return (
        <section>
            <div>
                <input type="text"
                    placeholder='Serach by Event and Organizer name'
                    onChange={handleSearch}
                />
                <div className='events-container'>
                    {
                        events.length > 0 ? events.map((event) => {
                            return (
                                <div key={event._id} className="single-event-card">

                                    <SingleEvent event={event} />
                                    {
                                        (event.totalSeats - event.currentParticipants.length) === 0 ? <button className='btn-disable' disabled>Event is full</button> : <button className='btn-event-card' onClick={() => handleRequest(event._id)}>Request To Join</button>
                                    }

                                </div>
                            )

                        }) : <h1>No events found</h1>
                    }
                </div>
            </div>
        </section>
    )
}

export default Events