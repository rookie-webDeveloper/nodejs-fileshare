# nodejs-fileshare
Transfer Files from PC to another device using browser over LAN.

## Requirements 
1. NodeJS must be installed. If not installed download from [NodeJS website](https://nodejs.org/dist/v16.15.0/node-v16.15.0-x64.msi).
3. Internet connection for installing dependences for first time.

## Steps to install 
1. Download the zip and extract the files.
2. Open command prompt in same folder where you extracted files and type following command to install dependencies.
```bash
npm install
```
3 After executing the above command type this command to install application globally.
```bash
npm install -g
```

## How to run
1. Open command prompt in folder you want to share and type following command.
```bash
start-share
```
3. Scan the Qrcode which appear on command prompt or Copy the ```URL``` on top of the Qrcode.
4. open the address in Chrome or any other browser.

## Tips
1. Try reducing font size by ```ctrl + scroll↓``` to get full length of Qrcode in windows Terminal.
2. if you are using windows command prompt or poweshell first reduce the font then restart application for ```Qrcode``` to appear.

## How to Uninstall
1. Open windows terminal and type ```npm uninstall -g nodejs-fileshare``` and hit enter.
2. Then delete the folder containg the files of the project.
