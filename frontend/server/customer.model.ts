import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    phoneNo: {
        type: String,
        required: true,
        minLength: 10,
    },

    monthlyRevenue: {
        type: String,
        required: true,
    },

    companySize: {
        type: String,
        required: true,
    },

    industry: {
        type: String,
        required: true,
    },

    qualified: {
        type: Boolean,
        required: true,
    }

}, { timestamps: true });

const Data = mongoose.model("Data", dataSchema);

export default Data;
