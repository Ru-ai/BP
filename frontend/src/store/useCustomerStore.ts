import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/api';

export interface User {
  fullName: string;
  email: string;
  phoneNo: string;
  monthlyRevenue: string;
  companySize: string;
  industry: string;
  qualified: boolean;
}

export function useCustomerStore() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/data`);
        setData(response.data);
        console.log("Data:", data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
