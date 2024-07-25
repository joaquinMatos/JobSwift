
import axios from 'axios';

const API_KEY = '017a5e87fbmshdb89447733170a6p103a9fjsnaa07251df33d';
const API_HOST = 'local-business-data.p.rapidapi.com';

const fetchNearbyBusinesses = async (query: string, lat: string, lng: string) => {
    try {
        const response = await axios.get('https://local-business-data.p.rapidapi.com/search-nearby', {
            params: {
                query,
                lat,
                lng,
                limit: '20',
                language: 'en',
                region: 'us',
                extract_emails_and_contacts: 'false'
            },
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching nearby businesses:', error);
        throw error;
    }
};

export default fetchNearbyBusinesses;
