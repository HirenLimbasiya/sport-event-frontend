import React, { useState } from "react";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    eventName: "",
    totalSeats: 0,
    description: "",
  });

  async function createEvent(e) {
    e.preventDefault();
    if (
      eventData.eventName === "" ||
      eventData.totalSeats === 0 ||
      eventData.description.trim() === ""
    ) {
      alert("enter a data");
      return;
    }
    const local = JSON.parse(localStorage.getItem("users"));
    const obj = { ...eventData, createdBy: local.name };
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/event/${local.id}`,
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          authorization: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    const data = await response.json();
    if (data) {
      alert("Event Create");
      setEventData({
        eventName: "",
        totalSeats: 0,
        description: "",
      });
    }
  }

  return (
    <section>
      <div>
        <h1>Create Your Event</h1>
        <form>
          <label>Select Sport : </label>
          <br />
          <select
            value={eventData.eventName}
            onChange={(e) =>
              setEventData({ ...eventData, eventName: e.target.value })
            }
          >
            <option value="">--Select--</option>
            <option value="cricket">Cricket</option>
            <option value="volleyball">Volleyball</option>
            <option value="badminton">Badminton</option>
            <option value="football">Football</option>
            <option value="bascketball">Bascketball</option>
          </select>
          <br />
          <label>Total Participant Number : </label>
          <br />
          <input
            type="number"
            value={eventData.totalSeats}
            onChange={(e) =>
              setEventData({ ...eventData, totalSeats: Number(e.target.value) })
            }
          />
          <br />
          <label>Add Description :</label>
          <br />
          <textarea
            value={eventData.description}
            placeholder="Add Some Detaile About Event"
            onChange={(e) =>
              setEventData({ ...eventData, description: e.target.value })
            }
          />
          <br />
          <button className="btn-lr" type="submit" onClick={createEvent}>
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateEvent;
