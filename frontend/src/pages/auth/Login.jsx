import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AuthCard from '../../components/common/AuthCard';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const success = await login(data);
      if (success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      // Error is handled in AuthContext via toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your account to book tickets"
      bottomText="Don't have an account?"
      bottomLinkText="Sign up now"
      bottomLinkTo="/register"
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email address"
          type="email"
          placeholder="Enter your email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          error={errors.email?.message}
        />
        
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register('password', { 
              required: 'Password is required'
            })}
            error={errors.password?.message}
          />
          <button
            type="button"
            className="absolute right-3 top-[34px] text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-[#DC2626] focus:ring-[#DC2626] border-gray-700 rounded bg-gray-800"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-[#DC2626] hover:text-red-400">
              Forgot your password?
            </a>
          </div>
        </div>
        
        <Button type="submit" isLoading={isLoading}>
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}
