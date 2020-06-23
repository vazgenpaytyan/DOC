import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import React from 'react'

const responseFacebook = (response) => {
    console.log(response)
}
function LoginFacebook({ className, value }) {


    return (
        <FacebookLogin
            appId="564808224408291"
            callback={responseFacebook}
            fields="name,email,picture"
            scope="public_profile, email, user_birthday"
            returnScopes={true}
            autoLoad={false}
            render={renderProps => (
                <div>
                    <input type="submit" onClick={renderProps.onClick} className={className} value={value} />
                </div>)}
        />
    );
}



export default LoginFacebook;