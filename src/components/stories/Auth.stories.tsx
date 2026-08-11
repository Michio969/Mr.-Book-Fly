import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from '../LoginForm';
import { SignupForm } from '../SignupForm';
import { EmailVerification } from '../EmailVerification';
import { PasswordReset } from '../PasswordReset';
import { AuthLayout } from '../AuthLayout';

const meta = {
  title: 'Features/Authentication',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Login Page
export const Login: Story = {
  render: () => (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue booking"
      toggleText="New to Mr. Book & Fly?"
      toggleLink="#signup"
    >
      <LoginForm
        onSubmit={(data) => console.log('Login:', data)}
      />
    </AuthLayout>
  ),
};

// Signup Page
export const Signup: Story = {
  render: () => (
    <AuthLayout
      title="Create Account"
      subtitle="Join us and start booking amazing travels"
      toggleText="Already have an account?"
      toggleLink="#login"
    >
      <SignupForm
        onSubmit={(data) => console.log('Signup:', data)}
      />
    </AuthLayout>
  ),
};

// Email Verification
export const VerifyEmail: Story = {
  render: () => (
    <AuthLayout title="Verify Your Email">
      <EmailVerification
        email="user@example.com"
        onVerify={(code) => console.log('Verify:', code)}
        onResend={() => console.log('Resend code')}
      />
    </AuthLayout>
  ),
};

// Password Reset - Request
export const ResetPasswordRequest: Story = {
  render: () => (
    <AuthLayout title="Reset Your Password">
      <PasswordReset
        step="request"
        onRequest={(email) => console.log('Reset request:', email)}
      />
    </AuthLayout>
  ),
};

// Password Reset - Verify
export const ResetPasswordVerify: Story = {
  render: () => (
    <AuthLayout title="Reset Your Password">
      <PasswordReset
        step="verify"
        email="user@example.com"
        onVerify={(code) => console.log('Verify:', code)}
      />
    </AuthLayout>
  ),
};

// Password Reset - New Password
export const ResetPasswordNew: Story = {
  render: () => (
    <AuthLayout title="Reset Your Password">
      <PasswordReset
        step="reset"
        onReset={(password) => console.log('New password:', password)}
      />
    </AuthLayout>
  ),
};

// Password Reset - Success
export const ResetPasswordSuccess: Story = {
  render: () => (
    <AuthLayout title="Reset Your Password">
      <PasswordReset
        step="success"
      />
    </AuthLayout>
  ),
};

// Error States
export const LoginError: Story = {
  render: () => (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account to continue booking">
      <LoginForm
        error="Invalid email or password. Please try again."
        onSubmit={(data) => console.log('Login:', data)}
      />
    </AuthLayout>
  ),
};

export const SignupError: Story = {
  render: () => (
    <AuthLayout title="Create Account" subtitle="Join us and start booking amazing travels">
      <SignupForm
        error="This email is already registered. Please log in instead."
        onSubmit={(data) => console.log('Signup:', data)}
      />
    </AuthLayout>
  ),
};

// Loading States
export const LoginLoading: Story = {
  render: () => (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account to continue booking">
      <LoginForm
        isLoading={true}
        onSubmit={(data) => console.log('Login:', data)}
      />
    </AuthLayout>
  ),
};

export const SignupLoading: Story = {
  render: () => (
    <AuthLayout title="Create Account" subtitle="Join us and start booking amazing travels">
      <SignupForm
        isLoading={true}
        onSubmit={(data) => console.log('Signup:', data)}
      />
    </AuthLayout>
  ),
};
