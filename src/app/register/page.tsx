"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRegister } from "@/services/auth/useAuth";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
      message: "Phone number must be at least 10 characters."
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // PERBAIKAN 1: Sesuaikan nama field dengan API Documentation
    const payload = {
        name: values.name,      // API minta "name", bukan "fullName" atau "username"
        email: values.email,
        phone: values.phoneNumber, // API minta "phone", bukan "phoneNumber"
        password: values.password
    };

    register(payload, {
        // PERBAIKAN 2: Tangkap response (data) untuk ambil token
        onSuccess: (response: any) => {
             // Pastikan kita ambil token dari response (struktur: response.data.token atau response.token)
             // Berdasarkan screenshot response, token ada di root object
             const token = response.token || response.data?.token;

             if (token) {
                 // WAJIB: Simpan ke Cookie agar Middleware "Satpam" memberi izin lewat
                 document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
                 
                 // Simpan nama user
                 const user = response.user || response.data?.user;
                  if (user && user.fullName) {
                    document.cookie = `user_name=${encodeURIComponent(user.fullName)}; path=/; max-age=86400; SameSite=Lax`;
                 } else if (user && user.username) {
                    document.cookie = `user_name=${encodeURIComponent(user.username)}; path=/; max-age=86400; SameSite=Lax`;
                 }
             }

             // Redirect ke dashboard
             router.push('/dashboard');
        },
        onError: (error: any) => { 
            console.error("Registration failed", error);
            let errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            
            if (error.response?.status === 409) {
                errorMessage = "Email or Phone Number is already registered.";
            }

            form.setError("root", {
                message: errorMessage
            });
        }
    });
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
        {/* Left Side - Image (Desktop Only) */}
      <div className="hidden w-1/2 md:block relative bg-black">
        <Image
          src="/assets/background-login.png"
          alt="Register Background"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full md:w-1/2 flex-col items-center justify-center bg-white overflow-hidden">
          <div className="w-[374px]">
            
            {/* Logo Section */}
            <div className="flex flex-col items-start mb-8">
                 <div className="flex items-center gap-[15px] mb-2">
                    <Image src="/assets/logo-foody.png" alt="Foody Logo" width={40} height={40} />
                    <span className="font-[family-name:var(--font-nunito)] font-extrabold text-[32px] text-neutral-950">Foody</span>
                 </div>
                 <h1 className="font-[family-name:var(--font-nunito)] font-extrabold text-[28px] text-neutral-950 mb-[4px]">Welcome Back</h1>
                 <p className="font-[family-name:var(--font-nunito)] font-medium text-[18px] text-neutral-950 mb-[4px]">Good to see you again! Let's eat</p>
            </div>
            {/* Tab Navigasi (Manual Implementation with Links) */}
            <div className="flex justify-center mb-[20px]">
                <div 
                    className="flex items-center justify-between bg-gray-100 rounded-[16px] p-[8px] gap-[8px]"
                    style={{ width: '374px', height: '56px' }}
                >
                    {/* Inactive Tab: Sign In */}
                    <Link 
                        href="/login" 
                        className="rounded-[12px] w-[175px] h-[40px] font-medium text-neutral-600 flex items-center justify-center hover:bg-white/50 transition-all"
                    >
                        Sign in
                    </Link>

                    {/* Active Tab: Sign Up */}
                    <div className="rounded-[12px] w-[175px] h-[40px] font-bold text-neutral-950 bg-white shadow-sm flex items-center justify-center cursor-default">
                        Sign up
                    </div>
                </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {form.formState.errors.root && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                    {form.formState.errors.root.message}
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                            placeholder="Name" 
                            {...field} 
                            className="bg-white h-[52px] rounded-[14px] border-gray-100 focus-visible:ring-0 focus-visible:border-gray-300 placeholder:text-gray-400 pr-10 text-[16px] text-neutral-950" 
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-xs font-medium mt-1 ml-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                            placeholder="Email" 
                            {...field} 
                            className="bg-white h-[52px] rounded-[14px] border-gray-100 focus-visible:ring-0 focus-visible:border-gray-300 placeholder:text-gray-400 pr-10 text-[16px] text-neutral-950" 
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-xs font-medium mt-1 ml-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                            placeholder="Number Phone" 
                            {...field} 
                            className="bg-white h-[52px] rounded-[14px] border-gray-100 focus-visible:ring-0 focus-visible:border-gray-300 placeholder:text-gray-400 pr-10 text-[16px] text-neutral-950" 
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-xs font-medium mt-1 ml-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                            <Input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                {...field} 
                                className="bg-white h-[52px] rounded-[14px] border-gray-100 focus-visible:ring-0 focus-visible:border-gray-300 placeholder:text-gray-400 pr-10 text-[16px] text-neutral-950" 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 text-xs font-medium mt-1 ml-1" />
                    </FormItem>
                  )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="relative">
                                <Input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Confirm Password" 
                                    {...field} 
                                    className="bg-white h-[52px] rounded-[14px] border-gray-100 focus-visible:ring-0 focus-visible:border-gray-300 placeholder:text-gray-400 pr-10 text-[16px] text-neutral-950" 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </FormControl>
                        <FormMessage className="text-red-600 text-xs font-medium mt-1 ml-1" />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    disabled={isPending} 
                    className="w-full bg-red-700 hover:bg-red-800 text-white h-[52px] text-base font-semibold rounded-[30px] shadow-lg shadow-red-200 mt-2"
                >
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Register"}
                </Button>
              </form>
            </Form>
          </div>
      </div>
    </div>
  );
}
