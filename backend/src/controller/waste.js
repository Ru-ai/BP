// import { google } from 'googleapis';
// import { GoogleAuth } from 'google-auth-library';

// export const appendValues = async () => {
//     // Test with dummy data
//     let _values = {
//         fullName: "John Doe",
//         email: "john.doe@example.com",
//         phoneNo: "555-123-4567",
//         companyName: "Acme Corp",
//         industry: "Technology",
//         monthlyRevenue: "$50,000"
//     };
    
//     let spreadsheetId = "1RRoOqY3Ry0PnQ5soZ_YztGYN4YBKRBkjg2jMt5Hj36I"; // Google Sheets demo spreadsheet
//     let range = "Sheet1!A:F";
//     let valueInputOption = "USER_ENTERED";
    
//     try {
//         const auth = new GoogleAuth({
//             scopes: 'https://www.googleapis.com/auth/spreadsheets',
//         });
      
//         const service = google.sheets({version: 'v4', auth});
//         let values = [
//           [
//             _values.fullName,
//             _values.email,
//             _values.phoneNo,
//             _values.companyName,
//             _values.industry,
//             _values.monthlyRevenue,
//           ],
//         ];
//         const resource = {
//           values,
//         };
        
//         const result = await service.spreadsheets.values.append({
//             spreadsheetId,
//             range,
//             valueInputOption,
//             resource,
//         });
        
//         console.log(`${result.data.updates.updatedCells} cells appended.`);
//         return result;
//     } catch (err) {
//         console.error('Error appending values:', err);
//         throw err;
//     }
// }