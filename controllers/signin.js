const handleSignin=(req,res,db,bcrypt)=>{
    const { email, password }=req.body;
    if(!email||!password){
        return res.status(400).json('incorrect form submission');
    }
    db('login').select('email','hash').where({
        email: email
    })
    .then(data=>{
        if(bcrypt.compareSync(password, data[0].hash)){
            return db('users').select('*').where('email','=',data[0].email)
            .then(user=>res.json(user[0]))
            .catch(err=>'Error: Unable to get user')
        } else {
            return res.status(400).json('Error: wrong credendials')
        }
    })
    .catch(err=> res.status(400).json('Error: wrong credendials'));    
}

module.exports={
    handleSignin: handleSignin
};