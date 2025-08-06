import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";

export const BorderStyles = {
  SQURICLE: "squricle",
  CIRCLE: "circle",
  SQUARE: "square",
};

const borderStyles = Object.values(BorderStyles);

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

export default function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) {
  function handleClick() {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

  const Icon =
    borderStyle === "squricle"
      ? Squircle
      : borderStyle === "circle"
        ? Circle
        : Square;

  return (
    <Button
      variant="outline"
      size="icon"
      title="change border"
      onClick={handleClick}
    >
      <Icon className="size-5" />
    </Button>
  );
}
