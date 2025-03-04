import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Twitter, 
  Instagram, 
  Facebook, 
  Sun
} from 'lucide-react';
import { SignUpFormData } from '../types/auth';
import Notification from '../components/Notification';

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: 'success' as 'success' | 'error',
    isVisible: false
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const onSubmit = (data: SignUpFormData) => {
    // In a real app, you would make an API call here
    // For demo purposes, we'll store in localStorage
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Check if email already exists
    const emailExists = users.some((user: any) => user.email === data.email);
    if (emailExists) {
      setNotification({
        message: 'Email already exists',
        type: 'error',
        isVisible: true
      });
      return;
    }
    
    // Add new user
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
    
    setIsSuccess(true);
    setNotification({
      message: 'Account created successfully!',
      type: 'success',
      isVisible: true
    });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Notification */}
      <Notification 
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
      
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <Sun className="h-8 w-8 text-yellow-500" />
                  <span className="ml-2 text-xl font-semibold">MyBrand</span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/#about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About Me
                </Link>
                <Link to="/#contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Contact
                </Link>
                <div className="relative">
                  <button 
                    onClick={toggleProducts}
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Products
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {isProductsOpen && (
                    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <Link to="/blogs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Blogs</Link>
                        <Link to="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Services</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link to="/" className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                  Sign In
                </span>
              </Link>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link to="/#about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                About Me
              </Link>
              <Link to="/#contact" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                Contact
              </Link>
              <button 
                onClick={toggleProducts}
                className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                <div className="flex justify-between items-center">
                  Products
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
              {isProductsOpen && (
                <div className="pl-6">
                  <Link to="/blogs" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                    Blogs
                  </Link>
                  <Link to="/services" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                    Services
                  </Link>
                </div>
              )}
              <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-indigo-600 hover:bg-gray-50 hover:border-gray-300">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Sign Up Form */}
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {isSuccess ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Account created successfully!</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                You can now sign in with your credentials.
              </p>
              <div className="mt-6">
                <Link
                  to="/"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Or{' '}
                  <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                    sign in to your account
                  </Link>
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="firstName"
                          type="text"
                          autoComplete="given-name"
                          className={`appearance-none block w-full px-3 py-2 border ${
                            errors.firstName ? 'border-red-300' : 'border-gray-300'
                          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          {...register('firstName', {
                            required: 'First name is required',
                            minLength: {
                              value: 3,
                              message: 'First name must be at least 3 characters'
                            },
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: 'First name must contain only letters'
                            }
                          })}
                        />
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="lastName"
                          type="text"
                          autoComplete="family-name"
                          className={`appearance-none block w-full px-3 py-2 border ${
                            errors.lastName ? 'border-red-300' : 'border-gray-300'
                          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          {...register('lastName', {
                            required: 'Last name is required',
                            minLength: {
                              value: 3,
                              message: 'Last name must be at least 3 characters'
                            },
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: 'Last name must contain only letters'
                            }
                          })}
                        />
                        {errors.lastName && (
                          <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.password ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters'
                          },
                          pattern: {
                            value: /^(?=.*[!@#$%^&*])/,
                            message: 'Password must contain at least one special character'
                          }
                        })}
                      />
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                      Interests (Optional)
                    </label>
                    <div className="mt-1">
                      <select
                        id="interests"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register('interests')}
                      >
                        <option value="">Select an interest</option>
                        <option value="Tech">Tech</option>
                        <option value="Health">Health</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Travel">Travel</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newsletter"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          {...register('newsletter')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newsletter" className="font-medium text-gray-700">
                          Subscribe to newsletter
                        </label>
                        <p className="text-gray-500">Get the latest updates and news.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <Link to="/blogs" className="text-base text-gray-500 hover:text-gray-900">
                Blogs
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link to="/services" className="text-base text-gray-500 hover:text-gray-900">
                Services
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link to="/#contact" className="text-base text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default SignUp;