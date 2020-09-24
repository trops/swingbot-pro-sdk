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
const swingbotProSDK = SwingbotProSDK.init(API_KEY, SECRET);
```

### login

Login a user.

```javascript
const SwingbotProSDK = require('swingbot-pro-sdk');
const swingbotProSDK = SwingbotProSDK.init(API_KEY, SECRET);
swingbotProSDK.login(email, password)
    .then(results => {
        // do something
    }).catch(e => {
        // handle error
    });
```

### uploadVideo

### getAnalysisById

```javascript
const SwingbotProSDK = require('swingbot-pro-sdk');
const swingbotProSDK = SwingbotProSDK.init(API_KEY, SECRET);

swingbotProSDK.getAnalysisById(analysisId)
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
const swingbotProSDK = SwingbotProSDK.init(API_KEY, SECRET);

swingbotProSDK.getVideosByUserId(userId)
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
const swingbotProSDK = SwingbotProSDK.init(API_KEY, SECRET);

swingbotProSDK.getWebsiteConfig()
    .then(websiteConfig => {
        // do stuff here!
    })
    .catch(e => {
        // handle the error
    });
```
