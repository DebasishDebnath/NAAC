import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "../../lib/utils.js"

function InputOTP({
  className,
  containerClassName,
  ...props
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-3 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed focus:outline-none", className)}
      {...props} />
  );
}

function InputOTPGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props} />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-blue-500 relative flex h-12 w-12 items-center justify-center border-2 text-lg transition-all first:rounded-l-md last:rounded-r-md dark:bg-gray-800 bg-white",
        "focus:outline-none outline-none data-[active=true]:shadow-md",
        "border-gray-200 dark:border-gray-700",
        "data-[active=true]:scale-105 data-[active=true]:z-10",
        "aria-invalid:border-red-500 data-[active=true]:aria-invalid:border-red-500",
        "font-medium",
        className
      )}
      {...props}>
      {char}
      {hasFakeCaret && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-blue-500 h-5 w-0.5 duration-700" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({
  ...props
}) {
  return (
    <div data-slot="input-otp-separator" role="separator" className="text-gray-400" {...props}>
      <MinusIcon className="h-5 w-5" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }