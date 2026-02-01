"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"; // Pastikan import ini benar
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useLogin } from "@/services/auth/useAuth";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean(),
});

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Debugging: Cek di inspect element browser apa data yang dikirim
    console.log("Mengirim data login:", { email: values.email, password: values.password });

    login(
      { email: values.email, password: values.password },
      {
        onSuccess: (response: any) => {
          // Ambil token dari response API (sesuai dokumentasi Foody)
          const token = response.token || response.data?.token;

          if (token) {
            // Set Cookie untuk Middleware
            const maxAge = values.rememberMe ? 604800 : 86400; // 7 hari vs 1 hari
            document.cookie = `token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
            
            // Simpan nama user jika ada
            const user = response.user || response.data?.user;
            if (user && user.name) {
                 document.cookie = `user_name=${encodeURIComponent(user.name)}; path=/; max-age=${maxAge}; SameSite=Lax`;
            } else if (user && user.fullName) {
                 document.cookie = `user_name=${encodeURIComponent(user.fullName)}; path=/; max-age=${maxAge}; SameSite=Lax`;
            } else if (user && user.username) {
                 document.cookie = `user_name=${encodeURIComponent(user.username)}; path=/; max-age=${maxAge}; SameSite=Lax`;
            }

            // Redirect ke dashboard
            router.push('/dashboard');
          } else {
             console.error("Token tidak ditemukan di response API:", response);
             alert("Login berhasil tapi token tidak ditemukan.");
          }
        },
        onError: (error: any) => {
          console.error("Login Error Detail:", error);
          form.setError("root", {
            // Tampilkan pesan error dari backend (misal: "Invalid email or password")
            message: error.response?.data?.message || "Login failed. Check your credentials.",
          });
        },
      }
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* KIRI: Gambar Background */}
      <div className="hidden w-1/2 md:block relative bg-black">
        <Image src="/assets/background-login.png" alt="Login Background" fill className="object-cover opacity-80" priority />
      </div>

      {/* KANAN: Form Login */}
      <div className="flex w-full md:w-1/2 flex-col items-center justify-center bg-white overflow-hidden">
        <div className="w-[374px]">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-start mb-8">
            <div className="flex items-center gap-[15px] mb-4">
              <Image src="/assets/logo-foody.png" alt="Foody Logo" width={42} height={42} />
              <span className="font-extrabold text-[32px] text-neutral-950">Foody</span>
            </div>
            <h1 className="font-extrabold text-[28px] text-neutral-950 mb-[4px]">Welcome Back</h1>
            <p className="font-medium text-[16px] text-neutral-950">Good to see you again! Let's eat</p>
          </div>

          {/* Tab Navigasi (Manual Implementation with Links) */}
          <div className="flex justify-center mb-[20px]">
            <div 
              className="flex items-center justify-between bg-gray-100 rounded-[16px] p-[8px] gap-[8px]" 
              style={{ width: '374px', height: '56px' }}
            >
                {/* Active Tab: Sign In */}
                <div className="rounded-[12px] w-[175px] h-[40px] font-bold text-neutral-950 bg-white shadow-sm flex items-center justify-center cursor-default">
                  Sign in
                </div>
                
                {/* Inactive Tab: Sign Up */}
                <Link 
                  href="/register" 
                  className="rounded-[12px] w-[175px] h-[40px] font-medium text-neutral-600 flex items-center justify-center hover:bg-white/50 transition-all"
                >
                  Sign up
                </Link>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Tempat Muncul Error (Invalid email/password) */}
              {form.formState.errors.root && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
                  {form.formState.errors.root.message}
                </div>
              )}
              
              <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} className="bg-white h-[52px] rounded-[14px] text-black border-gray-100" />
                    </FormControl>
                    <FormMessage className="text-red-600 text-xs font-medium mt-1 ml-1" />
                  </FormItem>
                )}
              />

              <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} className="bg-white h-[52px] rounded-[14px] text-black border-gray-100 pr-10" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600 text-xs font-medium mt-1 ml-1" />
                  </FormItem>
                )}
              />

              <FormField control={form.control} name="rememberMe" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0 mt-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-red-600 border-gray-300" />
                    </FormControl>
                    <div className="leading-none">
                        <label className="text-sm font-medium text-black cursor-pointer">Remember Me</label>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending} className="w-full bg-red-700 hover:bg-red-800 text-white h-[52px] rounded-[30px] shadow-lg mt-4">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
