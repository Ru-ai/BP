import {create} from "zustand";
import { toast } from "react-hot-toast";

const baseURL = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/api';

interface UserData {
    email: string;
    phoneNo: string;
    industry: string;
    companySize: string;
    monthlyRevenue: string;
    fullName: string;
    qualified?: boolean;
}
  
interface DataStore {
    userData: UserData | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isCheckingAuth: boolean;
    saveUserData: (data: UserData) => Promise<void>;
    saveUserData2: (data: UserData) => Promise<void>;
    sendEmail1: (email: string, fullName: string) => Promise<void>;
}

export const useDataStore = create<DataStore>((set) => ({
    userData: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    saveUserData: async (data) => {
        const { email, phoneNo, industry, companySize, monthlyRevenue, fullName, qualified } = data;
        try {
            if (!email || !phoneNo || !industry || !companySize || !monthlyRevenue || !fullName) {
                toast.error("Please fill in all required fields");
                return;
            }

            const response = await fetch(`${baseURL}/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status !== 200 && response.status !== 201) {
                console.log("Response not ok:", response);
                throw new Error('Failed to save user data');
            }

            const responseData = await response.json();
            toast.success("User data saved successfully");
            return responseData;
        } catch (error) {
            console.log("Error in saveUserData:", error);
            toast.error("Failed to save user data");
        }
    },

    saveUserData2: async (data) => {
        const url = 'https://script.google.com/macros/s/AKfycbxczSyoSotjAABTJDytjdXTLo1NeoxTJmCURjKSlujD0XE0GtR9VY-zJFL2DSjimr2Z/exec';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.text();
            console.log("Google Apps Script response:", result);
        } catch (error) {
            console.error("Error in saveUserData2:", error);
            toast.error("Failed to save user data to Google Sheet");
            throw error;
        }
    },

    sendEmail1: async (email, fullName) => {
        try {
            const response = await fetch(`${baseURL}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipient_email: email, fullName })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.text();
            console.log("Email response:", result);
        } catch (error) {
            console.log("Error in sendEmail:", error);
            toast.error("Failed to send emergency alert emails");
        }
    },
}));