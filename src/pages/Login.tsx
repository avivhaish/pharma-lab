import { UserCredential } from 'firebase/auth';
import React, { useState, FC } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext';

const Login: FC = () => {
    console.log("render");

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const ccc: UserCredential = await login(email, password);
            // לשלוף את היוזר מהפיירסטור, ואז לעשות להזריק רת היוזר הזה לקונטקסט
            // אם הפעולה הצליחה, לנתב לעמוד הבית
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Form onSubmit={handleLogin} className='bg-primary text-white border border-primary h-100 p-5 align-center d-flex flex-column rounded'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e: React.ChangeEvent<any>) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<any>) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default Login;