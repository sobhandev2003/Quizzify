
import { Link } from 'react-router-dom'

function BeforeLoginHomePage() {
    return (
        <div>
            <div></div>
            <div>
                <Link to="register">Register</Link>
                <Link to="login">Login</Link>
            </div>
        </div>
    )
}

export default BeforeLoginHomePage