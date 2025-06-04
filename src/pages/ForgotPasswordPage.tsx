import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import AuthPageLayout from '@/components/layout/AuthPageLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address. Please enter a valid email." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setMessage(null);
    console.log('Forgot password form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Example: Replace with actual logic
    setMessage({ type: 'success', text: `If an account exists for ${data.email}, a password reset link has been sent.` });
    form.reset(); 
    // setTimeout(() => navigate('/login'), 3000); // Optionally navigate back
  };

  return (
    <AuthPageLayout title="Forgot Your Password?">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email address below and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className={`mb-4 ${message.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : ''}`}>
              {message.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              <AlertTitle>{message.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link to="/login">Back to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </AuthPageLayout>
  );
};

export default ForgotPasswordPage;