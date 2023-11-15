const {Schema,model} = require ("mongoose");

const dateFormat = (date) => {
    var dateObj = new Date();
    var day = dateObj.getUTCDate();
    var month = dateObj.getUTCMonth() + 1; 
    var year = dateObj.getUTCFullYear();
  
    return  (`${day}/${month}/${year}`)
  };

  const reactionSchema = new Schema (
    {
        reactionId:{
            type: Schema.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody:{
            type: String,
            required: true,
            minlength: 1,
            maxLemgth: 280,
        },

        username:{
            type: String,
            required: true,
        },
        
        createdAt:{
            type: Date,
            default: Date.now,
            get: (date) => dateFormat(date)
        },
    },
    {
        toJSON:{
            getters:true,
        },
        id:false,
    }
  );

  module.exports = reactionSchema;