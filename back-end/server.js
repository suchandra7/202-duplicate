const express = require('express')
// const axios = require('axios')
const mongoose = require('mongoose');
const app = express()
const port = 3000
const Membership = require('./model/membershipModel')
const User = require('./model/userModel')
const Admin = require('./model/adminModel')
const Activity = require('./model/activityModel')
const Class = require('./model/classModel')
const Booking = require('./model/bookingModel')
const LogMachineTracking = require('./model/logMachineTrackingModel')
const CheckInNOut = require('./model/checkInNOutModel')
const MembershipPlan = require('./model/membershipPlan')

const cors = require("cors")
app.use(express.json())

require('dotenv').config();

app.use(
  cors({
    origin : "*",
  })
)


app.listen(port, () => {
  console.log(`Gym Management app is running on ${port}`)
})

mongoose.connect("mongodb+srv://suchandranathbajjuri:Suchi7@cluster202.v83m9mk.mongodb.net/Gym_Management?retryWrites=true&w=majority")
  .then(() => {

    app.get('/', (req, res) => {
      res.send('Hello suchi!')
    })
    console.log('Connected!')

    app.get('/gym',(req,res)=>{
      res.send('inside 202 Gym')
    })

    // gets all the avilable member ids along with user ids
    app.get('/members', async(req,res)=>{
      try {
        const memberships= await Membership.find({});
        res.status(200).json(memberships);
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
        
      }
    })

    // gets an individual memberid based on _id
    app.get('/members/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const membership = await Membership.findById(id);
        res.status(200).json(membership);
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // adds membershipId  and userId
    app.post('/addMembership',async(req,res)=>{
      try {
        const membership = await  Membership.create(req.body)
        res.status(200).json(membership)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //delete a membership based on _id
    app.delete('/members/:id', async(req,res)=>{
      try {
        const {id} = req.params;
        const membership = await Membership.findByIdAndDelete(id);
        if(!membership){
          res.status(404).json({message: `cannot find any membership with ${id}` })
        }
        res.status(200).json({message: `deleted membership with ${id}`});
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // ------------------------------- User specific endpoints -----------------------------------

    // add user 
    app.post('/addUser',async(req,res)=>{
      try {
        const user = await User.create(req.body)
        res.status(200).json(user)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // to validate user name and password of user
    app.post('/user/validate', async(req,res)=>{
      try {
        const givenUserId = req.body.userId
        const givenPassword = req.body.password
        const user = await User.findOne( { userId : givenUserId} )
        if(!user){
          return res.status(401).json({ login: false} )
        }
        if( user.userId == givenUserId && user.password == givenPassword){

          res.status(200).json( {userId : user.userId, role : user.role, email : user.email, name : user.name} );
        }else{
          res.status(401).json({ login: false} )
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })


    // gets all users information
    app.get('/user',async(req,res)=>{
      try {
        const users = await User.find({})
        res.status(200).json(users)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //gets a specific user based on _id
    app.get('/user/:id',async(req,res)=>{
      try {
        const {id} = req.params
        const users = await User.findById(id)
        res.status(200).json(users)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to delete a specific user
    app.delete('user/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        if(!user){
          res.status(404).json({message: `cannot find any user with ${id}` })
        }
        res.status(200).json({message: `deleted user with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to update a specific user details based on _id
    app.put('/user/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const user = await User.findByIdAndUpdate(id,req.body)
        if(!user){
          res.status(404).json({message: `cannot find any user with ${id}` })
        }
        res.status(200).json({message: `updated user with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // make non-member user as member 
    app.patch('/user/updateUserMembership/',async(req,res)=>{
      try {
        const userId = req.body.userId
        const months = req.body.months
        const startDate = new Date();
        const endDate = new Date(startDate.getTime());
        endDate.setMonth(startDate.getMonth() + months);
        const user = await User.findOne( { userId : userId} )
        console.log(startDate)
        console.log(endDate)
        if(!user){
          return res.status(404).json({ message: 'User not found' });
        }
        user.role = "Member"
        user.membershipStartDate = startDate
        user.membershipEndDate = endDate
        await user.save();
        res.status(200).json({ success: true, message: 'User record updated & successfully made as member.' })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // ------------------------------- Admin specific endpoints -----------------------------------

    // add admin 
    app.post('/addAdmin',async(req,res)=>{
      try {
        const admin = await Admin.create(req.body)
        res.status(200).json(admin)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })


     // to validate user name and password of admin
     app.post('/admin/validate', async(req,res)=>{
      try {
        const givenAdminId = req.body.adminId
        const givenPassword = req.body.password
        const admin = await Admin.findOne( { adminId : givenAdminId } )
        if(!admin){
          return res.status(401).json({ login: false} )
        }
        if( admin.adminId == givenAdminId && admin.password == givenPassword){
          res.status(200).json( {login: true} )
        }else{
          res.status(401).json({ login: false} )
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // gets all admins information
    app.get('/admin',async(req,res)=>{
      try {
        const admins = await Admin.find({})
        res.status(200).json(admins)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //gets a specific admin based on _id
    app.get('/admin/:id',async(req,res)=>{
      try {
        const {id} = req.params
        const admins = await Admin.findById(id)
        res.status(200).json(admins)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to delete a specific admin
    app.delete('admin/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const admin = await Admin.findByIdAndDelete(id)
        if(!admin){
          res.status(404).json({message: `cannot find any admin with ${id}` })
        }
        res.status(200).json({message: `deleted admin with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to update a specific admin details
    app.put('/admin/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const admin = await Admin.findByIdAndUpdate(id,req.body)
        if(!admin){
          res.status(404).json({message: `cannot find any admin with ${id}` })
        }
        res.status(200).json({message: `updated admin with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

// ------------------------------- Activity specific endpoints -----------------------------------

    // add activity 
    app.post('/addActivity',async(req,res)=>{
      try {
        const activity = await Activity.create(req.body)
        res.status(200).json(activity)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // gets all activitys information
    app.get('/activity',async(req,res)=>{
      try {
        const activitys = await Activity.find({})
        res.status(200).json(activitys)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // get activity id based on activity name
    app.get('/activityByName/:name',async(req,res)=>{
      try {
        const activityName = req.params.name; 
        // console.log(activityName)
        const activityId = await Activity.findOne({ activityname : activityName})
        if (!activityId) {
          return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(activityId);
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //gets a specific activity based on _id
    app.get('/activity/:id',async(req,res)=>{
      try {
        const {id} = req.params
        const activitys = await Activity.findById(id)
        res.status(200).json(activitys)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to delete a specific activity
    app.delete('activity/:id', async(req,res)=>{
    try {
      const {id} = req.params
      const activity = await Activity.findByIdAndDelete(id)
      if(!activity){
        res.status(404).json({message: `cannot find any activity with ${id}` })
      }
      res.status(200).json({message: `deleted activity with ${id}` })
    } catch (error) {
      console.log(error)
      res.status(500).json({message: error.message})
    }
    })

    // ------------------------------- Class specific endpoints -----------------------------------

    // add class 
    app.post('/addClass',async(req,res)=>{
      try {
        const classe = await Class.create(req.body)
        res.status(200).json(classe)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })



      // return future classes (one week) of a user
    app.get('/futureClass/:uId', async ( req,res)=>{
      try {
        const userId = req.params.uId
        const bookings = await Booking.find( { userId : userId})
        const classIds = [];
        bookings.forEach(booking => {
          classIds.push(booking.classId)
        });
        //hard coded need to change if we change activities in DB
        const activityMap = new Map();
        activityMap.set("1","thread_mill")
        activityMap.set("2","cross fit")
        activityMap.set("3","cross ramp")
        activityMap.set("4","Boxing")
        activityMap.set("5","Dance")
        activityMap.set("6","Yoga")
        const classesInfoJSc = { classesJson: [] }
        console.log(typeof classesInfoJSc);
        // const classesInfoJSc = JSON.parse(JSON.stringify(classesInfo));
        // const classe = await Class.findOne( { classId : "101" })
        console.log("class ids lenght")
        console.log(classIds.length)
        const promises = [];
        const currentDate = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        classIds.forEach( (classId) => {
          // const classe = await Class.findOne( { classId : classId })
          const promise = Class.findOne( { classId : classId }).then( (classe)=>{
            console.log("inside this");
            console.log(classe.classId);
            if (currentDate <= classe.startTime && classe.startTime <= nextWeek) {
              classesInfoJSc.classesJson.push( { className: activityMap.get(classe.activityId), classId :classe.classId, location : classe.location, startTime: classe.startTime, endTime : classe.endTime, instructor : classe.instructor })
            }
          }).catch((err)=>{
            console.log(err)
          });
          // console.log(classe); // printing as expected
          promises.push(promise)
        })
        
        Promise.all(promises).then(() => {
          console.log("length");
          console.log(classesInfoJSc.classesJson.length);
          classesInfoJSc.classesJson.forEach((c)=>{
            console.log("here")
            console.log(c);
            // Activity.findOne({activityId : c.activityId })
          })
          res.status(200).json(classesInfoJSc.classesJson)
        }).catch((err) => {
          console.log(err);
        });
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // gets all classes information
    app.get('/class',async(req,res)=>{
      try {
        const classes = await Class.find({})
        res.status(200).json(classes)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //gets a specific class based on _id
    app.get('/class/:id',async(req,res)=>{
      try {
        const {id} = req.params
        const classes = await Class.findById(id)
        res.status(200).json(classes)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to delete a specific class
    app.delete('class/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const classe = await Class.findByIdAndDelete(id)
        if(!classe){
          res.status(404).json({message: `cannot find any class with ${id}` })
        }
        res.status(200).json({message: `deleted class with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to update a specific class details
    app.put('/class/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const classe = await Class.findByIdAndUpdate(id,req.body)
        if(!classe){
          res.status(404).json({message: `cannot find any class with ${id}` })
        }
        res.status(200).json({message: `updated class with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })


    // ------------------------------- Booking specific endpoints -----------------------------------

    // add booking 
    app.post('/addBooking',async(req,res)=>{
      try {
        const booking = await Booking.create(req.body)
        res.status(200).json(booking)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // gets all bookings information
    app.get('/booking',async(req,res)=>{
      try {
        const bookings = await Booking.find({})
        res.status(200).json(bookings)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //gets a specific booking based on _id
    app.get('/booking/:id',async(req,res)=>{
      try {
        const {id} = req.params
        const bookings = await Booking.findById(id)
        res.status(200).json(bookings)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to delete a specific booking
    app.delete('booking/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const booking = await Booking.findByIdAndDelete(id)
        if(!booking){
          res.status(404).json({message: `cannot find any booking with ${id}` })
        }
        res.status(200).json({message: `deleted booking with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to update a specific booking details
    app.put('/booking/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const booking = await Booking.findByIdAndUpdate(id,req.body)
        if(!booking){
          res.status(404).json({message: `cannot find any booking with ${id}` })
        }
        res.status(200).json({message: `updated booking with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })


    // ------------------------------- logMachineTracking specific endpoints -----------------------------------

    // add logMachineTracking 
    app.post('/addlogMachineTracking',async(req,res)=>{
      try {
        const logMachineTracking = await LogMachineTracking.create(req.body)
        res.status(200).json(logMachineTracking)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // gets all logMachineTracking information
    app.get('/logMachineTracking',async(req,res)=>{
      try {
        const logMachineTrackings = await LogMachineTracking.find({})
        res.status(200).json(logMachineTrackings)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //gets a specific logMachineTracking based on _id
    app.get('/logMachineTracking/:id',async(req,res)=>{
      try {
        const {id} = req.params
        const logMachineTrackings = await LogMachineTracking.findById(id)
        res.status(200).json(logMachineTrackings)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to delete a specific logMachineTracking
    app.delete('logMachineTracking/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const logMachineTracking = await LogMachineTracking.findByIdAndDelete(id)
        if(!logMachineTracking){
          res.status(404).json({message: `cannot find any logMachineTracking with ${id}` })
        }
        res.status(200).json({message: `deleted logMachineTracking with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to update a specific logMachineTracking details
    app.put('/logMachineTracking/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const logMachineTracking = await LogMachineTracking.findByIdAndUpdate(id,req.body)
        if(!logMachineTracking){
          res.status(404).json({message: `cannot find any logMachineTracking with ${id}` })
        }
        res.status(200).json({message: `updated logMachineTracking with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })


    // ------------------------------- CheckInNOut specific endpoints -----------------------------------

    // add checkInNOut 
    app.post('/addcheckInNOut',async(req,res)=>{
      try {
        const checkInNOut = await CheckInNOut.create(req.body)
        res.status(200).json(checkInNOut)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // gets all checkInNOut information
    app.get('/checkInNOut',async(req,res)=>{
      try {
        const checkInNOuts = await CheckInNOut.find({})
        res.status(200).json(checkInNOuts)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //gets a specific checkInNOut based on _id

    //null api --> db.collection.find({ column: { $type: 10 } })

    // app.post('/checkInNOut/')
    app.get('/checkInNOut/:id',async(req,res)=>{
      try {
        const {id} = req.params
        const checkInNOuts = await CheckInNOut.findById(id)
        res.status(200).json(checkInNOuts)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to delete a specific checkInNOut
    app.delete('checkInNOut/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const checkInNOut = await CheckInNOut.findByIdAndDelete(id)
        if(!checkInNOut){
          res.status(404).json({message: `cannot find any checkInNOut with ${id}` })
        }
        res.status(200).json({message: `deleted checkInNOut with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //to update a specific checkInNOut details
    app.put('/checkInNOut/:id', async(req,res)=>{
      try {
        const {id} = req.params
        const checkInNOut = await CheckInNOut.findByIdAndUpdate(id,req.body)
        if(!checkInNOut){
          res.status(404).json({message: `cannot find any checkInNOut with ${id}` })
        }
        res.status(200).json({message: `updated checkInNOut with ${id}` })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //gets a specific checkInNOut based on _id

    //null api --> db.collection.find({ column: { $type: 10 } })

    //update checkin time
    app.post('/updateCheckIn/:uId', async(req,res)=>{
      try {
        const userId = req.params.uId;
        const checkInNOut = await CheckInNOut.create({userId : userId,  checkInTime : new Date()})
        res.status(200).json(checkInNOut)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    //updates only specific row of user wheere checkin in present and check out is not present
    app.patch('/updateCheckOut/:uId', async(req,res)=>{
      try {
        const userId = req.params.uId
        CheckInNOut.findOne( {userId : userId, checkOutTime : {  $exists: false  } } ).then( checkInNOutUser => {
          console.log(checkInNOutUser.checkInId)
          checkInNOutUser.checkOutTime = new Date();
          checkInNOutUser.save();
          res.status(200).json({ success: true, message: 'Check out time updated successfully.' })
        })
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

     // ------------------------------- MembershipPlan specific endpoints -----------------------------------

    // add membership 
    app.post('/addMembershipPlan',async(req,res)=>{
      try {
        const mambershipPlan = await MembershipPlan.create(req.body)
        res.status(200).json(mambershipPlan)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // gets membership plan based on months provided in the url
    app.get('/membershipPlan/:months',async(req,res)=>{
      try {
        const months = req.params.months
        const membershipPlan = await MembershipPlan.findOne( { noOfMonths : months} )
        if(!membershipPlan){
          res.status(404).json( { message: "membership plan with given months not present"})
        }
        res.status(200).json(membershipPlan)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // gets all membership plans
    app.get('/membershipPlan',async(req,res)=>{
      try {
        const membershipPlan = await MembershipPlan.find({})
        if(!membershipPlan){
          res.status(404).json( { message: "membership plan with given months not present"})
        }
        res.status(200).json(membershipPlan)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    

  }
  ).catch((error)=>console.log("db connection error"+error));