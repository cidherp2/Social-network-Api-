const {Schema,model } = require('mongoose');

let emailValidator = (mail) => {
    var validator = /^([a-zA-Z0-9_\.-]+)@([a-zA-Z\d\.-]+)\.([a-zA-Z]{2,})$/;
    return validator.test(mail);
}

const userSchema = new Schema (
    {
        username:{
            type: String,
            unique: true,
            required: true,
            trim: true,
           
        }, 
        email:{
            type: String,
            lowercase: true,
            unique: true,
            required: true,
            validate: [emailValidator, 'Please enter a valid email']
        },
        thoughts:[
            {
            type: Schema.Types.ObjectId,
            ref: "Thought"
            },
         ],  
         
         friends:[
            {
            type: Schema.Types.ObjectId,
            ref: "User"
         },
        ],
    },
    {
        toJSON: {
        virtuals:true,
    },
    id:false
}
);

userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
});

const User = model("User",userSchema);

module.exports = User;