import React from 'react';
import { Button, Form, Grid, Loader } from 'semantic-ui-react';
import { useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import register from 'pages/api/register';

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
};

function Register() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setError] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [registerForm, setRegisterForm] = useState(initialState);

    const handleSubmit = async(e) => {
        e.preventDefault();
        let errs = validate();

        if(Object.keys(errs).length) return setError(errs);
        setIsSubmitting(true);

        try {
            const res = await fetch(`http://localhost:3000/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerForm),
            });

            const data = await res.json();
            setIsSubmitting(false);

            if(res.status == 200) {
                router.push('/');
            } else if(res.status == 401) {
                return setError(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const validate = () => {
        let errors = {};
        if(!registerForm.name) {
            errors.name = "Enter your Name";
        }
        if(!registerForm.email) {
            errors.email = "Enter your Email";
        }
        if(!registerForm.password) {
            errors.password = "Ener your Password";
        }
        if(registerForm.password != registerForm.confirmPassword) {
            errors.password = "Invalid your password";
            errors.confirmPassword = "Invalid your password";
        }
        return errors;
    }

    return (
        <Grid
            centered
            verticalAlign="middle"
            style={{height: "80vh"}}
        >
            <Grid.Row>
                {isSubmitting ? (
                    <Loader active inline="centered" />
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            label="Name"
                            placeholder="Name"
                            name="name"
                            onChange={(e) =>
                                setRegisterForm({
                                    ...registerForm, name: e.target.value
                                })
                            }
                            error={ errors.name ? errors.name:null }
                        />
                        <Form.Input
                            label="Email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) =>
                                setRegisterForm({
                                    ...registerForm, email: e.target.value
                                })
                            }
                            error={ errors.email ? errors.email:null }
                        />
                        <Form.Input
                            label="Password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) =>
                                setRegisterForm({
                                    ...registerForm, password: e.target.value
                                })
                            }
                            error={errors.password ? errors.password : null}
                        />
                        <Button type="submit" primary>SignUp</Button>
                        <Link href="/">
                            <Button type='button' primary>LogIn</Button>
                        </Link>
                    </Form>
                )}
            </Grid.Row>
        </Grid>
    );
};

export default Register;