import { useEffect } from "react";

export function useEditorShortcuts({ isActive, handlers = {} }) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e) => {
      const isCmd = e.metaKey || e.ctrlKey;
      if (!isCmd) return;

      const key = e.key.toLowerCase();

      const action = handlers[key];
      if (action) {
        e.preventDefault();
        action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, handlers]);
}
