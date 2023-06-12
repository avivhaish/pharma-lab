import React from 'react';
import { useNotifications } from '../../context/NotificationsContext';

const Notifications: React.FC = () => {
  const { lowQtyItems } = useNotifications();

  return (
    <>
      <span className='text-xl'>Low Qty Items:</span>
      {lowQtyItems.length > 0 && (
        <div className='flex flex-col gap-2'>
          {lowQtyItems.map((item: any) => (
            <div key={item.id} className='bg-red-400 p-4 text-lg rounded-md shadow'>
              <span > Item:{item.name}, Current QTY: {item.qty}, Minimum required: {item.minQtyWanted} </span>
            </div>
          ))}
        </div>
      )}
      {lowQtyItems.length === 0 && (
        <span>All Items are within an acceptable range of quantity</span>
      )}
    </>
  )
}

export default Notifications;