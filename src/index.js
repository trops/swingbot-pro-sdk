import axios from 'axios';
import jwt from 'jsonwebtoken';

const apiUrl = 'https://api.swingbotpro.com';

const SwingbotProSDK = {};

/**
 * generateToken
 *
 * @param {*} apiKey the API Key
 * @param {*} secret the secret
 * @example
 * // generate a new token
 * const token = generateToken('12345', 'secret');
 */
function generateToken(apiKey, secret) {
  let token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: apiKey
  }, secret);

  return token;
};

function handleError(e) {
  console.log('error: ', e.message);
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
function getSignedUrl(filename) {
  return axios.get(`${apiUrl}/upload?filename=${filename}`, {
    headers: { 'Authorization': SwingbotProSDK.apiKey }
  })
    .then(uploadUrlData => {
      return (uploadUrlData !== undefined) ?
        uploadUrlData.data : Promise.reject(uploadUrlData.msg);
    }).catch(err => handleError(err));
};
//
// Step 2: Upload the video file to S3 bucket
//
function uploadVideoFile(uploadUrl, file) {
  return axios.put(`${uploadUrl}`, file, {
    headers: { 'Content-Type': file.type }
  })
    .then(uploadUrl => uploadUrl)
    .catch(err => handleError(err));
};

//
// Step 3: Submit for processing
//
function processFile(filename, email, lessonProgramId) {
  const body = { filename, email, processType: 'analyze', lessonProgramId };

  return axios({
    method: 'post',
    data: body,
    url: `${apiUrl}/process`,
    headers: { 'Authorization': SwingbotProSDK.apiKey }
  })
    .then(uploadUrl => uploadUrl)
    .catch(err => handleError(err));
};

/**
 * login
 */
export function login(email, password) {
  return axios({
    method: 'post',
    data: {
      email,
      password
    },
    url: `${apiUrl}/account/login`,
    headers: { 'Authorization': `${SwingbotProSDK.apiKey}` }
  })
    .then(data => data !== undefined ? data : Promise.reject(new Error('Unable to get analysis results')))
    .catch(err => handleError(err));
};
/**
 * register
 * Register a new user account
 * @param {string} email the user's email address
 * @param {string} password the user's password
 */
export function register(email, password) {
  return axios({
    method: 'post',
    data: {
      email,
      password
    },
    url: `${apiUrl}/account/register`,
    headers: { 'Authorization': `${SwingbotProSDK.apiKey}` }
  })
    .then(data => data !== undefined ? data : Promise.reject(new Error('Unable to get analysis results')))
    .catch(err => handleError(err));
};

/**
 * uploadVideo
 * Submit a video to SwingbotPro
 * @param {object} file the video file
 * @param {string} email the email address of the video owner (golfer)
 * @param {int} lessonProgramId the id for the lesson program in the dashboard
 * @param {string} apiKey your API Key from the dashboard
 */
export function uploadVideo(file, email, lessonProgramId) {
  return getSignedUrl(file.name)
    .then(urlResults => uploadVideoFile(urlResults.data.url, file))
    .then(uploadResult => processFile(
      file.name,
      email,
      lessonProgramId
    )).catch(err => err);
};

/**
 * getSignedUrl
 * @param {string} fileName filename to be uploaded
 */
export function getUploadUrl(fileName) {
  return getSignedUrl(fileName)
    .then(urlResults => urlResults.data.url)
    .catch(err => err);
};

/**
 * uploadVideoWithUrl
 * @param {string} url url we received from amazon
 * @param {binary} file the file to be uploaded
 * @param {string} email the email of the user who uploaded the video
 * @param {int} lessonProgramId the lesson program id
 */
export function uploadVideoWithUrl(url, file) {
  return uploadVideoFile(url, file)
    .then(uploadResult => uploadResult)
    .catch(err => err);
};

/**
 * processVideoFile
 * Process the video file
 * @param {string} fileName the filename to process
 * @param {string} email the email of the owner
 * @param {int} lessonProgramId the lesson program id
 */
export function processVideoFile(fileName, email, lessonProgramId) {
  return processFile(
    fileName,
    email,
    lessonProgramId
  )
    .then(processVideoResult => processVideoResult)
    .catch(e => e);
};

/**
 * getAnalysisById
 * Get the Lesson Results by id
 * @param {int} id the lesson id
 */
export function getAnalysisById(id) {
  return axios.get(`${apiUrl}/analysis/${id}`, {
    headers: { 'Authorization': `${SwingbotProSDK.apiKey}` }
  })
    .then(analysisResults => {
      return analysisResults !== undefined ?
        analysisResults : Promise.reject(new Error('Unable to get analysis results'));
    }).catch(err => handleError(err));
};
/**
 * getVideosByUserId
 * Fetch all of the videos for the golfer
 * @param {int} userId the user id of the golfer
 */
export function getVideosByUserId(userId) {
  return axios.get(`${apiUrl}/users/${userId}/videos`, {
    headers: { 'Authorization': SwingbotProSDK.apiKey }
  })
    .then(videoResults => {
      return videoResults !== undefined ?
        videoResults : Promise.reject(new Error('Unable to get video results'));
    }).catch(err => handleError(err));
};

export function getWebsiteConfig() {
  return axios.get(`${apiUrl}/website`, {
    headers: { 'Authorization': SwingbotProSDK.apiKey }
  })
    .then(websiteConfig => {
      return websiteConfig !== undefined ?
        websiteConfig : Promise.reject(new Error('Unable to get web config'));
    }).catch(err => handleError(err));
};

export function getLessonPrograms() {
  return axios.get(`${apiUrl}/programs`, {
    headers: { 'Authorization': SwingbotProSDK.apiKey }
  })
    .then(lessonPrograms => {
      return lessonPrograms !== undefined ?
        lessonPrograms : Promise.reject(new Error('Unable to get web config'));
    }).catch(err => handleError(err));
};
/**
 * init
 * Initialize the SwingbotPro SDK
 * @param {string} apiKey your API Key from the dashboard
 * @param {*} secret your Secret from the dashboard
 */
export function init(apiKey, secret) {
  // let's set the token for the rest of the app
  SwingbotProSDK.authorization = generateToken(apiKey, secret);
  SwingbotProSDK.apiKey = apiKey;

  return this;
};

// module.exports = SwingbotProSDK;
