import axios from 'axios';

// Configure the base URL for your Spring Boot backend
const BUCKET_API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/bucket';


const bucketApi = axios.create({
  baseURL: BUCKET_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling interceptor
bucketApi.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);


// Bucket APIs
export const bucketApiService = {
  // Get all buckets
  getAllBuckets: () => bucketApi.get('/viewBuckets'),
  
  // Get bucket by ID
  getBucketById: (id) => bucketApi.get(`/buckets/${id}`),
  
  // Create new bucket
  createBucket: (bucketData) => bucketApi.post('/createBucket', bucketData),
  
  // Update bucket
  updateBucket: (id, bucketData) => bucketApi.put(`/updateBucket/${id}`, bucketData),
  
  // Delete bucket
  deleteBucket: (id) => bucketApi.delete(`/deleteBucket/${id}`),
};

export default bucketApi;
