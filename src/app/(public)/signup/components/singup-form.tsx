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
import { RiQuestionAnswerFill } from "@remixicon/react";
import { GalleryVerticalEnd } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string({ required_error: "the name is required" })
    .min(4, { message: "The name needs to be at least 4 characters" }),
  email: z
    .string({ required_error: "The email is required" })
    .email({ message: "The email must be valid" }),
  password: z
    .string({ required_error: "The password is required" })
    .min(4, { message: "The password must be at least 4 characters" }),
});

export default function SignUpForm() {
  const [error, setError] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSignUp(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: (ctx) => {
          toast.success("Conta criada com sucesso!");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="w-[500px] h-[500px]"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md">
                <RiQuestionAnswerFill className="size-7" />
              </div>
              <h1 className="text-xl font-bold">Welcome to PhrasalMind.</h1>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-primary underline underline-offset-4"
                >
                  Login
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-input"
                        placeholder="Digite um nome"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-input"
                        placeholder="Digite um email"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-input"
                        placeholder="Crie uma senha"
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
                Signup
              </Button>
              <div className="w-full text-center text-base text-destructive">
                {error}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>

    // <Card className="">
    //   <CardHeader>
    //     <CardTitle className="text-2xl">Criar conta</CardTitle>
    //     <CardDescription>Cadastrar sua conta</CardDescription>
    //   </CardHeader>

    //   <CardContent>
    //     <Form {...form}>
    //       <div className="flex flex-col gap-6">
    //         <form
    //           onSubmit={form.handleSubmit(handleSignUp)}
    //           className="space-y-8"
    //         >
    //           <FormField
    //             control={form.control}
    //             name="name"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Username</FormLabel>
    //                 <FormControl>
    //                   <Input
    //                     className="bg-input"
    //                     placeholder="Digite um nome"
    //                     {...field}
    //                   />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />

    //           <FormField
    //             control={form.control}
    //             name="email"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Email</FormLabel>
    //                 <FormControl>
    //                   <Input
    //                     className="bg-input"
    //                     placeholder="Digite um email"
    //                     {...field}
    //                   />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             control={form.control}
    //             name="password"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Password</FormLabel>
    //                 <FormControl>
    //                   <Input
    //                     className="bg-input"
    //                     placeholder="Crie uma senha"
    //                     {...field}
    //                   />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />

    //           <Button variant="default" className="w-full" type="submit">
    //             Cadastrar
    //           </Button>

    //           <div className="w-full text-center text-base text-destructive">
    //             {error}
    //           </div>

    //           <div className="text-center text-lg">
    //             Já tem uma conta?{" "}
    //             <a
    //               href="/login"
    //               className="text-primary underline underline-offset-4"
    //             >
    //               Login
    //             </a>
    //           </div>
    //         </form>
    //       </div>
    //     </Form>
    //   </CardContent>
    // </Card>
  );
}
