import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/authSlice';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '@/redux/authService';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser(email, password);
      dispatch(login({ token, user }));

      // Redirect based on user role
      if (user.role === 'Admin') navigate('/admin-dashboard');
      else if (user.role === 'Developer') navigate('/developer-dashboard');
      else if (user.role === 'Manager') navigate('/manager-dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Invalid credentials, please try again.');
    }
  };

  return (
    <Card className="w-[400px] mx-auto p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <Button className="w-full" type="submit">Login</Button>
        </form>
      </CardContent>
      <CardFooter className="text-center">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 font-medium">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
