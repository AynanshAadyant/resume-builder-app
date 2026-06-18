import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import { Link, useNavigate } from "react-router"
import { toast } from "sonner";
import api from "@/api/api"
import { useAppDispatch } from "@/store/hooks"
import { authenticate } from "@/store/slice/authSlice"

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [form, setForm] = useState<any>({
    email: "",
    password: ""
  })
  const [ loading, setLoading ] = useState<boolean>( false )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading( true )
    if (!validateForm()) {
      return;
    }
    try{
      const response = await api.post( "/auth/login", form )
      if( response.success ) {
        toast.success( "Login successful" )
        dispatch( authenticate(response.body))
        navigate( "/dashboard" )
      }
      else 
        toast.error( response?.message || "Something went wrong" )
      setLoading( false );
    }
    catch(e) {
      toast.error( "Something went wrong" )
      console.error( e )
      setLoading( false )
    }
  }

  return (
    <div className={cn("flex flex-col gap-5", className)} {...props}>
      <Card className="rounded-lg bg-(--surface-container) shadow-none border-none">
        <CardHeader className="text-left">
          <CardTitle className="text-3xl font-bold text-white">Welcome back</CardTitle>
          <p className="text-sm text-white">Sign in to continue tailoring your resume library.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="text-white">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  onChange={handleChange}
                  className="rounded-lg border-none bg-(--surface-container-high) text-gray-400 placeholder:text-slate-600 focus-visible:ring-cyan-400"
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  name="password"
                  onChange={handleChange}
                  placeholder="********"
                  className="rounded-lg border-none bg-(--surface-container-high) text-gray-400 placeholder:text-slate-600 focus-visible:ring-cyan-400"
                />
                <a
                    href="#"
                    className="ml-auto text-sm text-(--inverse-surface) underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
              </Field>
              <Field>
                <Button className="w-full rounded-lg bg-white hover:underline" type="submit" disabled={loading}>{ loading ? "Logging In..." : "Login" }</Button>
                <FieldDescription className="text-center text-white">
                  Don&apos;t have an account? <Link to="/auth/signup" className="font-semibold text-cyan-700 hover:underline"> Sign Up </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-white">
        By clicking continue, you agree to our <a href="#" className="text-white underline">Terms of Service</a>{" "}
        and <a href="#" className="text-white underline">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
