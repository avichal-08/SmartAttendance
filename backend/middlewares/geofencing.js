import { Classes } from '../schema.js';

const fencingCheck = async (req, res, next) => {
  const { classId, latitude, longitude } = req.body;

  const lecture = await Classes.findById(classId);
  if (!lecture) {
    console.log("Class not found:", classId);
    return res.status(404).json({ message: "Class not found" });
  }

  const centerLat = lecture.location.coordinates[1];
  const centerLng = lecture.location.coordinates[0];
  const userLat = parseFloat(latitude);
  const userLng = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({ message: "Invalid coordinates" });
  }

  const toRad=(x)=>(x*Math.PI)/180;
  const R = 6371000; 
  const dLat =toRad(centerLat-userLat);
  const dLng =toRad(centerLng - userLng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(userLat)) *
      Math.cos(toRad(centerLat)) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  const radiusMeters = 5;
  if (distance <= radiusMeters) {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "Sorry! You are out of allowed area", distance });
  }
};

export { fencingCheck };
