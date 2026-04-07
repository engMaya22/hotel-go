import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import EditRoomModal from '../../components/EditRoomModal';
import { Delete, DeleteIcon, Pencil, RemoveFormatting } from "lucide-react";
import ConfirmModal from '../../components/ConfirmModal';
const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user, currency } = useAppContext();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);


  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms/owner', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      if (data.success) setRooms(data.rooms);
      else toast.error(data.message);

    } catch (error) {
      toast.error(error.message);
    }
  };

  const openEditModal = (room) => {
    setSelectedRoom(room);
    setIsEditOpen(true);
  };


  const deleteHandler = async (room) => {
    try {
      const { data } = await axios.delete('/api/rooms/delete-room', {
        headers: { Authorization: `Bearer ${await getToken()}` },// axios.delete works differently from axios.post/axios.put:

        //The second parameter is always config (like headers), not the body.
        data: { roomId: room._id } // <-- pass body here
      });

      if (data.success) {
        fetchRooms();
        toast.success(data.message);
      }
      else toast.error(data.message);

    } catch (error) {
      toast.error(error.message);
    }

  }



  //fetch rooms for hotel owner
  useEffect(() => {
    if (user) fetchRooms();
  }, [user]);

  //toggle availability of the room
  const changeAvailability = async (roomId) => {

    try {
      const { data } = await axios.post('/api/rooms/toggle-room-availability', { roomId }, {// we add {roomId} as abject because api expect an abject
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      if (data.success) {
        toast.success(data.message)
        fetchRooms();
      }
      else toast.error(data.message);

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div>
        <Title align='left' font='outfit' title='Room Listings'
          subtitle='View , edit ,or manage all listed rooms , Keep the  information up to date to provide best experience for users.' />
        <p className='text-gray-500 mt-8'>All Rooms</p>

        <div className=' w-full max-w-3xl text-left  border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>

          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='py-3 px-4 text-gray-800 font-medium'> Name</th>
                <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                <th className='py-3 px-4 text-gray-800 font-medium'>Price /night</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
              </tr>

            </thead>
            <tbody className='text-sm'>
              {rooms.map((item, index) =>
              (
                <tr key={index}>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                    {item.roomType}
                  </td>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                    {item.amenities.join(', ')}
                  </td>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                    {currency}{item.pricePerNight}
                  </td>

                  <td className='py-3 px-4 border-t border-gray-300 text-center flex flex-col sm:flex-row items-center justify-center gap-2'>

                    {/* Toggle */}
                    <div className="relative group">
                      <label
                        htmlFor={`room-${item._id}`}
                        className="relative inline-flex items-center gap-3 cursor-pointer text-gray-900"
                      >
                        <input
                          type="checkbox"
                          id={`room-${item._id}`}
                          className="sr-only peer"
                          onChange={() => changeAvailability(item._id)}
                          checked={item.isAvailable}
                        />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                        <span
                          className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200
                 ease-in-out peer-checked:translate-x-5"
                        ></span>
                      </label>

                      {/* Tooltip */}
                      <span
                        className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 
               hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded"
                      >
                        {item.isAvailable ? 'Available' : 'Not Available'}
                      </span>
                    </div>

                    {/* Edit Button */}
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 bg-blue-500 text-white mx-2 rounded-md hover:bg-blue-600 transition group relative"
                    >
                      <Pencil size={16} />

                      <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                        Edit
                      </span>
                    </button>


                    {/* delete Button */}
                    {/* delete Button */}
                    <button
                      onClick={() => {
                        setSelectedRoom(item); // track which room
                        setIsDeleteOpen(true); // open modal
                      }}
                      className="p-2 bg-red-500 text-white mx-2 rounded-md hover:bg-red-600 transition group relative"
                    >
                      <DeleteIcon size={16} />
                      <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                        Delete
                      </span>
                    </button>
                  </td>
                </tr>

              )

              )}

            </tbody>
          </table>
        </div>

      </div>
      <EditRoomModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        room={selectedRoom}
        onSave={fetchRooms}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete the room "${selectedRoom?.roomType}"? This action cannot be undone.`}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedRoom(null);
        }}
        onConfirm={async () => {
          await deleteHandler(selectedRoom);
          setIsDeleteOpen(false);
          setSelectedRoom(null);
         
        }}
         buttonTitle='Delete'
      />


    </>

  )

}

export default ListRoom
