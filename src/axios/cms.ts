import axios from 'axios';

const instance = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
  params: {
    access_token: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
  }
});

export default instance;
