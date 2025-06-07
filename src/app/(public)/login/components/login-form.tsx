"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({ required_error: "The email is required" })
    .email({ message: "The email must be valid" }),
  password: z
    .string({ required_error: "The password is required" })
    .min(4, { message: "The password must be at least 4 characters" }),
});

export default function LoginForm() {
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });

    if (error) {
      setError(`Login error: ${error.message}`);
    }
  };

  const handleSignInWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <Card className="border-muted">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Entre na sua conta</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <div className="flex flex-col gap-6">
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-input"
                        placeholder="Digite seu email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-input"
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="default"
                className="w-full text-base"
                type="submit"
              >
                Entrar
              </Button>

              <div className="w-full text-center text-base text-destructive">
                {error}
              </div>

              <div className="space-y-3">
                <div className="w-full flex items-center">
                  <span className="w-full text-center font-semibold text-base">
                    Ou continue com
                  </span>
                </div>
                <Button
                  variant="destructive"
                  className="text-base text-white w-full"
                  onClick={handleSignInWithGoogle}
                >
                  Entrar com Google
                </Button>
              </div>

              <div className="text-center text-lg">
                Não possui uma conta?{" "}
                <a
                  href="/signup"
                  className="text-primary underline underline-offset-4"
                >
                  Cadastrar conta
                </a>
              </div>
            </form>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
