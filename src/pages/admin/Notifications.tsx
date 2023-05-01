import React, { useEffect, useState } from 'react';
import { Unsubscribe } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { itemsCollectionRef } from '../../firebase/collections';

const Notifications: React.FC = () => {
  const [lowQtyItems, setLowQtyItems] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));

      const fillteredData = data.filter(item => item.minQtyWanted >= item.qty)
      setLowQtyItems(fillteredData);
    });

    return () => {
      console.log("Unsubscribe")
      unsubscribe();
    }
  }, []);

  return (
    <>
      <span className='text-xl'>Low Qty Items:</span>
      {lowQtyItems.length > 0 && (
        <div className='flex flex-col gap-2'>
          {lowQtyItems.map(item => (
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