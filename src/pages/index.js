import React from 'react';
import { Button, Form, Grid, Loader } from 'semantic-ui-react';
import { connect, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { signin } from '../redux/actions/authAction';
import { useRouter } from "next/router";
import Link from 'next/link';

const initialState = {
    email: '',
    password: '',
};

function Home(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setError] = useState({
        email: "",
        password: ""
    });
    const [loginForm, setLoginForm] = useState(initialState);

    useEffect(() => {
        if(props.userInfo != null) {
            router.push('/posts/first-post');
        }
    },[]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        let errs = validate();

        if(Object.keys(errs).length) return setError(errs);
        setIsSubmitting(true);

        try {
            const res = await fetch(`http://localhost:3000/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginForm),
            });

            const data = await res.json();
            setIsSubmitting(false);

            if(res.status == 200) {
                dispatch(signin(data));
                router.push('/posts/first-post');
            } else if(res.status == 401) {
                return setError(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const validate = () => {
        let errors = {};
        if(!loginForm.email) {
            errors.email = "Enter your Email";
        }

        if(!loginForm.password) {
            errors.password = "Ener your Password";
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
                            label="Email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) =>
                                setLoginForm({
                                    ...loginForm, email: e.target.value
                                })
                            }
                            error={ errors.email ? errors.email:null }
                        />
                        <Form.Input
                            label="Password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) =>
                                setLoginForm({
                                    ...loginForm, password: e.target.value
                                })
                            }
                            error={errors.password ? errors.password : null}
                        />
                        <Button type="submit" primary>SignIn</Button>
                        <Link href="/account/register">
                            <Button type='button' primary>Register</Button>
                        </Link>
                    </Form>
                )}
            </Grid.Row>
        </Grid>
    );
};

const mapStateToProps = state => {
    return { 
        userInfo: state.main.userInfo,
    }
}

const mapDispatchToProps = {
    // setInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)