const mongoose = require("mongoose");

const Schema = mongoose.Schema;

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
    console.log("MongoDB connected");

    await addUser();

    await mongoose.connection.close();
}

const userSchema = new Schema({
    username: String,
    address: [{
        _id:false,
        location: String,
        city: String
    }]
});

const User = mongoose.model("User", userSchema);

const addUser = async () => {
    let user1 = new User({
        username: "Nani",
        address: [
            {
                location: "161 main street",
                city: "NewYork"
            }
        ]
    });

    user1.address.push({
        location: "232 naive street",
        city: "Washington"
    });

    await user1.save();

    console.log("User saved");
};

main().catch(err => console.log(err));