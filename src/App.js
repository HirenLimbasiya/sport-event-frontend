import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";
import Participate from "./pages/Participant";
import Pending from "./pages/Pending";
import PrivateComponents from './components/PrivateComponents';
import { useState } from 'react';
import EventPage from './pages/EventPage';


function App() {

  const [myEvents, setMyEvents] = useState([]);
  const [pending, setPending] = useState([]);
  const [participate, setParticipate] = useState([]);

  const fetchMyEvents = async (id) => {
    const response = await fetch(`http://localhost:5000/myevents/${id}`, {
      method: "GET",
      headers: {
        authorization: `${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    const data = await response.json();
    setMyEvents(data.myEvents);
    setParticipate(data.participated);
    setPending(data.pending)
    console.log(data)
  }



  function eventFunction(id) {
    fetchMyEvents(id)
  }

  return (
    <>
      <Header />
      <Routes>
        <Route element={<PrivateComponents />} >
          <Route path='/' element={<Events eventFunction={eventFunction} />} />
          <Route path='/createevent' element={<CreateEvent />} />
          <Route path='/myevents' element={<MyEvents myEvents={myEvents} eventFunction={eventFunction} />} />
          <Route path='/participate' element={<Participate participate={participate} eventFunction={eventFunction} />} />
          <Route path='/pendingevent' element={<Pending pending={pending} eventFunction={eventFunction} />} />
          <Route path='/myevents/:id' element={<EventPage />} />
        </Route>
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
