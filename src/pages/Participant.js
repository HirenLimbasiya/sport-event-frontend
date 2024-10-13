import React, { useEffect } from 'react'
import SingleEvent from '../components/SingleEvent';

const Participant = ({ participate, eventFunction }) => {
    console.log(participate);
    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("users"));
        eventFunction(local.id);
    }, [])

    return (
        <section>
            <div className='events-container'>
                {
                    participate.length > 0 ? participate.map((event) =>
                        <div key={event._id} className="single-event-card">
                            <SingleEvent event={event} />
                            <button className='request-accept-tag'>Request Accepted</button>
                        </div>
                    ) : <h2>No pending event</h2>
                }
            </div>
        </section>
    )
}

export default Participant