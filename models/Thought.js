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

        userName: {
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

thoughtSchema.virtual("reaction").get(function () {
    return this.reactions.length;
});

const Thought = model ("Thought", thoughtSchema);

module.exports = Thought;