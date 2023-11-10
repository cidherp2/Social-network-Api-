const {User} = require ("../models/index");

module.exports = {
    async getAllUsers(req,res ) {
        try {
            const allUsers = await User.find();
            res.json(allUsers);
        } catch(err) {
            res.send("An error ocurred while finding the users " + err)
        }
    },

    async getUser (req,res) {
        try {
            const user = await User.findOne({ _id: req.params.userId});
            if (!user){
                return res.json({message:"User does not exist"})
            }
            res.send(user);
        } catch (err) {
            res.send("An error ocurred while finding the user " + err)
        }

    },

    async createUser (req, res) {
        try {
            const user = await User.create(req.body);
            console.log("User created succesfully");
            res.send(user)
        } catch (err) {
            res.send("An error ocurred while creating a new user " + err)
        }
    },

    async updateUserInfo (req , res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, {username:req.body.username},{new:true})
            if (!user) {
                return res.json({ message: "No such user" });
            }
            console.log('User updated succesfully')
            res.send(user)
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
            console.log('User deleted succesfully')
            res.send(user)
        } catch (err) {
            res.send("impossible to delete user, error: " + err)
        }
    },

    async createFriend(req, res) {
        try {
          const user = await User.findByIdAndUpdate(req.params.userId, {
            $push:{friends: req.params.friendId},
          });
          res.json(user);
        } catch (err) {
            res.send("impossible to add friend to user list, error: " + err)
        }
      },

      async deleteFriend(req, res) {
        try {
          const user = await User.findByIdAndUpdate(req.params.userId,
            {$pull: {"friends": req.params.friendId}}
          );
          res.json({ message: "Friend deleted" });
        } catch (err) {
            res.send("impossible to delete friend from user list, error: " + err)
        }
      },
}

//Add the bonuses later, first the MVP