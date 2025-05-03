import mongoose from "mongoose";

const prospectListSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNo: String,
    companyName: String,
    industry: String,
    monthlyRevenue: String,
});

const ProspectList = mongoose.model("ProspectList", prospectListSchema);

export default ProspectList;