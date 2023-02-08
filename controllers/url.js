import { Url } from '../models/url.js';
import { nanoid } from 'nanoid';

async function postOrigUrl(req, res, next) {
    const { origUrl } = req.body;
    const urlId = nanoid(12);
    try {
        let url = await Url.findOne({ origUrl: origUrl })
        if (!url) {
            const shortUrl = `http://localhost:3000/api/${urlId}`;
            const urlNew = new Url({
                urlId: urlId,
                origUrl: origUrl,
                shortUrl: shortUrl
            })
            await urlNew.save();
            return res.status(201).json({status: true, shortUrl: urlNew.shortUrl})
        }
        res
            .status(200)
            .json({
                status: true,
                message: 'Url already shorten',
                shortUrl: url.shortUrl
            })
    }
    catch(err){
        res
            .status(400)
            .json({
                status: false,
                message: err
            })
    }
    


}

async function getOrigUrl(req, res, next){
    const urlId = req.params.urlId;
    try{
        const url = await Url.findOne({urlId: urlId});
        if(!url){
            const error = new Error('url not exist');
            error.statusCode = 404;
            throw error;
        }
        await Url.findOneAndUpdate({urlId: urlId}, {
            $inc: {clicks : 1}
        });
        res.status(201).json({status: true, redirect: true, web: url.origUrl})
    }
    catch(err){
        const error = new Error(err.message);
        error.statusCode = 422;
        throw error
    }
}

export { postOrigUrl, getOrigUrl }