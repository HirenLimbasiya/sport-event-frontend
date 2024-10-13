import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SingleEvent from '../components/SingleEvent'

const MyEvents = ({ myEvents, eventFunction }) => {

    const navigate = useNavigate()

    useEffect(() => {
        eventFunction(JSON.parse(localStorage.getItem("users")).id)
    }, [])

    const handleDetail = (id) => {
        navigate(`/myevents/${id}`)
    }

    return (
        <section>
            <div className='events-container'>
                {

                    myEvents.length > 0 ? myEvents.map((event) => {
                        return (
                            <div key={event._id} className="single-event-card">
                                <SingleEvent event={event} />
                                <button className='btn-event-card' onClick={() => handleDetail(event._id)}>See More</button>
                                <button className='pending-tag'>{event.pending.length}</button>
                            </div>
                        )
                    }) : <h1>No events found</h1>

                }
            </div>
        </section>
    )
}

export default MyEvents