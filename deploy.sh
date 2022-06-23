#!/bin/sh
ssh -t -t -i "awskey.pem" ec2-user@ec2-13-37-220-97.eu-west-3.compute.amazonaws.com<<EOF
   print("==== in script bash ====")
   cd api_nodejs-express
   git pull origin main
   npm install
   npm run start
   pm2 restart all
   exit
EOF
