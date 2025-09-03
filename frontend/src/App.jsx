import { useState,useEffect } from 'react'

function App() {
   const centre={lat:26.9110492,lng:80.9695695};
   const [user,setUser]=useState({lat:'',lng:''});
   const [message,setMessage]=useState('');

    useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const {latitude,longitude}=pos.coords;
      setUser({lat:latitude,lng:longitude});
    } ,null,{
    enableHighAccuracy: true,  
    timeout: 10000,
    maximumAge: 0  
  });
  }, []);

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

  function onClickHandler(){
   navigator.geolocation.getCurrentPosition(
      (pos)=>{
        const {latitude,longitude}=pos.coords;
        setUser({lat:latitude,lng:longitude});

        const check=isInsideGeofence(latitude,longitude,centre.lat,centre.lng,50);
        const result=check?"You are inside geofencing":"You are outside geofencing";
        setMessage(result);
      },
      (err)=>console.error(err),
      {enableHighAccuracy:true,timeout:10000,maximumAge:0}
    );
  }

  return (
    <div className='bg-black w-full h-screen p-2'>
      <button onClick={onClickHandler} className='w-full md:w-50 h-20 text-3xl text-white cursor-pointer rounded-4xl mt-20 md:ml-[20%] bg-blue-500'>Click here</button>
      {message&&<div className='w-full md:w-[40%] rounded-4xl text-4xl text-white py-3 pl-4 mt-20 md:ml-[20%] bg-blue-500'>
        {message}
        </div>}
      {message&&<div className='w-full md:w-[40%]  rounded-4xl text-4xl text-white py-3 pl-4 mt-20 md:ml-[20%] bg-blue-500'>
        <h1>Your Coordinates:</h1>
        <p>Latitude:{user.lat}</p>
        <p>Longitude:{user.lng}</p>
        </div>}  
    </div>
  )
}

export default App
