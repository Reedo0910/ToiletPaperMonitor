# Toilet Paper Monitor

An IoT system for monitoring the remaining amount of multiple toilet paper rolls on web.

## Tutorial
Check out our tutorial [here](https://github.com/Reedo0910/ToiletPaperMonitor/blob/master/doc/Tutorial.pdf) 

## Screenshots
![screenshot1](https://raw.githubusercontent.com/Reedo0910/ToiletPaperMonitor/master/screenshots/screenshot1.png)

![screenshot2](https://raw.githubusercontent.com/Reedo0910/ToiletPaperMonitor/master/screenshots/screenshot2.png)

![screenshot3](https://raw.githubusercontent.com/Reedo0910/ToiletPaperMonitor/master/screenshots/screenshot3.png)



## Project Setup

1. Install project dependencies

```
yarn install
```



2. Create a `.env` file at the root of the project

3. Edit the `.env` file following the sample code below:

```
VUE_APP_PHOTON_ACCESS_API_1 = {YOUR PHOTON 1 ACCESS API URL } 

VUE_APP_PHOTON_ACCESS_API_2 = {YOUR PHOTON 2 ACCESS API URL } 

VUE_APP_IFTTT_ACCESS_API = {YOUR IFTTT ACCESS API URL }

```

Fill in the `{ xxx }` blanks using corresponding API URLs (See detailed instructions in the tutorial above.)



4. Run system on `http://localhost:8080/`

```
yarn serve
```
