const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "0ad0f51bebb64494bc25e1d179c8a519"
   });

const handleApiCall=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data=>{
        console.log(data)
        res.json(data)
    })
    .catch(err=>res.status(400).json('unable to get response from API'))
}

const handleImage=(req,res,db)=>{
    const { id }= req.body;
    db('users').where('id',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=> {
        res.json(entries[0].entries);
    })
    .catch(err=>res.status(400).json('unable to get entries'))
}

module.exports={
    handleImage: handleImage,
    handleApiCall: handleApiCall
};