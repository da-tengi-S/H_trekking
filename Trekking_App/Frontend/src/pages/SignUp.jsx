

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Auth = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (isSignUp && !formData.username) {
            newErrors.username = "Username is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        if (isSignUp) {
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = "Confirm Password is required";
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        const endpoint = isSignUp ? "/api/users/register" : "/api/users/login";
        const payload = isSignUp
            ? { name: formData.username, email: formData.email, password: formData.password }
            : { email: formData.email, password: formData.password };

        try {
            const { data } = await axios.post(`${BACKEND_URL}${endpoint}`, payload);
            console.log("Response:", data);
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setErrors({ general: error.response?.data?.message || "An error occurred" });
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-20">
            <h2 className="text-3xl font-bold text-center mb-6">
                {isSignUp ? "Sign Up" : "Login"}
            </h2>

            {errors.general && (
                <p className="text-red-600 text-sm mb-4">{errors.general}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.username && (
                            <p className="text-red-600 text-sm">{errors.username}</p>
                        )}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.password && (
                        <p className="text-red-600 text-sm">{errors.password}</p>
                    )}
                </div>

                {isSignUp && (
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
                        )}
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
                    </button>
                </div>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-blue-500 underline"
                    >
                        {isSignUp ? "Login" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
