import GoogleLogin from 'react-google-login'
import React, { useState } from 'react'


const responseGoogle = (response) => {
    console.log(response);
}

function LoginGoogle({ className, value }) {

    return (
        <GoogleLogin
            clientId="910034420029-h13sgb6obm7ugo3621rkqs2arip7kjjj.apps.googleusercontent.com"
            render={renderProps => (
                <div>
                    <input type="submit" onClick={renderProps.onClick} className={className} value={value} />
                </div>
            )}
            isSignedIn={true}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}



export default LoginGoogle;