const {Schema,model } = require('mongoose');

let emailValidator = (mail) => {
    let validator = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return validator.test(mail);
}

const userSchema = new Schema (
    {
        username:{
            type: String,
            unique: true,
            required: true,
            trim: true,
            validate: [emailValidator, 'Please enter a valid email']
        }, 
        email:{
            type: String,
            lowercase: true,
            unique: true,
            required: true,
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