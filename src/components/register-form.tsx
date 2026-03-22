import { useForm } from "react-hook-form"
import { registerSchema } from "@/schemas/register-schema"
import type { RegisterFormData } from "@/schemas/register-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { getToken } from "@/lib/cookies"
import { useNavigate } from "@tanstack/react-router"
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
import { useEffect } from "react"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const navigate = useNavigate()
  const token = getToken()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  useEffect(() => {
    if (token) {
      navigate({ to: '/dashboard', replace: true })
    }
  }, [token, navigate])

  // dummyjson não tem registro, então é só pra simular mesmo
  async function onSubmit(data: RegisterFormData) {
    const response = await fetch("https://dummyjson.com/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })

    if (response.ok) {
      navigate({ to: "/login" })
    } else {
      const errorData = await response.json()
      console.error("Registration failed:", errorData)
    }
  }

  const cancelRegister = () => {
    navigate({ to: "/login" })
  }

  return (
    <div className={cn("flex flex-col justify-center items-center gap-6 bg-gray-600 min-h-screen", className)} {...props}>
      <Card className="w-full max-w-md px-5 py-10">
        
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  placeholder="john_doe"
                />
                {errors.username && (
                  <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="••••••"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                )}
              </Field>

              <Field className="gap-5">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
                <FieldDescription className="text-center">
                  <button type="button" onClick={cancelRegister}>Cancel</button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
