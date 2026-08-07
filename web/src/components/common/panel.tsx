import { Card, cn, ScrollShadow } from "@heroui/react";
import type { HTMLAttributes, ReactNode, Ref } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Panel({ children, className }: Props) {
  return <Card className={className}>{children}</Card>;
}

type HeaderProps = {
  leadingIcon?: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function PanelHeader({
  leadingIcon,
  badge,
  children,
  className,
}: HeaderProps) {
  return (
    <Card.Header className={className}>
      <div className="text-muted flex w-full items-center gap-2">
        {leadingIcon && <span>{leadingIcon}</span>}
        <span className="text-xs tracking-wider uppercase">{children}</span>
        {badge}
      </div>
    </Card.Header>
  );
}

type ContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  height?: string;
  ref?: Ref<HTMLDivElement>;
};

export function PanelContent({
  children,
  className,
  height = "h-72",
  ref,
  ...props
}: ContentProps) {
  return (
    // Negative margin cancels the card's padding so the scroll area spans the
    // full card width: the scrollbar sits on the card border and the scroll
    // shadows fade across the whole card. Padding moves onto the scroller.
    <Card.Content className="-mx-4">
      <ScrollShadow
        ref={ref}
        className={cn(height, "px-4", className)}
        offset={2}
        {...props}
      >
        {children}
      </ScrollShadow>
    </Card.Content>
  );
}
