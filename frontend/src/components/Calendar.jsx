import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment-timezone';
import picture from './Picture1.jpg'

const localizer = momentLocalizer(moment);

function InstructorDashboard() {
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [newTimeSlot, setNewTimeSlot] = useState('');

  const [upcomingBookings, setUpcomingBookings] = useState([
    { id: 1, date: '2024-09-12', time: '6:30 PM', student: 'Aadarsh' },
    { id: 2, date: '2024-09-13', time: '10:30 AM', student: 'Talent' },
    { id: 3, date: '2024-09-13', time: '4:30 PM', student: 'Vinita' },
  ]);

  const handleAddSlot = () => {
    const newSlots = timeSlots.map((time) => ({ date: new Date(selectedDate), time })); // Create a new Date object here
    setAvailability([...availability, ...newSlots]);
    setShowModal(false);
    setTimeSlots([]);
  };

  const handleTimeInputChange = (event) => {
    const value = event.target.value;
    setNewTimeSlot(value);
  };

  const handleAddTimeSlot = () => {
    if (newTimeSlot.length === 5 && !timeSlots.includes(newTimeSlot)) {
      setTimeSlots([...timeSlots, newTimeSlot]);
      setNewTimeSlot('');
    }
  };

  const handleDeleteSlot = (index) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const handleConfirm = (id) => {
    alert(`Booking confirmed for ID ${id}`);
  };

  const handleCancel = (id) => {
    setUpcomingBookings(upcomingBookings.filter((booking) => booking.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center space-y-8">
      {/* Top Section: Profile and Calendar */}
      <div className="flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-8">

        {/* Profile Section */}
        <div className="w-full md:w-1/3 max-w-xs bg-[#0B0B2D] text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="w-60 h-64  rounded-full mb-4">
          <img src={picture} alt="profile" className="object-cover w-full h-full rounded-xl"  />
          </div>
          <h2 className="text-2xl font-semibold">Aaditya Maheshwari</h2>
          <p>@aaditya.maheshwari</p>
          <button className="mt-4 px-6 py-2 bg-white text-[#0B0B2D] rounded-md font-semibold">Edit Profile</button>
        </div>

        {/* Calendar Section */}
        <div className="w-full md:w-2/3  rounded-lg shadow-lg p-4 md:p-6">
        <Calendar
          localizer={localizer}
          events={availability.map(slot => ({
            title: `Available - ${slot.time}`,
            start: new Date(slot.date).setHours(...slot.time.split(':').map(Number)),
            end: new Date(slot.date).setHours(...slot.time.split(':').map(Number) + 1),
            allDay: false,
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
          selectable
          onSelectSlot={(slotInfo) => {
            setSelectedDate(slotInfo.start);
            setShowModal(true);
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: '#1E90FF', // Blue background for events
              color: 'white',              // White text color
              border: '2px solid #FF4500', // Orange border around events
              borderRadius: '5px',         // Rounded corners
              padding: '5px',
            },
          })}
        />

        </div>
      </div>

      {/* Modal for Time Slot Selection */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg space-y-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-center">Select Time Slots</h2>
            
            {/* Input for Time Slot */}
            <div className="flex items-center space-x-4">
              <input 
                type="time" 
                value={newTimeSlot}
                onChange={handleTimeInputChange}
                className="border rounded-lg w-full px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={handleAddTimeSlot} 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>

            {/* Displaying Added Time Slots */}
            <div className="space-y-2">
              {timeSlots.map((time, index) => (
                <div key={index} className="text-lg bg-gray-200 px-4 py-2 rounded-lg flex justify-between">
                  <span>{time}</span>
                  <button
                    onClick={() => setTimeSlots(timeSlots.filter((_, i) => i !== index))}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Save or Cancel Buttons */}
            <div className="flex justify-between space-x-4">
              <button onClick={handleAddSlot} className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">
                Save Slots
              </button>
              <button onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-2 rounded-lg w-full">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Width Sections for Availability and Bookings */}
      <div className="w-full space-y-8">
        
        {/* Availability Slots */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 space-y-4">
          <h3 className="text-xl font-semibold">Your Availability</h3>
          <ul className="space-y-2 flex flex-col items-center">
            {availability.map((slot, index) => (
              <li key={index} className="bg-blue-100 p-4 rounded-lg shadow flex justify-between w-full items-center">
                <span>{slot.date.toDateString()} - {slot.time}</span>
                <button 
                  onClick={() => handleDeleteSlot(index)} 
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 space-y-4">
          <h3 className="text-xl font-semibold">Upcoming Bookings</h3>
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className="bg-[#0B0B2D] text-white p-4 rounded-lg shadow-lg flex justify-between items-center w-full ">
              <div>
                <p>Meeting request from {booking.student} - {booking.date}</p>
                <p>Time: {booking.time}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleConfirm(booking.id)} 
                  className="bg-green-500 text-white px-3 py-1 rounded-lg"
                >
                  Confirm
                </button>
                <button 
                  onClick={() => handleCancel(booking.id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default InstructorDashboard;
