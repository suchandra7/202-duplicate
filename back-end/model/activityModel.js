const mongoose = require('mongoose');

const activitySchema = mongoose.Schema(
    {
        activityId : { type : String, require : true, unique : true},
        activityname : { type : String, require : true}
    },
    {
        timestamps : true
    }
)

const Activity = mongoose.model('Activity',activitySchema);
module.exports = Activity;