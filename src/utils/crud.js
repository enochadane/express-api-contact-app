const Contact = require('../contact/contact.model');
const { findById } = require('../contact/contact.model');

const getOne = model => async (req, res) => {
    try {
        const doc = await model.findOne({ _id: req.params.id });

        if (!doc) {
            return res.status(400).end();
        }

        res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

const getMany = model => async (req, res) => {
    try {
        const docs = await model.find();

        res.status(200).json({ data: docs });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

const createOne = model => async (req, res) => {
    var filePath = ''
    if (req.file) {
        filePath = req.file.path
    }
    try {
        const doc = await model.create({
            fullName: req.body.fullName,
            company: req.body.company,
            jobTitle: req.body.jobTitle,
            phone: req.body.phone,
            email: req.body.email,
            notes: req.body.notes,
            profilePicture: filePath,
            creatorId: req.body.creatorId
        });
        console.log(req.body);
        res.status(201).json({ data: doc });
    } catch(e) {
        console.error(e);
        res.status(400).end();
    }
}

const updateOne = model => async (req, res) => {
    var filePath;
    if (req.file) {
        filePath = req.file.path
    }
    Contact.findById({ _id: req.body._id })
        .exec()
        .then(contact => {
            filePath = contact.profilePicture
        })
        .catch(err => console.log(err));
    console.log(filePath)
    try {
        const updatedDoc = await model.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {$set: {
                    'fullName': req.body.fullName,
                    'company': req.body.company,
                    'jobTitle': req.body.jobTitle,
                    'phone': req.body.phone,
                    'email': req.body.email,
                    'notes': req.body.notes,
                    'profilePicture': filePath
                }},
                { new: true },
                (err, doc) => {
                    if(err){
                        console.log("update error" + err);
                    }
                }
            );

        if (!updatedDoc) {
            return res.status(400).end();
        }

        res.status(200).json({ data: updatedDoc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

const removeOne = model => async (req, res) => {
    try {
        const removed = await model.findOneAndRemove({
            _id: req.params.id
        });

        if (!removed) {
            return res.status(400).end();
        }

        return res.status(200).json({ data: removed });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

const crudCotnrollers = model => ({
    createOne: createOne(model),
    getOne: getOne(model),
    getMany: getMany(model),
    updateOne: updateOne(model),
    removeOne: removeOne(model)
});

module.exports = crudCotnrollers;
