const {User} = require ("../models/index");

module.exports = {
    async getAllUsers(req,res ) {
        try {
            const allUsers = await User.find();
            res.json(allUsers);
        } catch {
            res.send("An error ocurred while finding the users " + err)
        }
    },

    async getUser (req,res) {
        try {
            const user = await User.findOne({ _id: req.params.userId});
            res.send(user);
        } catch (err) {
            res.send("An error ocurred while finding the user " + err)
        }

    },

    async createUser (req, res) {
        try {
            const user = await User.create(req.body);
            res.send(user).json({message:'User created succesfully'});
        } catch (err) {
            res.send("An error ocurred while creating a new user " + err)
        }
    },

    async updateUserInfo (req , res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req,body)
            if (!user) {
                return res.json({ message: "No such user" });
            }
            res.send(user).json({message:'User updated succesfully'});
        } catch (err){
            res.send("impossible to update user, error: " + err)
        }
    },

    async deleteUser (req, res){
        try {
            const user = await User.findOneAndDelete({_id:req.params.userId});
            if(!user){
                return res.json({message: "The user you are trying to delete does not exist"})
            }
            res.send(user).json({message: "User deleted successfully"})
        } catch (err) {
            res.send("impossible to delete user, error: " + err)
        }
    }
}

//Add the bonuses later, first the MVP