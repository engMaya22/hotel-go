import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ROOM_TYPES = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
const AMENITIES_LIST = ["Free WiFi", "Free Breakfast", "Mountain View", "Pool Access"];

const EditRoomModal = ({ isOpen, onClose, room, onSave }) => {
    const { axios, getToken } = useAppContext();

    const [formData, setFormData] = useState({
        roomType: '',
        pricePerNight: '',
        isFeatured: false,
        amenities: {} // store as object like { "Free WiFi": true, "Pool Access": false }

    });
    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });

    // populate form when room changes
    useEffect(() => {
        if (room) {
            const amenitiesObj = {};
            AMENITIES_LIST.forEach(a => {
                amenitiesObj[a] = room.amenities?.some(rA => rA.trim().toLowerCase() === a.trim().toLowerCase()) || false;
            });

            setFormData({
                roomType: room.roomType || '',
                pricePerNight: room.pricePerNight || '',
                isFeatured: room.isFeatured,
                amenities: amenitiesObj
            });
            const imgs = {};
            for (let i = 0; i < 4; i++) {
                imgs[i + 1] = room.images[i] || null;
            }
            setImages(imgs);
        }
    }, [room]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleAmenity = (amenity) => {
        setFormData({
            ...formData,
            amenities: {
                ...formData.amenities,
                [amenity]: !formData.amenities[amenity]
            }
        });
    };
    const toggleFeatured = () => {
        setFormData(prev => ({
            ...prev,
            isFeatured: !prev.isFeatured
        }));
    };
    const handleUpdate = async () => {

        try {
            const form = new FormData();
            form.append('roomId', room._id);
            form.append('roomType', formData.roomType);
            form.append('pricePerNight', formData.pricePerNight);
            form.append('isFeatured', JSON.stringify(formData.isFeatured));//from data not keep type ! so it will be string instead of boolean
            form.append('amenities', JSON.stringify(
                Object.keys(formData.amenities).filter(k => formData.amenities[k])
            ));


            // Append new images only
            Object.values(images).forEach(img => {
                if (img instanceof File) {
                    form.append('images', img);
                }
            });

            // for (let pair of form.entries()) {
            //     console.log(pair[0], pair[1]);
            // }
            const { data } = await axios.put('/api/rooms/update-room', form, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            });


            if (data.success) {

                toast.success(data.message);
                onClose();
                onSave();
            } else toast.error(data.message);

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-semibold mb-4">Edit Room</h2>

                {/* Room Type */}
                <label className="block text-gray-700">Room Type</label>
                <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3"
                >
                    <option value="">Select Room Type</option>
                    {ROOM_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                {/* Price */}
                <label className="block text-gray-700">Price /night</label>
                <input
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3"
                />

                {/* Amenities */}
                <label className="block text-gray-700 mb-1">Amenities</label>
                <div className="flex flex-col flex-wrap mb-4">
                    {AMENITIES_LIST.map((amenity, index) => (
                        <label key={index} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.amenities[amenity] || false}
                                onChange={() => toggleAmenity(amenity)}
                            />
                            {amenity}
                        </label>
                    ))}
                </div>

                <p className='text-gray-800 mt-4'>Images</p>
                <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
                    {Object.keys(images).map((key) => (
                        <label htmlFor={`roomImage${key}`} key={key}>
                            <img
                                className='max-h-13 cursor-pointer opacity-80'
                                src={images[key] ? (typeof images[key] === 'string' ? images[key] : URL.createObjectURL(images[key])) : '/assets/upload-placeholder.png'}
                                alt=""
                            />
                            <input
                                type="file"
                                accept='image/*'
                                id={`roomImage${key}`}
                                hidden
                                onChange={e => setImages({ ...images, [key]: e.target.files[0] })}
                            />
                        </label>
                    ))}
                </div>

                <div className="flex items-center gap-2 mt-3">
                    <input
                        type="checkbox"
                        id={`featured-${room?._id}`}
                        className="w-4 h-4"
                        checked={formData.isFeatured}
                        onChange={toggleFeatured}
                    />

                    <label htmlFor={`featured-${room?._id}`} className="text-gray-700">
                        Featured Room
                    </label>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditRoomModal;