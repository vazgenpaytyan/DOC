import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import LoginFacebook from './LoginFacebook'
import LoginGoogle from './LoginGoogle'
import '../style.css'

const initialValues = {
    email: '',
    password: ''
}
const onSubmit = values => {
    console.log(values);
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string().required('Required')
})

function SignIn() {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit} >
            <Form className="login-form">
                <h1>Sign in</h1>
                <div className="bottom-text">
                    New user? <a href="#">Create an account </a>
                </div>
                <div className="txtb">
                    <Field type="email" id="password" name="email" />
                    <ErrorMessage name="email" component="div" />
                    <span data-placeholder="Email address"></span>
                </div>
                <div className="txtb">
                    <Field type="password" id="password" name="password" />
                    <span data-placeholder="Password"></span>
                    <ErrorMessage name="password" />
                </div>
                <div>
                    <Field type="submit" className="btn logbtn" value="Sign in" />
                </div>
                <div>
                    <hr />
                </div>
                <LoginFacebook className="btn fb" value="Continue with facebook" />
                <LoginGoogle className="btn google" value="Continue with google" />
                <div className="text">
                    Protected by reCAPTCHA and subject to the Google
       <a href="#"> Privacy Policy</a> and <a href="#">Terms of Service</a>.
    </div>
            </Form>
        </Formik>
    )
}

export default SignIn;