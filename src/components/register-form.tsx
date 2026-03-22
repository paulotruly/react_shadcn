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

export function RegisterForm({

  className,
  ...props
}: React.ComponentProps<"div">) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()

  const cancelRegister = () => {
      navigate({ to: "/login" })
    }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch("https://dummyjson.com/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        username: username,
        password: password,
      }),
    })

    const data: AuthResponse = await response.json()

    if (response.ok) {
      console.log("Registro efetuado com sucesso", data)
    } else {
      console.error("Login failed: ", data)
    }
  }

  return (

    <div className={cn("flex flex-col justify-center items-center gap-6 bg-gray-600 min-h-screen", className)} {...props}>
      <Card className="w-full max-w-md px-5 py-10">
        
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription> Descrição aqui </CardDescription>
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
                  placeholder="Type here"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password"> Password </FieldLabel>
                <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="Type here"
                required />
            </Field>

            <Field>
                <FieldLabel htmlFor="confirmPassword"> Confirm password </FieldLabel>
                <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                type="password"
                placeholder="Type here"
                required />
              </Field>
              <Field className="gap-5">
                <Button type="submit">Register</Button>
                <FieldDescription className="text-center">
                  <button onClick={cancelRegister}>Cancelar</button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
