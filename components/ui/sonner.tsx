"use client";

import {
  CircleCheck,
  CircleX,
  Info,
  Loader2,
  TriangleAlert,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({
  ...props
}: ToasterProps) => {
  return (
    <Sonner
      position="bottom-right"
      expand={false}
      richColors
      closeButton
      icons={{
        success: <CircleCheck className="h-5 w-5" />,
        error: <CircleX className="h-5 w-5" />,
        warning: <TriangleAlert className="h-5 w-5" />,
        info: <Info className="h-5 w-5" />,
        loading: <Loader2 className="h-5 w-5 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "rounded-2xl border shadow-lg",

          title:
            "text-sm font-semibold",

          description:
            "mt-1 text-xs leading-5",

          success:
            "!border-emerald-200 !bg-emerald-50 !text-emerald-800",

          error:
            "!border-red-200 !bg-red-50 !text-red-800",

          warning:
            "!border-amber-200 !bg-amber-50 !text-amber-800",

          info:
            "!border-blue-200 !bg-blue-50 !text-blue-800",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };