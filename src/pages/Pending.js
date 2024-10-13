import React, { useEffect } from 'react'
import SingleEvent from '../components/SingleEvent';

const Pending = ({ pending, eventFunction }) => {
    console.log(pending)
    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("users"));
        eventFunction(local.id);
    }, [])

    return (
        <section>
            <div className='events-container'>
                {
                    pending.length > 0 ? pending.map((event) =>
                        <div key={event._id} className="single-event-card">
                            <SingleEvent event={event} />
                            <button className='request-accept-tag pending'>Request Pending</button>
                        </div>
                    ) : <h2>No pending event</h2>
                }
            </div>
        </section>
    )
}

export default Pending