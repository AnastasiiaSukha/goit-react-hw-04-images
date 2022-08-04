
import axios from 'axios';

const API_KEY = '27785524-47e8f859613f7a00e6f2241aa';
axios.defaults.baseURL = 'https://pixabay.com/api/';


export const getImages = async (search, page) => {
  const response = await axios.get(
    `?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};