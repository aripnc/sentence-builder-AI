"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex w-full justify-between gap-2">
            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                {title && (
                  <ToastTitle className="flex items-center gap-2">
                    {props.variant === "success" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              <div>{action}</div>
            </div>
            <div>
              <ToastClose />
            </div>
          </div>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
