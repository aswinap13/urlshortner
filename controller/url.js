const shortId = require("shortid");
const URL = require("../model/url");

async function generateShortUrl(req,res){

    if(!req.body.redirectURL) return res.status(400).json({"Message" : "Provide URL missing"});

    const shortUrl = shortId();
    const respnse = await URL.create({
        shortId : shortUrl,
        redirectURL : req.body.redirectURL,
        visitHistory : []
    })

    return res.status(200).json({
        "Message" : "Successfully generated shortUrl",
        "shortUrl" : respnse.shortId
    });
}

async function getRedirectUrl(req,res){
    try {
        const response = await URL.findOneAndUpdate(
            { shortId: req.params.shortId }, 
            {
                $push: { visitHistory: { timestamps: Date.now() } } 
            },
            { new: true }
        );

        if (response) {
            let url = response.redirectURL;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'http://' + url;
            }
            return res.redirect(url);
        } else {
            return res.status(404).send('URL not Found');
        }
    } catch (error) {
        console.error("Error fetching redirect URL:", error);
        return res.status(500).send('Internal Server Error');
    }
}

async function getUrlAnalytics(req,res){
    try{
        const response = await URL.findOne(
            { shortId: req.params.shortId }
        );
        const hist= response.visitHistory.length;
        return res.status(200).json({
            "total visits" : hist
        });
        console.log("check for personal push");
    }catch(error){ 
        console.error("Error :", error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {generateShortUrl,getRedirectUrl,getUrlAnalytics};