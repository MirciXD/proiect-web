const AttendanceDB = require("../models").attendance;
const { attendance } = require("../models");
const EventController = require("./events");
const EventsDB = require("../models").event;

const { Op } = require('sequelize');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");

const controller = {
    addAttendance: async (req, res) => {
        const { userId, checkInTime } = req.body;
        console.log(userId, checkInTime);

        let errors = [];
    
        if (!userId || !checkInTime) {
          console.log("Please provide all information");
          errors.push("Please provide all information");
        } else if (errors.length === 0) {
          try {
            const code = req.params.code;
            const foundEvent = await EventsDB.findOne({ where: { code } });
    
            console.log('Found Event:', foundEvent);
    
            if (!foundEvent || !foundEvent.eventId) {
              console.log("Event not found");
              res.status(404).send({ message: "Event not found" });
              return;
            }
    
            const eventId = foundEvent.eventId;

            const attendance = await AttendanceDB.create({ 
                userUserId: userId, 
                checkInTime: checkInTime, 
                eventEventId: eventId 
            });
    
            console.log('Attendance:', attendance);
    
            res.status(201).send(attendance);
          } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ message: "Server error" });
          }
        }
      },

      getAllAttendances: async (req, res) => {
        try {
          const id = req.params.id;
    
          const attendances = await AttendanceDB.findAll({
            where: {
              eventEventId: id,
            },
          });
    
          const csvWriter = createCsvWriter({
            path: path.join(__dirname, "attendances.csv"),
            header: [
              { id: "id", title: "Attendance ID" },
              { id: "userUserId", title: "User ID" },
              { id: "checkInTime", title: "Check-in Time" },
            ],
          });
    
          csvWriter.writeRecords(attendances).then(() => {
            res.attachment("attendances.csv");
            res.sendFile(path.join(__dirname, "attendances.csv")); // Use the full file path
          });
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send({ message: "Server error" });
        }
      },
};

module.exports = controller;
