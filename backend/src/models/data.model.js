import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    email: String,
    phoneNo: String,
    industry: String,
    companySize: String,
    monthlyRevenue: String,
    fullName: String,
    qualified: Boolean,
});

const Data = mongoose.model("Data", dataSchema);

export default Data;
