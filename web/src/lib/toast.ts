import { toast } from "@heroui/react";

export function showSuccessToast(title: string, description: string): void {
  toast.success(title, { description });
}

export function showErrorToast(title: string, description: string): void {
  toast.danger(title, { description });
}
