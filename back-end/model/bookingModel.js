const mongoose = require('mongoose');


const bookingSchema = mongoose.Schema(
    {
        userId : { type : String, require : true },
        classId : { type : Number , require : true },
        status : { type : String }
    },
    {
        timestamps : true
    }
)

const Booking = mongoose.model('Booking',bookingSchema);
module.exports = Booking;