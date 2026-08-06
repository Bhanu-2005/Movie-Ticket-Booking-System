import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AuthCard from '../../components/common/AuthCard';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Register() {
  const { register: registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  
  const password = watch("password", "");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const success = await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password
      });
      if (success) {
        toast.success("Registration successful! Please login.");
        navigate('/login');
      }
    } catch (error) {
      // Error is handled in AuthContext via toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create an account"
      subtitle="Join CineTix to book tickets instantly"
      bottomText="Already have an account?"
      bottomLinkText="Sign in"
      bottomLinkTo="/login"
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />

        <Input
          label="Email address"
          type="email"
          placeholder="john@example.com"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          error={errors.email?.message}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="e.g. +1234567890"
          {...register('phone', { 
            required: 'Phone number is required'
          })}
          error={errors.phone?.message}
        />
        
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
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

        <Input
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm your password"
          {...register('confirmPassword', { 
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          })}
          error={errors.confirmPassword?.message}
        />
        
        <Button type="submit" isLoading={isLoading} className="mt-6">
          Create Account
        </Button>
      </form>
    </AuthCard>
  );
}
