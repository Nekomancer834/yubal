import { useTheme } from "@/hooks/use-theme";
import { Button } from "@heroui/react";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggler() {
  const { theme, toggle } = useTheme();

  return (
    <Button
      isIconOnly
      size="sm"
      variant="ghost"
      aria-label="Toggle theme"
      onPress={toggle}
    >
      {theme === "dark" ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </Button>
  );
}
