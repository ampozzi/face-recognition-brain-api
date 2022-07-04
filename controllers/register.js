const handleRegister=(req,res,db,bcrypt)=>{
    const { name,email,password }=req.body;
    if(!name||!email||!password){
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
        db.transaction(trx=>{
            if(!password){
                throw('Error: unable to register, password can not be blank');
            }
            trx('login').insert({
                hash: hash,
                email:email,
            })
            .returning('email')
            .then(loginEmail=>{
                return trx('users')
                .insert({
                    email:email,
                    name: name,
                    joined: new Date()
                })
                .returning('*')
                .then(user=>res.json(user[0]))
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err=>res.status(400).json('Error: unable to register'))
}

module.exports={
    handleRegister: handleRegister
};