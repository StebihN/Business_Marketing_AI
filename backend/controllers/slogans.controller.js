const Slogan = require("../models/Slogan")
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const apiKey = process.env.AI_API_KEY;

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

exports.generateSlogan = async (req, res) => {
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
    if (!req.body.length) {
        return res.status(400).send({
            message: "Length can not be empty!"
        });
    }
    if (!req.body.target) {
        return res.status(400).send({
            message: "Target can not be empty!"
        });
    }
    const sloganRequest = {
        field: req.body.field,
        products: req.body.products,
        length: req.body.length,
        target: req.body.target
    }
    const prompt =
        `Podaj 5 predlogov za slogan podjetja, ki deluje na področju ${sloganRequest.field} in ponuja izdelke oz. storitve, kot so: ${sloganRequest.products}. Slogan naj bo dolg okrog ${sloganRequest.length} besed in naj bo namenjen ${sloganRequest.target}. Odgovor podaj v tej JSON obliki: 
        {
            "slogan1": "..",
            "slogan2": "..",
            "slogan3": "..",
            "slogan4": "..",
            "slogan5": ".."
        }`

    try {
        const completion = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            max_tokens: 300,
        });
        console.log(completion.data.choices[0].text);
        res.send(completion.data.choices[0].text)
    } catch (error) {
        console.log(error.response.status)
        console.log(error.response.statusText)
        return res.status(error.response.status).send({
            message: error.response.statusText
        })
    }
}

exports.saveSlogan = async (req, res) => {
    const { user, slogan1, slogan2, slogan3, slogan4, slogan5 } = req.body;
    try {
        const result = await Slogan.create({
            user: user,
            slogans: {
                slogan1: slogan1,
                slogan2: slogan2,
                slogan3: slogan3,
                slogan4: slogan4,
                slogan5: slogan5
            }
        })

        return res.status(201).json({ success: `new entry ${JSON.stringify(result)} inserted` });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
}
exports.getSlogan = async (req, res) => {
    const user = req.params.id
    try {
        const result = await Slogan.find({ user: { $eq: user } });
        return res.status(200).send(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
}

exports.deleteSlogan = async (req, res) => {
    const id = req.params.id
    try {
        await Slogan.deleteOne({ _id: { $eq: id } });
        return res.status(200).json({message: "slogan deleted"});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
}