const fencingCheck=(req,res,next)=>{
    const centre={lat:26.9110492,lng:80.9695695};
    const radiusMeters = 50;
    const latitude=parseFloat(req.body.latitude);
    const longitude=parseFloat(req.body.longitude);

    if (isNaN(latitude)||isNaN(longitude)) {
    return res.status(400).json({message:"Invalid coordinates"});
    }

    function isInsideGeofence(userLat, userLng, centerLat, centerLng, radiusMeters) {
    const toRad=(x)=>(x*Math.PI)/180;
    const R=6371000;
    const dLat=toRad(centerLat-userLat);
    const dLng=toRad(centerLng-userLng);
    const a =
      Math.sin(dLat/2)**2 +
      Math.cos(toRad(userLat))*
        Math.cos(toRad(centerLat))*
        Math.sin(dLng/2)**2;
    const c =2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R*c<=radiusMeters;
  }

  const check=isInsideGeofence(latitude,longitude,centre.lat,centre.lng,radiusMeters);
  if(check){
    next();
  }else{
    res.status(401).json({message:"Sorry! You are out of allowed area"});
    return;
  }
}

export {fencingCheck};