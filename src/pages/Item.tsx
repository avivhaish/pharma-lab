import React from 'react';
import { useParams } from 'react-router-dom';

const Item: React.FC = () => {
    const { itemId } = useParams();

    console.log(itemId);

    return (
        <div>Item: {itemId}</div>
    )
}

export default Item