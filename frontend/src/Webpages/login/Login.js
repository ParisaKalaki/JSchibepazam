import React from "react"
import "../../login.css"
import { useLocation,useNavigate} from "react-router-dom";
import useAuth from "./useAuth"



export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const { state } = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();


    function handleSubmit(e) {
        login().then(() => {
            navigate(state?.path || "/dashboard");
          });
        }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button>Log in
                </button>
            </form>
        </div>
    )

}
