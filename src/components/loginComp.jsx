import React, { useState } from "react";
import factus from "../assets/img/factus.jpg";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../store.js"



export const LoginIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { store, dispatch} =useGlobalReducer();

    const handleSubmit = async (e) => {
        e.preventDefault();
    setLoading(true);
    try {
      // Despachar la acción de login
      await dispatch(login(username, password));
      navigate("/"); 
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
      };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
                    <div className="text-center mb-4">
                        <img
                            className="mx-auto h-10 w-auto"
                            height={150}
                            src={factus}
                        />
                        <h2 className="mt-3">Sign in</h2>
                    </div>

                    <form className="form-control" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="text" className="form-label">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    name="email"
                                    placeholder="Email"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="form-control mb-3"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="d-flex justify-content-between">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="text-decoration-none">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2 pb-3">
                                <input
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control mb-3"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-3 text-center">
                        Not a member?{' '}
                        <a href="#" className="text-decoration-none">
                           
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};