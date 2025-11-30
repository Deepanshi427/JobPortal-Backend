const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim: true,
        },

        email:{
            type:String,
            require:true,
            unique: true,
            lowercase:true,
        },
        password:{
            type:String,
            required: true,
        },
        role:{
            type: String,
            enum:["user", "recruiter", "admin"],
            default:"user",
        },
    },
    {timestamps: true}
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methnods.comparePassword= function (password){
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user" , userSchema);