# ZuseTracker

## by Beni Kalonga - Second Technical Assignment

#Get started with this

- To run the project, Clone the app [ZuseTracker](https://github.com/benikalonga/ZuseTracker.git) 👍
- Open the CMD, and change the directory to the root (e.g CD ''../../ZuseTracker'')
- Run the command npm to install all the dependancies
- Run npm start to start the server
- Run npx react-native run-android to run on a android device or npx react-native run-ios to run on a iOS device

### Here is a video showing how it works

https://github.com/benikalonga/ZuseTracker/assets/29547138/95a3123b-29cd-429f-9ad2-570939b059cf

# Features

- HomeScreen
- MapScreen
- DetailScreen
- CreationCustomerScreen
- LoginScreen
- ProfilScreen
- AboutScreen
- SplashScreen

# Important informations

- Redux Toolkit for State management
- The user can update customer details from the Customer Detail Screen.
- The app includes a search functionality on the Home Screen, allowing the user to find a customer by name.
- The app implements a "Recently Viewed" list, that keeps track of the last five customers viewed by the agent.
- The app supports offline mode, allowing users to view previously loaded data when there is no internet connection.
- The app implements navigation using React Navigation.
- Axios for network requests.
- Simulate the login process by storing a token in the application's state when the Login form is submitted.

# Depencies and Libraries

[In the Package.json file](package.json)

- "@fortawesome/fontawesome-svg-core": "^6.4.0",
- "@fortawesome/free-brands-svg-icons": "^6.4.0",
- "@fortawesome/free-regular-svg-icons": "^6.4.0",
- "@fortawesome/free-solid-svg-icons": "^6.4.0",
- "@fortawesome/react-native-fontawesome": "^0.3.0",
- "@react-native-async-storage/async-storage": "^1.18.2",
- "@react-native-community/geolocation": "^3.0.6",
- "@react-navigation/native": "^6.1.7",
- "@react-navigation/native-stack": "^6.9.13",
- "@react-navigation/stack": "^6.3.17",
- "@reduxjs/toolkit": "^1.9.5",
- "axios": "^1.4.0",
- "haversine": "^1.1.1",
- "react": "18.2.0",
- "react-native": "0.72.1",
- "react-native-animatable": "^1.3.3",
- "react-native-blurhash": "^1.1.10",
- "react-native-gesture-handler": "^2.12.0",
- "react-native-maps": "^1.7.1",
- "react-native-pager-view": "^6.2.0",
- "react-native-paper": "^5.9.0",
- "react-native-reanimated": "^3.3.0",
- "react-native-safe-area-context": "^4.6.3",
- "react-native-screens": "^3.22.0",
- "react-native-share": "^9.1.0",
- "react-native-shared-element": "^0.8.8",
  "react-native-vector-icons": "^9.2.0",
  "react-navigation-shared-element": "^3.1.3",
  "react-redux": "^8.1.1",

# API (Free)

## [Mocki APi](https://api.mocki.io/v2/04517d70/) is the free API I used for the entire project

- Get all customers, [/getCustomers](https://api.mocki.io/v2/04517d70/getCustomers), GET Methon
- Get one customer by id, [/getCustomerById](https://api.mocki.io/v2/04517d70/getCustomer/id), GET Method
- Add a customer, [/addCustomer](https://api.mocki.io/v2/04517d70/addCustomer), POST Method

# Architecture (VVM of MVVM)

## Screenshots (Step by step)

 <p align="center">
  <img src="files/1_home_screen.png" width="150" title="Picture 1">
  <img src="files/2_map_screen.png" width="150" alt="accessibility text">
  <img src="files/3_detail_screen.png" width="150" alt="accessibility text">
  <img src="files/4_edit_customer.png" width="150" alt="accessibility text">
  <img src="files/5_creation_screen.png" width="150" alt="accessibility text">
  <img src="files/55_pick_location.png" width="150" alt="accessibility text">
  <img src="files/6_new_customer_home.png" width="150" alt="accessibility text">
  <img src="files/66_map_newcustomer.png" width="150" alt="accessibility text">
  <img src="files/error.png" width="150" alt="accessibility text">
  <img src="files/offline.png" width="150" alt="accessibility text">
  <img src="files/7_login_screen.png" width="150" alt="accessibility text">
  <img src="files/8_profile_screen.png" width="150" alt="accessibility text">
  <img src="files/9_about_screen.png" width="150" alt="accessibility text">
  <img src="files/10_splash_screen.png" width="150" alt="accessibility text">
 </p>
