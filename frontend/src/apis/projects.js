import axios from '../config/axiosConfig.js';

export const createProjectApi = async() => {
    try {
        const response = await axios.post('/api/v1/projects');
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

export const getProjectTree = async ({ projectId }) => {
    try {
        const response = await axios.get(`/api/v1/projects/${projectId}/tree`);
        console.log(response);
        return response?.data?.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}