"use client";

import { Button } from "@/components/ui/button";
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
import {
  RiDiscordFill,
  RiGoogleFill,
  RiQuestionAnswerFill,
} from "@remixicon/react";
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
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };
  const handleSignInWithDiscord = async () => {
    await authClient.signIn.social({
      provider: "discord",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="w-[500px] h-[500px]"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md">
                <RiQuestionAnswerFill className="size-7" />
              </div>
              <h1 className="text-xl font-bold">Welcome to PhrasalMind.</h1>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-primary underline underline-offset-4"
                >
                  Sign up
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-6">
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
                Login
              </Button>
              <div className="w-full text-center text-base text-destructive">
                {error}
              </div>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                className="w-full bg-[#DB4437] after:flex-1 hover:bg-[#DB4437]/80 text-base text-white"
                onClick={handleSignInWithGoogle}
              >
                <span className="pointer-events-none me-2 flex-1">
                  <RiGoogleFill
                    className="opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                </span>
                Login with Google
              </Button>
              <Button
                onClick={handleSignInWithDiscord}
                className="w-full bg-[#5865F2] text-white text-base after:flex-1 hover:bg-[#5865F2]/90"
              >
                <span className="pointer-events-none me-2 flex-1">
                  <RiDiscordFill
                    className="opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                </span>
                Login with Discord
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
