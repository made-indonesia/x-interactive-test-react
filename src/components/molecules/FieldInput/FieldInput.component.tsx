"use client";

import Body from "@/components/atoms/Body";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import IcEye from "@/components/atoms/Icons/IcEye";
import IcEyeSlash from "@/components/atoms/Icons/IcEyeSlash";
import IcVuesaxSearch from "@/components/atoms/Icons/IcVuesaxSearch";
import Input from "@/components/atoms/Input";
import Radio from "@/components/atoms/Radio";
import {cn} from "@/lib/utils.lib";
import {forwardRef, ReactNode, useState} from "react";

interface FieldInputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  helperText?: string;
  label?: ReactNode;
  prefix?: string;
  suffix?: string;
}
const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(
  (
    {
      error,
      helperText,
      label,
      placeholder,
      prefix,
      required,
      suffix,
      type: propType,
      ...props
    },
    ref,
  ) => {
    const [type, setType] = useState(propType);

    return (
      <div className="flex flex-col flex-1 gap-2" aria-label="FieldInput">
        <label
          className={cn(
            "flex flex-col gap-2 relative text-black",
            (type === "checkbox" || type === "radio") &&
              "flex-row-reverse justify-end items-center",
          )}>
          {label && (
            <Body variant="md" weight="regular">
              {label}{" "}
              {required && (
                <Body
                  variant="inherit"
                  as="span"
                  className="text-error-danger-500">
                  *
                </Body>
              )}
            </Body>
          )}
          {propType === "checkbox" ? (
            <Checkbox
              placeholder={placeholder}
              ref={ref}
              error={error}
              {...props}
            />
          ) : propType === "radio" ? (
            <Radio
              placeholder={placeholder}
              ref={ref}
              error={error}
              {...props}
            />
          ) : (
            <Input
              type={type ?? propType}
              placeholder={placeholder}
              ref={ref}
              error={error}
              className={cn(
                prefix && "pl-12",
                suffix && "pr-12",
                props.className,
              )}
              {...props}
            />
          )}
          {propType === "search" && (
            <Button
              variant="link-gray"
              startIcon={<IcVuesaxSearch />}
              type="button"
              onClick={() =>
                setType(prev => (prev === "password" ? "text" : "password"))
              }
              className="bottom-0.5 left-0 absolute px-3.5 pointer-events-none"
            />
          )}

          {suffix && (
            <Button
              variant="link-gray"
              startIcon={
                <Body variant="sm" weight="medium" className="text-gray-500">
                  {suffix}
                </Body>
              }
              type="button"
              className="right-0 bottom-0.5 absolute px-3.5 pointer-events-none"
            />
          )}
          {prefix && (
            <Button
              variant="link-gray"
              startIcon={
                <Body
                  variant="sm"
                  weight="medium"
                  className="bottom-0.5 left-0 absolute text-gray-500">
                  {prefix}
                </Body>
              }
              type="button"
              className="bottom-0.5 left-0 absolute px-3.5 pointer-events-none"
            />
          )}

          {propType === "password" && (
            <Button
              variant="link-gray"
              startIcon={
                type === "password" ? (
                  <IcEye
                    className={cn(error && "[&_path]:fill-error-danger-500")}
                  />
                ) : (
                  <IcEyeSlash
                    className={cn(error && "[&_path]:fill-error-danger-500")}
                  />
                )
              }
              type="button"
              onClick={() =>
                setType(prev => (prev === "password" ? "text" : "password"))
              }
              className="right-0 bottom-0.5 absolute"
            />
          )}
        </label>
        {helperText && (
          <Body
            variant="xs"
            weight="regular"
            className={cn(
              "text-gray-600",
              error && "text-error-danger-500",
              helperText && helperText !== " " && "whitespace-pre-wrap",
            )}>
            {helperText}
          </Body>
        )}
      </div>
    );
  },
);

FieldInput.displayName = "FieldInput";

export default FieldInput;
