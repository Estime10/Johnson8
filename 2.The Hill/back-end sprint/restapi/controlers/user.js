import {v4 as uuidV4} from "uuid"
let users = [
    {
    name: "Estime",
    age: 34,
    id : uuidV4()
},
    {
    name: "Julier",
    age: 22,
    id : uuidV4()
},
    {
    name: "Paul",
    age: 45,
    id : uuidV4()
}
]

export const getUsers = (req, res) =>{
    res.json(users)
}
export const createUser = (req, res) =>{
    const { name, age} = req.body

    users.push({
        name,
        age,
        id : uuidV4()
    })

    res.json(users)
}

export const getOneUser = (req, res) =>{
    const userId = req.params.id
    
    const user = users.find((user) =>{
        return user.id === userId
    })

    res.json(user)
}

export const deleteUser = (req, res) =>{
    const userId = req.params.id

    users = users.filter((user) =>{
        return user.id !== userId
    })

    res.json(users)
}

export const updateUser = (req, res) =>{
    const userId = req.params.id
    const {age, name} = req.body

    users = users.map((user) =>{
        if(user.id === userId) {
            return {
                name,
                age,
                id: userId
            }
        }
        return user
})
res.json(users)
}




