import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DUMMY_STORAGE } from './Home';

type Props = {}

const Storage: React.FC = () => {
    const [storage, setStorage] = useState<any>();
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            return;
        }

        const findStorageById = DUMMY_STORAGE.find((storage) => storage.id === Number(id));

        if (!findStorageById) {
            return;
        }

        setStorage(findStorageById);
    }, [id]);

    return (
        <div>
            {!id && "NO ID"}
            {storage && <h1>{storage.id}, {storage.name}</h1>}
        </div>
    );
};

export default Storage;