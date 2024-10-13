import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventPage = () => {
  const [singleData, setSingleData] = useState();

  const params = useParams();

  const fetchSingleEvent = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/event/${id}`,
      {
        method: "GET",
        headers: {
          authorization: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    const data = await response.json();
    setSingleData(data);
  };

  const handleAccept = async (id, name) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/participant/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ name: name }),
        headers: {
          "Content-Type": "application/json",
          authorization: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    const data = await response.json();
    await handleReject(id, name);
  };

  const handleReject = async (id, name) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/remove/${id}/${name}`,
      {
        method: "PUT",
        headers: {
          authorization: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    const data = await response.json();
    await fetchSingleEvent(id);
  };

  useEffect(() => {
    fetchSingleEvent(params.id);
  }, []);

  return (
    <section>
      <div style={{ padding: "15px 0" }}>
        {singleData && (
          <>
            <div className="single-page-container">
              <div className="img-page">
                <img src={singleData.image} alt={singleData.eventName} />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <h1 className="event-name">{singleData.eventName}</h1>
                <h3>Organize By {singleData.createdBy}</h3>
                <p>Total Seats: {singleData.totalSeats}</p>
                <p>
                  Available Seats:{" "}
                  {singleData.totalSeats -
                    singleData.currentParticipants.length}
                </p>
              </div>
            </div>
            <h2 className="list-heading">Description</h2>
            <div>{singleData.description}</div>
            <h2 className="list-heading">Participant List : </h2>
            <div className="participant-list">
              {singleData.currentParticipants.length > 0 ? (
                singleData.currentParticipants.map((name, index) => (
                  <div>{name}</div>
                ))
              ) : (
                <h3>No Participant</h3>
              )}
            </div>
            <h2 className="list-heading">Pending List : </h2>
            <div className="pending-list">
              {singleData.pending.length > 0 ? (
                singleData.pending.map((name, index) => {
                  return (
                    <div>
                      <p>{name}</p>
                      {singleData.totalSeats -
                        singleData.currentParticipants.length ===
                      0 ? (
                        <button className="btn-accept-disable" disabled>
                          Accept
                        </button>
                      ) : (
                        <button
                          className="accept-btn"
                          onClick={() => handleAccept(singleData._id, name)}
                        >
                          Accept
                        </button>
                      )}

                      <button
                        className="reject-btn"
                        onClick={() => handleReject(singleData._id, name)}
                      >
                        Reject
                      </button>
                    </div>
                  );
                })
              ) : (
                <h3>No Participant</h3>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default EventPage;
