"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";
import { useAutoResizeTextarea } from "@/components/hooks/use-auto-resize-textarea";
import { SendIcon, LoaderIcon } from "@/components/ui/icons/AnimatedIcons";

interface AIInputWithLoadingProps {
  id?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  loadingDuration?: number;
  thinkingDuration?: number;
  onSubmit?: (value: string) => void | Promise<void>;
  className?: string;
  autoAnimate?: boolean;
  /** Caption under the input. Defaults to the built-in ready/thinking text. */
  hint?: string;
  disabled?: boolean;
}

export function AIInputWithLoading({
  id = "ai-input-with-loading",
  placeholder = "Ask me anything!",
  minHeight = 56,
  maxHeight = 200,
  loadingDuration = 3000,
  thinkingDuration = 1000,
  onSubmit,
  className,
  autoAnimate = false,
  hint,
  disabled = false,
}: AIInputWithLoadingProps) {
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(autoAnimate);
  const [isAnimating] = useState(autoAnimate);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const runAnimation = () => {
      if (!isAnimating) return;
      setSubmitted(true);
      timeoutId = setTimeout(() => {
        setSubmitted(false);
        timeoutId = setTimeout(runAnimation, thinkingDuration);
      }, loadingDuration);
    };

    if (isAnimating) {
      runAnimation();
    }

    return () => clearTimeout(timeoutId);
  }, [isAnimating, loadingDuration, thinkingDuration]);

  const handleSubmit = async () => {
    if (!inputValue.trim() || submitted || disabled) return;

    const value = inputValue;
    setSubmitted(true);
    setInputValue("");
    adjustHeight(true);
    await onSubmit?.(value);

    setTimeout(() => {
      setSubmitted(false);
    }, loadingDuration);
  };

  return (
    <div className={cn("w-full py-2", className)}>
      <div className="relative mx-auto flex w-full flex-col items-start gap-2">
        <div className="relative mx-auto w-full">
          <Textarea
            id={id}
            placeholder={placeholder}
            className={cn(
              "w-full resize-none rounded-2xl border border-line bg-white/70 py-4 pl-5 pr-12 text-wrap leading-[1.3]",
              "text-fg placeholder:text-fg4 backdrop-blur-sm",
              "ring-0 focus-visible:border-aurora-violet/50 focus-visible:ring-2 focus-visible:ring-aurora-violet/20",
              `min-h-[${minHeight}px]`
            )}
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              adjustHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            disabled={submitted || disabled}
          />
          <button
            onClick={handleSubmit}
            className={cn(
              "absolute right-2.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl transition-all",
              submitted
                ? "bg-transparent text-aurora-violet"
                : inputValue.trim()
                  ? "bg-ink text-white hover:-translate-y-[calc(50%+2px)]"
                  : "bg-black/5 text-fg4"
            )}
            type="button"
            disabled={submitted || disabled || !inputValue.trim()}
            aria-label="Send"
          >
            {submitted ? (
              <LoaderIcon size={16} />
            ) : (
              <SendIcon size={16} className={inputValue.trim() ? "opacity-100" : "opacity-60"} />
            )}
          </button>
        </div>
        <p className="mx-auto h-4 pl-2 text-xs text-fg4">
          {hint ?? (submitted ? "Thinking..." : "Press Enter to send")}
        </p>
      </div>
    </div>
  );
}
