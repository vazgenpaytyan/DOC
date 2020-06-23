import React from 'react'
import '../components/authentication/style.css'

function useButton({ className, value, renderProps }) {
    return (
        <div>
            <input type="submit"
                className={className}
                value={value}
                onClick={renderProps.onClick} />
        </div>
    );
}

export default useButton;