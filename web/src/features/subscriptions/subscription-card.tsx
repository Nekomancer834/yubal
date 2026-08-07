import { Card, cn } from "@heroui/react";
import { ComponentProps, ReactNode } from "react";

type RootProps = ComponentProps<typeof Card> & {
  isDisabled?: boolean;
};

function _Root({ children, className, isDisabled, ...props }: RootProps) {
  return (
    <Card
      className={cn(isDisabled && "opacity-50", className)}
      aria-disabled={isDisabled || undefined}
      {...props}
    >
      <Card.Content className="flex-row items-center justify-between">
        {children}
      </Card.Content>
    </Card>
  );
}

type HeaderProps = ComponentProps<"div"> & {
  title: string;
};

function _Header({ title, children, className, ...props }: HeaderProps) {
  return (
    <div className={className} {...props}>
      <p className="text-muted mb-1 text-sm font-medium">{title}</p>
      <div className="flex items-baseline gap-2">{children}</div>
    </div>
  );
}

type ValueProps = ComponentProps<"span"> & {
  children: ReactNode;
  suffix?: string;
};

function _Value({ children, suffix, className, ...props }: ValueProps) {
  return (
    <>
      <span className={cn("text-lg font-bold", className)} {...props}>
        {children}
      </span>
      {suffix && <span className="text-muted text-sm">{suffix}</span>}
    </>
  );
}

type IconProps = ComponentProps<"div">;

function _Icon({ children, className, ...props }: IconProps) {
  return (
    <div
      className={cn(
        "bg-secondary/10 text-secondary flex h-10 w-10 items-center justify-center rounded-full [&>svg]:size-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type SubscriptionCardComponent = typeof _Root & {
  Header: typeof _Header;
  Value: typeof _Value;
  Icon: typeof _Icon;
};

export const SubscriptionCard: SubscriptionCardComponent = Object.assign(
  _Root,
  {
    Header: _Header,
    Value: _Value,
    Icon: _Icon,
  },
);
