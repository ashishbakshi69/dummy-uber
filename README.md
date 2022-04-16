# dummy-uber
test-code for dummy uber

before runnig the app. enter command in your cli.
$ npm install 

#this will install all the dependencies in the package.json file.

$ node server.js

#it will start the application.

api end points:
register:  base_url:3000/api/register
findCab:  base_url:3000/api/findCab
bookCab:  base_url:3000/api/bookCab
changeThreshold: base_url:3000/api/changeThreshold



register user body
send these json as body.

Driver:
{
    "name": "cab driver",
    "cabNumber": "WB051111",
    "xCo": 123456,
    "yCo": 987645,
    "userType": "DRIVER"
}

rider: 
{
    "name": "cab Rider",
    "xCo": 123456,
    "yCo": 987645,
    "userType": "RIDER"
}

the threshhold is 2 for now.
to change threshhold send the below json as body

{
    "threshold": 2
}
