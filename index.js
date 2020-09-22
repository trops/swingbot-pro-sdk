import { generateToken } from './util/token';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const apiUrl = 'https://rth7ytu7ak.execute-api.us-east-1.amazonaws.com/dev';

const SwingbotProSDK = {
  authorization: null
};

const generateToken = (apiKey, secret) => {
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: apiKey
    }, secret);

    return token;
};

const handleError = (e) => {
  if ('response' in e) {
    return Promise.reject({
      response: e.response,
      message: 'Make sure your API key is valid'
    });
  }
  return Promise.reject(e);
};

//
// Step 1: Get the signed URL to upload the video
//
const getSignedUrl = (filename, apiKey) => {
  return axios.get(`${apiUrl}/upload?filename=${filename}`, {
    headers: { 'Authorization': apiKey }
  })
    .then(uploadUrlData => {
      return (uploadUrlData !== undefined) ?
        uploadUrlData.data : Promise.reject(uploadUrlData.msg);
    }).catch(err => handleError(err));
};
//
// Step 2: Upload the video file to S3 bucket
//
const uploadVideoFile = (uploadUrl, file) => {
  return axios.put(`${uploadUrl}`, file, {
    headers: { 'Content-Type': file.type }
  })
    .then(uploadUrl => uploadUrl)
    .catch(err => handleError(err));
};

  //
  // Step 3: Submit for processing
  //
const processVideoFile = (filename, email, processType, licenseeCampaignId, apiKey) => {
  const body = { filename, email, processType, licenseeCampaignId };

  return axios({
    method: 'post',
    data: body,
    url: `${apiUrl}/process`,
    headers: { 'Authorization': apiKey }
  })
    .then(uploadUrl => uploadUrl)
    .catch(err => handleError(err));
};

SwingbotProSDK.uploadVideo = (file, email, processType, licenseeCampaignId, apiKey) => {
  return getSignedUrl(file.name, apiKey)
    .then(urlResults => uploadVideoFile(urlResults.data.url, file))
    .then(uploadResult => processVideoFile(file.name, email, processType, licenseeCampaignId, apiKey))
    .catch(err => err);
};

SwingbotProSDK.getAnalysisById = (id) => {
  return axios.get(`${apiUrl}/analysis/${id}`, {
    headers: { 'Authorization': `Bearer ${this.token}` }
  })
    .then(analysisResults => {
      return analysisResults !== undefined ?
        analysisResults : Promise.reject(new Error('Unable to get analysis results'));
    }).catch(err => handleError(err));
};

SwingbotProSDK.prototype.init = function (apiKey, secret) {
  // let's set the token for the rest of the app
  this.authorization = generateToken(apiKey, secret);
};

module.exports = SwingbotProSDK;
