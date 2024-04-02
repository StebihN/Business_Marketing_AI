const Name = require('../models/Name');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const apiKey = process.env.AI_API_KEY;

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

exports.generateName = async (req, res) => {
    if (!req.body.field) {
        return res.status(400).send({
            message: "Field can not be empty!"
        });
    }
    if (!req.body.products) {
        return res.status(400).send({
            message: "Products can not be empty!"
        });
    }
    const nameRequest = {
        field: req.body.field,
        products: req.body.products
    }

    const prompt =
        `Podaj 5 predlogov za ime podjetja, ki deluje na področju ${nameRequest.field} in ponuja izdelke oz. storitve, kot so: ${nameRequest.products}. Odgovor podaj v tej JSON obliki: 
        {
            "name1": "..",
            "name2": "..", 
            "name3": "..", 
            "name4": "..", 
            "name5": ".."
        }`

    try {
        const completion = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            max_tokens: 100,
        });
        console.log(completion.data.choices[0].text);
        return res.send(completion.data.choices[0].text)
    } catch (error) {
        console.log(error.response.status)
        console.log(error.response.statusText)
        return res.status(error.response.status).send({
            message: error.response.statusText
        })
    }
}
exports.saveName = async (req, res) => {
    const { user, name1, name2, name3, name4, name5 } = req.body;
    try {
        const result = await Name.create({
            user: user,
            names: {
                name1: name1,
                name2: name2,
                name3: name3,
                name4: name4,
                name5: name5
            }
        })

        return res.status(201).json({ success: `new entry ${JSON.stringify(result)} inserted` });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
}
exports.getName = async (req, res) => {
    const user = req.params.id
    try {
        const result = await Name.find({ user: { $eq: user } });
        return res.status(200).send(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
}

exports.deleteName = async (req, res) => {
    const id = req.params.id
    try {
        await Name.deleteOne({ _id: { $eq: id } });
        return res.status(200).json({message: "Name deleted"});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
}