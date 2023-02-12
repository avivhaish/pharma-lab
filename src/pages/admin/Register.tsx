import { UserCredential } from 'firebase/auth';
import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

type Props = {}

const Register: React.FC<Props> = () => {
    const [fullName, setFullName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [verifyPassword, setVerifyPassword] = React.useState<string>("");
    const [isAdmin, setIsAdmin] = React.useState(false);

    const { createUser, addUserToDB } = useAuth();

    const resetStates = useCallback(() => {
        setFullName("");
        setEmail("");
        setPassword("");
        setVerifyPassword("");
        setIsAdmin(false);
    }, []);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const xxx: UserCredential = await createUser(email, password);
            await addUserToDB(xxx.user.uid, {
                name: fullName,
                isAdmin
            });

            alert("Success");
            resetStates();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formVerifyPassword">
                <Form.Label>Verify Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Verify password"
                    value={verifyPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVerifyPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIsAdmin">
                <Form.Label>Register as Admin?</Form.Label>
                <Form.Check
                    checked={isAdmin}
                    onChange={() => setIsAdmin(state => !state)}
                />
            </Form.Group>

            <Button variant="primary" type="submit" className='w-100'>
                Submit
            </Button>
        </Form>
    );
};

export default Register;


// const handleSubmit = async (e: React.SyntheticEvent) => {
//     e.preventDefault();

//     if (!fullName || !email || !password || !verifyPassword) {
//         return alert("Missing Info");
//     }

//     if (password !== verifyPassword) {
//         return alert("Passwords do not match!");
//     }

//     try {
//         const res = await axios.post("http://localhost:3001/auth/signup", {
//             fullName,
//             email,
//             password,
//             isAdmin
//         });

//         console.log(res);

//         if (res?.status !== 201) {
//             return alert("something went wrong");
//         }

//         resetStates();
//     } catch (error) {
//         alert(JSON.stringify(error));
//     }
// };