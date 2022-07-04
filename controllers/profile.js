const handleProfileGet=(req,res,db)=>{
    const { id }= req.params;
    db.select('*').from('users').where('id',id)
    .then(user=>{
        if(user.length>0){
        return res.json(user[0]);
        } else {
            throw('error');
        }
    })
    .catch(err=>res.status(400).json('no such user'))
}

module.exports={
    handleProfileGet: handleProfileGet
};