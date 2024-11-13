import React,{useState} from 'react'
import picture from './Picture1.jpg'
const InstructorDashboard = () => {
    const [selectedDateIndex, setSelectedDateIndex] = useState(4); // Start at the last date
    const [selectedTime, setSelectedTime] = useState("7:00 PM");
  
    // Dates Array
    const dates = [
      { day: "16 Sept", label: "Mon", available: true },
      { day: "17 Sept", label: "Tue", available: false }, // Booked
      { day: "18 Sept", label: "Wed", available: true },
      { day: "19 Sept", label: "Thur", available: false }, // Booked
      { day: "20 Sept", label: "Fri", available: true },
      { day: "21 Sept", label: "Thur", available: false }, // Booked
    ];
  
    // Time Slots Array
    const timeSlots = [
      { time: "6:00 PM", available: true },
      { time: "7:00 PM", available: false }, // Booked
      { time: "9:00 PM", available: true },
      { time: "10:00 AM", available: false }, // Booked
      { time: "12:00 AM", available: true },
    ];
  
    // Previous Booked Sessions Array
    const previousSessions = [
      { date: "12 Sept", time: "4:00 PM", student: "Aadarsh" },
      { date: "13 Sept", time: "2:00 PM", student: "John" },
    ];
  
    // Upcoming Sessions Array
    const upcomingSessions = [
      { date: "22 Sept", time: "5:00 PM", student: "Jane" },
      
    ];
  
    // Handle Arrow Clicks
    const handleLeftArrowClick = () => {
      if (selectedDateIndex > 0) setSelectedDateIndex(selectedDateIndex - 1);
    };
  
    const handleRightArrowClick = () => {
      if (selectedDateIndex < dates.length - 1)
        setSelectedDateIndex(selectedDateIndex + 1);
    };
  
    return (
      <div className="flex flex-col md:flex-row justify- items-start p-4 space-y-6 md:space-y-0 md:space-x-8 bg-gray-100 min-h-screen">
        {/* Left Profile Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-full md:w-1/3 max-w-sm">
          <div className="w-[300px] h-[400px] bg-gray-300 rounded-full mb-4">
            <img src={picture} alt="profile" className="object-cover w-full h-full"  />
          </div>
          
          <h2 className="text-2xl font-semibold">Aaditya Maheshwari</h2>
          <p className="text-gray-500 mb-6">Professor</p>
          <button className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold mb-8">
            Back to Home
          </button>
          <div className="space-y-4 text-gray-700 mb-36">
            <p>Profile</p>
            <p>Packages</p>
            <p>Reviews</p>
            <p>Contact Info</p>
          </div>
        </div>
  
        {/* Right Calendar Section */}
        <div className="flex flex-col bg-white rounded-lg shadow-2xl p-6 w-full md:w-2/3 ">
          {/* Date Selection */}
          <h3 className="text-xl font-semibold mb-4">Select Best Date for you:</h3>
          <div className="flex justify-between items-center mb-16">
            <button
              className={`text-blue-900 font-semibold text-xl ${
                selectedDateIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleLeftArrowClick}
            >
              &lt;
            </button>
            <div className="flex space-x-4">
              {dates.map((date, index) => (
                <button
                  key={date.day}
                  className={`px-4 py-2 border-2 rounded-lg font-semibold ${
                    selectedDateIndex === index
                      ? "bg-[#0B0B2D] text-white"
                      : date.available
                      ? "border-[#0B0B2D] text-[#0B0B2D] border-2 shadow-lg shadow-blue-200 hover:scale-125"
                      : "border-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() => date.available && setSelectedDateIndex(index)}
                  disabled={!date.available} // Disable if unavailable
                >
                  <div>{date.day}</div>
                  <div className="text-sm">{date.label}</div>
                </button>
              ))}
            </div>
            <button
              className={`text-[#0B0B2D] font-semibold text-xl ${
                selectedDateIndex === dates.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleRightArrowClick}
            >
              &gt;
            </button>
          </div>
  
          {/* Time Slot Selection */}
          <h3 className="text-xl font-semibold mb-4">Available time slots:</h3>
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  className={`px-4 py-2 border-2 rounded-lg font-semibold  ${
                    selectedTime === slot.time
                      ? "bg-[#0B0B2D] text-white"
                      : slot.available
                      ? "border-[#0B0B2D] text-[#0B0B2D] hover:scale-125    "
                      : "border-gray-300 text-gray-300 cursor-not-allowed"
                  }`}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available} // Disable if unavailable
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
  
          {/* Proceed Button */}
          <div className="flex justify-center mb-8">
            <button className="bg-[#0B0B2D] text-white px-8 py-3 rounded-lg font-semibold">
              Proceed
            </button>
          </div>
          
          {/* Upcoming Sessions Section */}
          <h3 className="text-xl font-semibold mb-4">Upcoming Sessions:</h3>
          <div className="space-y-4 mb-8">
            {upcomingSessions.map((session, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-blue-100 p-4 rounded-lg"
              >
                <div>
                  <p>
                    Date: <span className="font-bold">{session.date}</span>
                  </p>
                  <p>
                    Time: <span className="font-bold">{session.time}</span>
                  </p>
                  <p>
                    Student: <span className="font-bold">{session.student}</span>
                  </p>
                </div>
              </div>
            ))}
            </div>
          
  
          {/* Previous Sessions Section */}
          <h3 className="text-xl font-semibold mb-4">Previous Booked Sessions:</h3>
          <div className="space-y-4">
            {previousSessions.map((session, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-200 p-4 rounded-lg"
              >
                <div>
                  <p>
                    Date: <span className="font-bold">{session.date}</span>
                  </p>
                  <p>
                    Time: <span className="font-bold">{session.time}</span>
                  </p>
                  <p>
                    Student: <span className="font-bold">{session.student}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default InstructorDashboard;
  