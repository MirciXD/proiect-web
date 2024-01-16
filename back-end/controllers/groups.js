const GroupsDB = require("../models").group;

const controller = {
    addGroup: async (req, res) => {
        const group = {
            name : req.body.name,
            userId : req.body.userId
        };

        let errors = {};

        if (Object.keys(errors).length === 0) {
            GroupsDB.create(group)
                .then(() => {
                    res.status(201).send({
                        message: "Group added successfully!"
                    });
                })
                .catch(() => {
                    res.status(500).send({ message: "Server error!" });
                });
        } else {
            res.status(400).send(errors);
        }
    },

    getAllGroups: async (req, res) => {
        GroupsDB.findAll()
            .then(groups => res.status(200).send(groups))
            .catch(err => res.status(500).send(err));
    },

    getGroupById: async (req, res) => {
        GroupsDB.findByPk(req.params.id)
            .then(groups => res.status(200).send(groups))
            .catch(err => res.status(500).send(err));
    },
}

module.exports = controller;