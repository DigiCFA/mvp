# mvp

MVP for the FinTech startup DigiCFA, a digital payment solution for Central Africa. 

---
<br>


## How to test the lambda BackEnd locally

Prerequisite: make sure to add the .env file to the root of the project

1. Modify the ```api-gateway-event.json``` file. Only modify the 'path', 'httpMethod', and 'body' variables which appear to be sufficient. The rest don't seem to make a difference. Could not get the GET requests to work (someone please look into this - queryStringParameters does not seem to register), but as long as the request uses the 'body' variable it works.

2. ```npm run local```

<br><br>

# FrontEnd

We are using Expo SDK 49.0.0 [newest] - make sure to keep in mind and check compatibility.

<br>

## Builds for Expo Application Services (EAS)

Reference: https://docs.expo.dev/build/introduction/

1. Make sure you have been added to the organization. Check here: https://expo.dev/accounts/digicfa. Make sure the secret and credential files have been uploaded (they should be so do not worry unless see errors). 

2. Download the latest build. One way to do this is downloading it on your computer, and dragging it into the simulator (this has worked for IOS, not sure for Android). 

  
3. If the build that you want to download doesn't exist, or you want to test with a new build, create your build following https://docs.expo.dev/build/setup/. For step 4, choose the platform and profile. We have generally just tested with the `development` (contains extra debugging for ios) and `ios-dev` profiles:

   ```
   eas build --platform ios --profile ios-dev
   ```

   Feel free to do whatever you want and alter the ```eas.json``` file for build details. 


4. For app configuration, modify the ```app.config.js``` instead of ```app.json```. Doc on environment variables: https://docs.expo.dev/build-reference/variables/. Note, the ios `buildConfiguration: Debug` would spin up a debugger in-app which may be useful.


---
<br>

## Builds for classic Expo Go

Prerequisite: make sure Expo is properly setup. https://docs.expo.dev/get-started/installation/

1. 
```
cd mvp/FrontEnd
npx expo start
```

2. Open the Mac Simulator (download from XCode). So far design has been modelled on iPhone 14 ios 16.4.

3. **'i'** to open in the ios simulator. Can also choose to scan the code and open on your personal device. Recommended pinning the simulator window during development.

4. **'r'** to refresh. Can do this on both simulator or terminal window.
   
5. Might need to restart server every once in a while. Patience is key.

---
- Have not tried on Andriod - requires downloading Andriod Studio.
  
- If running multiple simulators, go to the Expo Go App home menu and copy in the >exp:// URL manually.
  
- Can also choose to open on Web. For debugging, press **'j'**. By default the debugger opens in a Chrome window. (Can also set up VSCode React Debugger but that is slightly more complicated)

<br><br>


# Configure Redux Debugger

1. Install Redux-devtool cli, follow instructions [here](https://github.com/reduxjs/redux-devtools/tree/main/packages/redux-devtools-cli#usage)
2. If installation for cli failed and prompted to update Node, install Node.js from [here](https://nodejs.org/en)
3. Install Redux-remote-dev-tools, follow instructions [here](https://github.com/reduxjs/redux-devtools/tree/main/packages/redux-devtools-remote)
4. Before launching frontend using expo, start the redux devtool using ```redux-devtools --hostname=localhost --port=8000 --open```
5. Launch frontend with the command ```npx expo start --localhost```. If successfully connected to the devtool, the console should output ```connected to remotedev-server```.
