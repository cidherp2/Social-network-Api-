const {Thought,User} = require("../models");

module.exports = {

    async getToughts( req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts);
        } catch  (err) {
            res.json({message: "Error finding the thoughts " + err})
        }
    },

    async getThought (req,res) {
        try {
            const thoughts = await Thought.findOne({_id:req.params.thoughtId})
            res.send(thoughts);
        } catch (err) {
            res.send("Error fetching the thought  "+ err)
        }
    },

    async think(req, res) {
        try {
                if (!req.body.username){
                    return res.send({message:"The username doesn't exist"})
                }
                const thought = await Thought.create(req.body)
                const user = await User.findOneAndUpdate({username:req.body.username},{$push:{thoughts:thought._id}})
                if(user && thought){
                  res.send({message:"You thought something amazing!"});
                }
        } catch (err) {
            console.log(err)
            res.send ("Error while creating thought " + err)
        } 
    },

    async editThought (req, res) {
        try {
            const thoughts = Thought.findByIdAndUpdate(req.params.thoughtId,req.body)
            if (!thoughts){
                res.json({message: "Thought does not exist"})
            }
            res.send(thoughts).json({message:"Thought updated succesfully"})
        } catch(err){
            res.send ("Error while updating thought " + err)
        }
    },

    async deleteThought (req, res){
        try {
            const thoughts = await Thought.findOneAndDelete({_id:req.params.thoughtId});
            if(!thoughts){
                return res.json({message: "The thought you are trying to delete does not exist"})
            }
            res.send(user).json({message: "User thought deleted successfully"})
        } catch (err) {
            res.send("impossible to delete thought, error: " + err)
        }
    },

    async react (req, res) {
        try {
            if (!req.body.username) {
                res.send({message: "Couldn't find the username"})
            }
            const reaction = await Thought.findByIdAndUpdate(req.params.thoughtId,{
                $push:{reactions:req.body}
            });
            res.send({message:"Reacted to user thought"})
        } catch (err) {
            res.send("Error trying to add readction to the thought: Error " + err);
            
        }
    },

    async deletReaction (req ,res) {
        try {
            const thoughts = await Thought.findByIdAndUpdate(req.params.thoughtId,{$pull:{"reactions":{_id: req.params.reactionId}}})
            res.send({message:"Reaction removed"})
        } catch (err){
            res.send({message: "An error ocurred while deleting the reaction " + err})

        }
    } 
    
}