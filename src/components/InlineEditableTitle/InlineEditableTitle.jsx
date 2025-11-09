import { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";

export const InlineEditableTitle = ({ value, onSave, onCancel, className, autoSelect = true }) => {
  const [text, setText] = useState(value ?? "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (autoSelect) inputRef.current?.select();
  }, []);

  const commit = async () => {
    const trimmed = text.trim();
    if (trimmed && trimmed !== value) await onSave(trimmed);
    onCancel();
  };

  return (
    <Input
      ref={inputRef}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") { e.preventDefault(); commit(); }
        if (e.key === "Escape") { e.preventDefault(); onCancel(); }
      }}
      className={`h-8 ${className ?? ""}`}
    />
  );
}