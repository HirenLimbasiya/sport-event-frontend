import React, { useState } from 'react'

const SingleEvent = ({ event }) => {

    const [toggle, setToggle] = useState(false)

    return (
        <div className='single-event-data'>
            <img src={event.image} alt={event.eventName} />
            <div style={{ padding: "0 15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 className='event-name'>{event.eventName}</h1>
                    <button className='close-btn' onClick={() => setToggle(true)}>Detail</button>
                </div>
                <h3 className='event-organizer'>Organize By {event.createdBy}</h3>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Total Seats: {event.totalSeats}</span>
                    <span>Available Seats: {event.totalSeats - event.currentParticipants.length}</span>
                </div>
            </div>
            {
                toggle && <div className='detail'><button className='close-btn' onClick={() => setToggle(false)}>close</button><div>{event.description}</div></div>
            }
        </div>
    )
}

export default SingleEvent