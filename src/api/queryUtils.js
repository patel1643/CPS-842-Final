import axios from 'axios';
import { getUrl } from '../utils/WebsiteUtils';

export default axios.create({
    baseURL: getUrl()
});