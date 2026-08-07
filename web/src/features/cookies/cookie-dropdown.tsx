import { Button, Dropdown, Label, Spinner, Tooltip } from "@heroui/react";
import { CookieIcon, Trash2Icon, UploadIcon } from "lucide-react";

interface CookieDropdownProps {
  cookiesConfigured: boolean;
  isUploading: boolean;
  isDeleting: boolean;
  onDropdownAction: (key: React.Key) => void;
  onUploadClick: () => void;
  variant: "desktop" | "mobile";
}

export function CookieDropdown({
  cookiesConfigured,
  isUploading,
  isDeleting,
  onDropdownAction,
  onUploadClick,
  variant,
}: CookieDropdownProps) {
  if (variant === "desktop") {
    return cookiesConfigured ? (
      <Dropdown>
        <Dropdown.Trigger>
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            aria-label="Cookie options"
            isPending={isDeleting}
          >
            {({ isPending }) =>
              isPending ? (
                <Spinner color="current" size="sm" />
              ) : (
                <CookieIcon className="h-5 w-5 text-amber-500 dark:text-orange-300" />
              )
            }
          </Button>
        </Dropdown.Trigger>
        <CookieDropdownMenu onAction={onDropdownAction} />
      </Dropdown>
    ) : (
      <Tooltip delay={0} closeDelay={0}>
        <Tooltip.Trigger>
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            aria-label="Upload cookies"
            isPending={isUploading}
            onPress={onUploadClick}
          >
            {({ isPending }) =>
              isPending ? (
                <Spinner color="current" size="sm" />
              ) : (
                <CookieIcon className="h-5 w-5" />
              )
            }
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          Upload cookies.txt for age-restricted or Premium content
        </Tooltip.Content>
      </Tooltip>
    );
  }

  // Mobile variant
  return cookiesConfigured ? (
    <Dropdown>
      <Dropdown.Trigger>
        <button
          type="button"
          className="text-foreground w-full text-left text-lg"
        >
          Cookies configured
        </button>
      </Dropdown.Trigger>
      <CookieDropdownMenu onAction={onDropdownAction} />
    </Dropdown>
  ) : (
    <button
      type="button"
      className="text-foreground w-full cursor-pointer text-left text-lg"
      onClick={onUploadClick}
    >
      Upload cookies
    </button>
  );
}

interface CookieDropdownMenuProps {
  onAction: (key: React.Key) => void;
}

function CookieDropdownMenu({ onAction }: CookieDropdownMenuProps) {
  return (
    <Dropdown.Popover>
      <Dropdown.Menu aria-label="Cookie actions" onAction={onAction}>
        <Dropdown.Item id="upload" textValue="Upload new cookies">
          <UploadIcon className="h-4 w-4" />
          <Label>Upload new cookies</Label>
        </Dropdown.Item>
        <Dropdown.Item id="delete" textValue="Delete cookies" variant="danger">
          <Trash2Icon className="h-4 w-4" />
          <Label>Delete cookies</Label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  );
}
