


import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddRoom = () => {

  const { getToken, axios } = useAppContext();


  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {//object of booleans
      'Free Wifi': false,
      'Free Breakfast': false,
      'Mountain View': false,
      'Pool Access': false
    }

  });
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // check if all inputs fields are filled
    if (!inputs.roomType || !inputs.pricePerNight || !Object.values(inputs.amenities).some(val => val) //true (at least one is true)
      || !Object.values(images).some(image => image)) {
      toast.error('Please fill in all the details');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();// we need it in file uploads like images where Files cannot be sent as JSON else we can send data like : 
      //await axios.post('/api/rooms', {
      //   roomType,
      //   pricePerNight,
      //   amenities
      // });
      formData.append('roomType', inputs.roomType);
      formData.append('pricePerNight', inputs.pricePerNight);

      //convert amenities to array and keep enabled ones
      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append('amenities', JSON.stringify(amenities));//Converts JavaScript object → JSON string ['Free Wifi', 'Pool Access'] => ["Free Wifi","Pool Access"]

      //add images to formData

      Object.keys(images).forEach((key) => {
        images[key] && formData.append('images', images[key]);
      }

      );


      const { data } = await axios.post('/api/rooms/', formData, { headers: { Authorization: `Bearer ${await getToken()}` } });
      if (data.success) {
        toast.success(data.message);
        setInputs({
          'pricePerNight': 0,
          'roomType': '',
          'amenities': {
            'Free Wifi': false,
            'Free Breakfast': false,
            'Mountain View': false,
            'Pool Access': false
          }

        });
        setImages({
          1: null,
          2: null,
          3: null,
          4: null
        })

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);

    }

  }
  return (
    <form onSubmit={onSubmitHandler}>
      <Title align='left' font='outfit' title='Add Room' subtitle='Fill in the details below to create a new room listing and make it available for booking.' />
      {/* upload area for images */}
      <p className='text-gray-800 mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img className='max-h-13 cursor-pointer opacity-80' src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
            {/*  If user uploaded image → preview it
             Otherwise → show placeholder */}
            <input type="file" accept='image/*' id={`roomImage${key}`} hidden
              onChange={e => setImages({ ...images, [key]: e.target.files[0] })} />
          </label>


        ))}
      </div>


      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
        <div className="flex-1 max-w-48">
          <p className='mt-4 text-gray-800'>Room Type</p>
          <select
            value={inputs.roomType}
            onChange={e => setInputs({
              ...inputs,
              roomType: e.target.value

            })}
            id="" className="w-full border opacity-70 border-gray-300 mt-1 rounded p-2">
            <option value="">
              Select Room Type
            </option>
            <option value="Single Bed">
              Single Bed
            </option>
            <option value=" Double Bed">
              Double Bed
            </option>

            <option value="Luxury Room">
              Luxury Room
            </option>
            <option value="Family Suite">
              Family Suite
            </option>

          </select>
        </div>

        <div className='flex-1 max-w-48'>
          <p className='mt-4 text-gray-800'>
            Price <span className='text-xs'>/night</span>
          </p>
          <input type="number" placeholder='0' value={inputs.pricePerNight} className=" border opacity-70 border-gray-300 mt-1 rounded p-2 w-24" onChange={e => setInputs({ ...inputs, pricePerNight: e.target.value })} />
        </div>
      </div>

      <p className='text-gray-800 mt-4'>Amenities</p>
      <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
        {Object.keys(inputs.amenities)//['Free Wifi', 'Free Breakfast']
        .map((amenity, index) => (

          < div key={index}>
            <input type="checkbox" id={`amenities${index + 1}`} checked={inputs.amenities[amenity]}//inputs.amenities['Free Wifi'] if this true checked

              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],//reverse its state , why we add[amenity] because amenity is dynamic:
                  },
                })
              }
            />
            <label htmlFor={`amenities${index + 1}`}> {amenity}</label>

          </div>



        ))}

      </div>
      <button disabled={loading} className='bg-primary text-white px-8 py-2 rounded cursor-pointer  mt-8'>
        {loading ? 'Adding...' : 'Add Room'}
      </button>
    </form>
  )
}

export default AddRoom


// const amenities = {
//   wifi: true,
//   pool: false,
//   breakfast: true
// };

// const selected = Object.keys(amenities).filter(
//   (key) => amenities[key]
// );

// console.log(selected);
//["wifi", "breakfast"]