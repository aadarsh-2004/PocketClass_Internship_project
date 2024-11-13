
const firebaseConfig = require('./firebaseConfig');

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
// Add Availability
exports.addAvailability = functions.https.onCall(async (data, context) => {
    const { instructorId, date, timeSlots } = data;
    const availabilityRef = db.collection('instructors').doc(instructorId).collection('availability').doc(date);
    
    await availabilityRef.set({ timeSlots }, { merge: true });
    return { message: "Availability added successfully" };
});
// Fetch Availability
exports.getAvailability = functions.https.onCall(async (data, context) => {
    const { instructorId, date } = data;
    const availabilityRef = db.collection('instructors').doc(instructorId).collection('availability').doc(date);
    
    const doc = await availabilityRef.get();
    return doc.exists ? doc.data() : { timeSlots: [] };
});
// Book a Slot
exports.bookSlot = functions.https.onCall(async (data, context) => {
    const { studentId, instructorId, date, timeSlot } = data;
    const bookingRef = db.collection('bookings').doc();
    
    await bookingRef.set({
        studentId,
        instructorId,
        date,
        timeSlot,
        status: "confirmed",
    });
    
    // Update availability for the instructor
    const availabilityRef = db.collection('instructors').doc(instructorId).collection('availability').doc(date);
    await availabilityRef.update({
        bookedSlots: admin.firestore.FieldValue.arrayUnion(timeSlot)
    });
    
    return { message: "Booking confirmed" };
});
// Cancel Booking
exports.cancelBooking = functions.https.onCall(async (data, context) => {
    const { bookingId, instructorId, date, timeSlot } = data;
    const bookingRef = db.collection('bookings').doc(bookingId);
    
    await bookingRef.update({ status: "canceled" });
    
    // Update availability to reopen the time slot
    const availabilityRef = db.collection('instructors').doc(instructorId).collection('availability').doc(date);
    await availabilityRef.update({
        bookedSlots: admin.firestore.FieldValue.arrayRemove(timeSlot)
    });
    
    return { message: "Booking canceled" };
});

