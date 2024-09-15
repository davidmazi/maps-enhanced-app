import { computeDestinationPoint, getDistance } from "geolib";

export const getRandomNearbyPosition = (
  center: { latitude: number; longitude: number },
  maxRadiusMeters: number,
): { latitude: number; longitude: number } => {
  // Generate a random angle (in radians)
  const randomAngle = Math.random() * 2 * Math.PI;

  // Generate a random distance (up to maxRadiusMeters)
  const randomDistance = Math.random() * maxRadiusMeters;

  // Use geolib to compute the destination point
  const randomPosition = computeDestinationPoint(
    center,
    randomDistance,
    (randomAngle * 180) / Math.PI, // Convert angle to degrees
  );

  return {
    latitude: randomPosition.latitude,
    longitude: randomPosition.longitude,
  };
};

export const validatePosition = (
  center: { latitude: number; longitude: number },
  position: { latitude: number; longitude: number },
  maxRadiusMeters: number,
): boolean => {
  const distance = getDistance(center, position);
  return distance <= maxRadiusMeters;
};
