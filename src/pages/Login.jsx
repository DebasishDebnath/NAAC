import React, { useState } from 'react';
import { useSuperadminApi } from '../Apis/Authentication/SigninSuperadmin';
import { useNotification } from '../hooks/useHttp';
// import { useSuperadminApi } from '../../path/to/your/api';
// import { useNotification } from '../../hooks/useHttp';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signinSuperadmin } = useSuperadminApi();
  const { showError } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await signinSuperadmin(email, password);
      console.log("Login response in component:", response);
      
      // If no notifications are showing, manually show one based on the response
      if (response && response.success) {
        // Handle successful login (usually done in the hook)
        // You shouldn't need this if the notifications are working properly
      } else if (response === null) {
        showError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      showError("An unexpected error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
        required
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}

export default LoginPage;