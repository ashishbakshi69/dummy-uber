# dummy-uber
test-code for dummy uber

api end points:
register:  bse_url:3000/api/register
findCab:  bse_url:3000/api/findCab
bookCab:  bse_url:3000/api/bookCab

register user body
send these objects as body.

Driver:
{
    "name": "cab driver",
    "cabNumber": "WB051111",
    "xCo": "123456",
    "yCo": "987645",
    "userType": "DRIVER"
}

rider: 
{
    "name": "cab Rider",
    "xCo": "123456",
    "yCo": "987645",
    "userType": "RIDER"
}
