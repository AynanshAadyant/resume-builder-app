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
import { Link, useNavigate } from "react-router"
import api from "@/api/api"
import { toast } from "sonner"
import { useAppDispatch } from "@/store/hooks"
import { authenticate } from "@/store/slice/authSlice"

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    
    if (form.name.trim().length === 0 || 
        form.email.trim().length === 0 || 
        form.password.length === 0) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post("/auth/register", form)
      if (response.success) {
        toast.success("Sign Up successful")
        dispatch( authenticate(response.user) )
        setTimeout( () => { navigate( "/dashboard" )}, 500 )
        
      } else {
        toast.error(response.message || "Something went wrong")
      }
    } catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex w-full flex-col gap-5", className)} {...props}>
      <Card className="rounded-lg border border-none bg-(--surface-container) shadow-none">
        <CardHeader className="text-left">
          <CardTitle className="text-3xl font-bold text-white">Create your account</CardTitle>
          <CardDescription className="text-gray-200">
            Start with your profile, then tailor resumes for every role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name" className="text-white">Full Name</FieldLabel>
                <Input 
                  id="name" 
                  name="name"
                  type="text" 
                  placeholder="John Doe" 
                  value={form.name}
                  onChange={handleChange}
                  required 
                  className="rounded-lg border-none bg-(--surface-container-high) text-gray-400 placeholder:text-slate-600 focus-visible:ring-cyan-400"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-white">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="rounded-lg border-none bg-(--surface-container-high) text-gray-400 placeholder:text-slate-600 focus-visible:ring-cyan-400"
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      value={form.password}
                      onChange={handleChange}
                      required 
                  className="rounded-lg border-none bg-(--surface-container-high) text-gray-400 placeholder:text-slate-600 focus-visible:ring-cyan-400"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password" className="text-white">
                      Confirm Password
                    </FieldLabel>
                    <Input 
                      id="confirm-password" 
                      name="confirmPassword"
                      type="password" 
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required 
                  className="rounded-lg border-none bg-(--surface-container-high) text-gray-400 placeholder:text-slate-600 focus-visible:ring-cyan-400"
                    />
                  </Field>
                </Field>
                <FieldDescription className="text-white">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full rounded-lg border-0 bg-slate-950 text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center text-white">
                  Already have an account? <Link to="/auth/login" className="font-semibold text-white hover:underline">Sign in</Link>
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
