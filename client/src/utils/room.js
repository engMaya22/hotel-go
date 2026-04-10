// validate form
export const validateRoomForm = (inputs, images) => {
  return (
    inputs.roomType &&
    inputs.pricePerNight &&
    Object.values(inputs.amenities).some(val => val) &&
    Object.values(images).some(img => img)
  );
};

// convert amenities object → array
//convert amenities to array and keep enabled ones
export const getSelectedAmenities = (amenitiesObj) => {
  return Object.keys(amenitiesObj).filter(
    key => amenitiesObj[key]
  );
};

// build formData
export const buildRoomFormData = (inputs, images) => {
  const formData = new FormData();// we need it in file uploads like images where Files cannot be sent as JSON else we can send data like : 

  formData.append('roomType', inputs.roomType);
  formData.append('pricePerNight', inputs.pricePerNight);
  formData.append('isFeatured',inputs.isFeatured);

  const amenities = getSelectedAmenities(inputs.amenities);
  formData.append('amenities', JSON.stringify(amenities));//Converts JavaScript object → JSON string ['Free Wifi', 'Pool Access'] => ["Free Wifi","Pool Access"]

  Object.keys(images).forEach((key) => {
    if (images[key]) {
      formData.append('images', images[key]);
    }
  });

  return formData;
};