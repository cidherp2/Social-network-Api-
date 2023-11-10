const {Schema,model} = require('mongoose')
const reactionSchema = require("./Reaction");
const dateFormat = (date) => {
    var dateObj = new Date();
    var day = dateObj.getUTCDate();
    var month = dateObj.getUTCMonth() + 1; 
    var year = dateObj.getUTCFullYear();
  
    return  (`${day}/${month}/${year}`)
  };
const thoughtSchema = new Schema (
    {
        toughtText: {
            type: String,
            required: true,
            minLength:1,
            maxLength: 280,

        },
        
        createdAt:{
            type: Date,
            default: Date.now,
            get: (date) => dateFormat(date)
        },

        username: {
            type:String,
            required: true
        },
        reaction: [reactionSchema],
    },
{
    toJSON:{
        getters:true,
    },
    id:false,
});

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reaction.length;
  });

const Thought = model ("Thought", thoughtSchema);

module.exports = Thought;

// {
//     "toughtText": "Here's a cool thought...",
//     "username": "lernantino55",
//     "userId": "654d4f7627dedc10d6dbdc47"
//   }