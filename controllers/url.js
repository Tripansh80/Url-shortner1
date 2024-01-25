const shortId = require('shortid');
const URL = require('../models/url');

async function handlegenerateshorturl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const generatedShortId = shortId(); // Use a different variable name

    try {
        await URL.create({
            shortId: generatedShortId,
            redirecturl: body.url,
            visithistory: [],
            createdBy: req.user._id,
        });

        return res.render("home",{ id: generatedShortId });
    } catch (error) {
        console.error('Error saving to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function handlegetanalytics(req,res){
const shortId=req.params.shortId;
const result=await URL.findOne({shortId});
return res.json({
    totalclicks: result.visithistory.length,analytics:result.visithistory,
})

}
module.exports = {
    handlegenerateshorturl,
    handlegetanalytics,
};






