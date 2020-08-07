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
    // const filePath = req.file.path;
    try {
        const doc = await model.create({
            fullName: req.body.fullName,
            company: req.body.company,
            jobTitle: req.body.jobTitle,
            phone: req.body.phone,
            email: req.body.email,
            notes: req.body.notes,
            profilePicture: req.file.path
        });
        console.log(req.file);
        res.status(201).json({ data: doc });
    } catch(e) {
        console.error(e);
        res.status(400).end();
    }
}

const updateOne = model => async (req, res) => {
    try {
        const updatedDoc = await model
            .findOneAndUpdate(
                {
                    _id: req.params.id
                },
                req.body,
                { new: true }
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
