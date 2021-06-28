# Swingbot Pro SDK

This is the client for interacting with the Swingbot Pro API.
This is for subscribers to the Swingbot Pro Platform.

## Installation

```
npm install swingbot-pro-sdk
```
or
```
yarn add swingbot-pro-sdk
```

## Methods

### init

Initialize the client object

```javascript
const SwingbotProSDK = require('swingbot-pro-sdk');
const client = SwingbotProSDK.init(API_KEY);
```

### login

Login a user.

```javascript
const SwingbotProSDK = require('swingbot-pro-sdk');
const client = SwingbotProSDK.init(API_KEY);
client.login(email, password)
    .then(results => {
        // do something
    }).catch(e => {
        // handle error
    });
```

### uploadVideo

Upload a video to Swingbot Pro for processing.
Include the file to upload, the email of the user this file belongs to, and the id of the lesson program from the dashboard.

```javascript
const SwingbotProSDK = require('swingbot-pro-sdk');
const client = SwingbotProSDK.init(API_KEY);

client.uploadVideo(file, email, lessonProgramId)
    .then(uploadResults => {
        // do stuff here!
    })
    .catch(e => {
        // handle the error
    });
```

### getAnalysisById

```javascript
const SwingbotProSDK = require('swingbot-pro-sdk');
const client = SwingbotProSDK.init(API_KEY);

client.getAnalysisById(analysisId)
    .then(analysisResults => {
        // do stuff here!
    })
    .catch(e => {
        // handle the error
    });
```

### getVideosByUserId

```javascript
const SwingbotProSDK = require('swingbot-pro-sdk');
const client = SwingbotProSDK.init(API_KEY);

client.getVideosByUserId(userId)
    .then(videos => {
        // do stuff here!
    })
    .catch(e => {
        // handle the error
    });
```

### getWebsiteConfig

```javascript
const SwingbotProSDK = require('swingbot-pro-sdk');
const client = SwingbotProSDK.init(API_KEY);

client.getWebsiteConfig()
    .then(websiteConfig => {
        // do stuff here!
    })
    .catch(e => {
        // handle the error
    });
```
