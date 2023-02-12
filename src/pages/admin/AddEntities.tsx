import React from 'react';
import { Form } from 'react-bootstrap';
import NewItemForm from '../../components/NewItemForm';
import NewStorageForm from '../../components/NewStorageForm';
import NewUserForm from '../../components/NewUserForm';
import Register from './Register';
import Button from 'react-bootstrap/Button';


type Props = {}

const enum EFormModes {
    User = "User",
    Item = "Item",
    Storage = "Storage"
}

const options: EFormModes[] = [EFormModes.Item, EFormModes.User, EFormModes.Storage];

const AddEntities = (props: Props) => {
    const [formMode, setFormMode] = React.useState<EFormModes>();

    const renderRelevantForm = () => {
        if (!formMode) {
            return null;
        }

        if (formMode === EFormModes.User) {
            return <Register />
        }

        if (formMode === EFormModes.Item) {
            return <NewItemForm />
        }

        if (formMode === EFormModes.Storage) {
            return <NewStorageForm />
        }
    }

    return (
        <div>
            <h5>please select an entity you would like to add</h5>
            <div className='p-2 mb-3'>
                <Form.Select
                    defaultValue="choose an option"
                    value={formMode}
                    onChange={e => setFormMode(e.target.value as EFormModes)}
                >
                    <option disabled>choose an option</option>
                    {options.map((o) => <option value={o}>{o}</option>)}
                </Form.Select>
            </div>
            {renderRelevantForm()}
        </div>
    );
};

export default AddEntities;