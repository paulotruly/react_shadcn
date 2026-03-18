import { getToken, setToken } from "@/lib/cookies"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import type { AuthResponse } from "@/types/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function LoginForm({

  className,
  ...props
}: React.ComponentProps<"div">) {

  const token = getToken()

  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate({ to: '/dashboard', replace: true })
    }
  }, [token, navigate])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30,
      }),
    })

    const data: AuthResponse = await response.json()

    if (response.ok) {
      login(data)
      setToken(data.accessToken)
      navigate({ to: '/dashboard' })
    } else {
      console.error("Login failed: ", data)
    }
  }

  return (

    <div className={cn("flex flex-col justify-center items-center gap-6 bg-gray-600 min-h-screen", className)} {...props}>
      <Card className="w-full max-w-md px-5 py-10">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  type="text"
                  placeholder="john_doe"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>


  )
}
