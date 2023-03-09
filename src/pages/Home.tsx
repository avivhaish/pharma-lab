import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

type Props = {}

export const DUMMY_STORAGE = [
    { id: 0, name: 'Cabinet' },
    { id: 1, name: 'Refrigerator' },
    { id: 2, name: 'Freezer -20' },
    { id: 3, name: 'Freezer -80' },
    { id: 4, name: 'Liquahid Nitrohaujin' },
];

const Home: React.FC<Props> = ({ }) => {
    const navigate = useNavigate();

    return (
        <ListGroup as="ul">
            {DUMMY_STORAGE.map(({ id, name }) => (
                <ListGroup.Item
                    key={id}
                    action
                    onClick={() => navigate("/storage/" + id)}
                >
                    <span className='text-info'>
                        {name}
                    </span>
                </ListGroup.Item>
            ))}
            <span className='bg-red-700'>dfsglkn</span>
        </ListGroup>
    );
};

export default Home;