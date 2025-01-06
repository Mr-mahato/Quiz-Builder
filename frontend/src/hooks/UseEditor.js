import { useState } from "react";

export function useEditor(initialContent = "") {
  const [content, setContent] = useState(initialContent);

  const handleBold = () => {
    // This is a simplified example. In a real implementation,
    // you would want to use a proper rich text editor library
    setContent(`<strong>${content}</strong>`);
  };

  const handleItalic = () => {
    setContent(`<em>${content}</em>`);
  };

  // Add more formatting handlers as needed

  return {
    content,
    setContent,
    handleBold,
    handleItalic,
  };
}
