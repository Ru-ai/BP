import ProspectList from '../models/prospect.model.js';
import dotenv from 'dotenv';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import { appendValues } from '../controller/waste.js';

dotenv.config();

// async function appendValues(spreadsheetId, range, valueInputOption, _values) {
//     const auth = new GoogleAuth({
//       scopes: 'https://www.googleapis.com/auth/spreadsheets',
//     });
  
//     const service = google.sheets({version: 'v4', auth});
//     let values = [
//       [
//         _values.fullName,
//         _values.email,
//         _values.phoneNo,
//         _values.companyName,
//         _values.industry,
//         _values.monthlyRevenue,
//       ],
//     ];
//     const resource = {
//       values,
//     };
//     try {
//       const result = await service.spreadsheets.values.append({
//         spreadsheetId,
//         range,
//         valueInputOption,
//         resource,
//       });
//       console.log(`${result.data.updates.updatedCells} cells appended.`);
//       return result;
//     } catch (err) {
//         console.error('Error appending values:', err);
//         throw err;
//     }
// }

export const saveLead = async (req, res) => {
    try {
        const { fullName, email, phoneNo, companyName, industry, monthlyRevenue} = req.body;
        
        const newCustomer = new ProspectList({
          fullName,
          email,
          phoneNo,
          industry,
          companyName,
          monthlyRevenue,
        });
    
        await newCustomer.save();
        
        await appendValues();
        
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error saving lead:', error);
        res.status(500).json({ error: 'Failed to save lead' });
    }
}

export const getAllLeads = async (req, res) => {
    try {
        const allCustomers = await ProspectList.find({});
        res.status(200).json(allCustomers);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
      }
}
