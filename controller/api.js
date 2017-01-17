var fs = require('fs');

var logger = require('./log');


exports.subset = function (req, res)
{   
    var dateCheck=req.body.dateCheck;
    fs.readFile('data.txt', function(err, data) {
        if(err) 
            {
                res.json({"code":200,"status":"Error","error":"Error fetching the data"});
                return;
            }
        var array = JSON.parse(data);
        var matchData=[];
        for(i in array) 
        {
            var dateFrom = array[i]["date_created"];
            var dateTo = array[i]["date_disabled"];

            var d1 = new Date(dateFrom);
            var d2 = new Date(dateTo);
            var c = new Date(dateCheck);
            if(c > d1 && c < d2)
            {
                 matchData.push({
                     matchData:array[i]
                 });
            }
        }
        console.log("date found",matchData);
        res.json({"code":200,"status":"Success","message":"subset of coordinate objects","Data":matchData});
        logger.info('Request=',req.body.dateCheck,'Responce=', matchData,'subset of coordinate objects');
        return;
    });
}
   

exports.distance = function (req, res)
{
    console.log("data",req.body);
    var point1lat=req.body.point1["lat"];
    var point1lng=req.body.point1["lng"];
    var point2lat=req.body.point2["lat"];
    var point2lng=req.body.point2["lng"];

    if(req.body!="")
    {
        var radlat1 = Math.PI * point1lat/180
        var radlat2 = Math.PI * point2lat/180
    
        var theta = point1lng-point2lng
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
            dist = dist * 1.609344 
            console.log("dist",dist);
            res.json({"code":200,"status":"Success","message":"Distance found in km","distance":dist});
            logger.info('Responce=',req.body,'Request=','Responce=', 'Distance found in km','distance',dist);
            return;
    }
    else
    {
        res.json({"code":200,"status":"error","error":"No Appropriate data found"});
    }

    
    
	
    
}

   