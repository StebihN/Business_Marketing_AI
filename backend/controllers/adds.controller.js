const Add = require('../models/Add')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const apiKey = process.env.AI_API_KEY;

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

exports.generateAdd = async (req, res) => {
    if (!req.body.product) {
        return res.status(400).send({
            message: "Field can not be empty!"
        });

    }
    if (!req.body.description) {
        return res.status(400).send({
            message: "Description can not be empty!"
        });

    }
    if (!req.body.type) {
        return res.status(400).send({
            message: "Type can not be empty!"
        });

    }
    if (!req.body.target) {
        return res.status(400).send({
            message: "Target can not be empty!"
        });

    }
    if (!req.body.length) {
        return res.status(400).send({
            message: "Length can not be empty!"
        });

    }
    const addRequest = {
        product: req.body.product,
        description: req.body.description,
        type: req.body.type,
        target: req.body.target,
        length: req.body.length
    }
    let prompt;

    if (addRequest.type === "video") {
        prompt = `Podaj predlog za oglas za izdelek oz. storitev ${addRequest.product}, z sledečim opisom: ${addRequest.description}. Oglas naj bo namenjen ${addRequest.target}. Oglas naj bo v obliki videa. Oglas naj bo dolg okrog ${addRequest.length} besed. Odgovor podaj v tej JSON obliki: 
        {
            "title": "naslov", 
            "type": "format oglasa (video)",
            "text": "besedilo oglasa", 
            "extra": "scenarij videa"
        }`
    }
    else if (addRequest.type === "post") {
        prompt = `Podaj predlog za oglas za izdelek oz. storitev ${addRequest.product}, z sledečim opisom: ${addRequest.description}. Oglas naj bo namenjen ${addRequest.target}. Oglas naj bo v obliki objave na družbenih omrežjih. Oglas naj bo dolg okrog ${addRequest.length} besed. Odgovor podaj v tej JSON obliki: 
        {
            "title": "naslov",
            "type": "format oglasa (post)",
            "text": "besedilo oglasa",
            "extra": "dodatna vsebina objave"
        }`
    }
    else if (addRequest.type === "poster") {
        prompt = `Podaj predlog za oglas za izdelek oz. storitev ${addRequest.product}, z sledečim opisom: ${addRequest.description}. Oglas naj bo namenjen ${addRequest.target}. Oglas naj bo v obliki plakata. Oglas naj bo dolg okrog ${addRequest.length} besed. Odgovor podaj v tej JSON obliki:
        {
            "title": "naslov",
            "type": "format oglasa (poster)",
            "text": "besedilo",
            "extra": "izgled plakata"
        }`
    }

    try {
        const completion = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            max_tokens: 500,
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

exports.saveAdd = async (req, res) => {
    const { user, title, text, type, extra } = req.body;
    try {
        const result = await Add.create({
            user: user,
            title: title,
            type: type,
            text: text,
            extra: extra
        })

        return res.status(201).json({ success: `new entry ${JSON.stringify(result)} inserted` });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
}
exports.getAdd = async (req, res) => {
    const user = req.params.id
    try {
        const result = await Add.find({ user: { $eq: user } });
        return res.status(200).send(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
}

exports.deleteAdd = async (req, res) => {
    const id = req.params.id
    try {
        await Add.deleteOne({ _id: { $eq: id } });
        return res.status(200).json({ message: "add deleted" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
}