import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import { useState } from "react";

const getfields = (isSignIn: boolean) => [
  {
    label: 'Email address',
    type: 'email',
    name: 'email',
    required: true,
    placeholder: 'Enter your email address',
  },
  {
    label: 'Password',
    type: 'password',
    name: 'password',
    required: true,
    placeholder: 'Enter your password',
  },
  ...(isSignIn ? [] : [
    {
      label: 'Confirm Password',
      type: 'password',
      name: 'confirmPassword',
      required: true,
      placeholder: 'Confirm your password',
    },
  ])
]

export default function Auth({ isSignIn = true }: { isSignIn: boolean }) {
  const [data, setData] = useState({ 
    email: '',
    password: '',
    ...(isSignIn ? {} : { confirmPassword: '' }),
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            { isSignIn ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {
              getfields(isSignIn).map((field) => (
                <Input
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={data[field.name as keyof typeof data] as string}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => setData({ ...data, [field.name]: e.target.value })}
                />
              ))
            }

            <Button type="submit" className="w-full">
              { isSignIn ? 'Sign in' : 'Create account'}
            </Button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            { isSignIn ? 'New to TaskFlow?' : 'Already have an account?'}{' '}
            <Link to={ isSignIn ? "/register" : "/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              { isSignIn ? 'Create an account' : 'Sign in'}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
