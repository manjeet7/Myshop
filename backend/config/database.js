import mongoose from "mongoose";

const url = "mongodb+srv://radhika:radhika123@cluster0.9poopyi.mongodb.net/";

mongoose.connect(url, {
  useNewUrlParser: true,
}).then(()=>{
  console.log("database connected successfully");
})
.catch((error)=>{
  console.log(error);
})