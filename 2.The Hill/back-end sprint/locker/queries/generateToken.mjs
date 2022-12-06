import generateAccesToken from "./g"

const user = {
    id: 42,
    name: "Jean Bon",
    email: "jeanbon@gmail.com",
    admin: true,
}

const generateAccesToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: '1800s'})
}

const accessToken = generateAccesToken(user)
console.log("accessToken", accessToken)


app.post("/api/login", (req, res) =>{
    if(req.body.email!== user.email) {
        res.status(401).send("invalid credentials")
        return
    }
    if (req.body.password !== cuillere) {
        res.status(401).send("invalid credentials")
        return
    }

    const accessToken = generateAccesToken(user)
    res.send({
        accessToken,
    })
})


