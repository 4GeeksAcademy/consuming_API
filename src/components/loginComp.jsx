import React from "react";
import factus from "../assets/img/factus.jpg";

export const LoginIn = () => {

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

                    <form action="#" method="POST" className="space-y-4">
                        <div>
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="form-control"
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
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="form-control"
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
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>

        </>
    )
}