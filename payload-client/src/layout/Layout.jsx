import React from "react";
import { cx } from "@edux-design/utils";

function Layout({ children, className }) {
  return (
    <div
      className={cx(
        `
        grid h-screen
        grid-cols-[auto_1fr]   /* sidebar auto width, content flexible */
        grid-rows-[60px_1fr_auto] /* header fixed, main flexible, footer auto */
      `,
        className
      )}
    >
      {children}
    </div>
  );
}

function Header({ children, className }) {
  return (
    <header
      className={cx(
        "col-start-2 row-start-1 h-[61px] border-y border-border-subtle",
        className
      )}
    >
      {children}
    </header>
  );
}

function Sidebar({ children, className }) {
  return <aside className={cx("row-span-3", className)}>{children}</aside>;
}

function Content({ children, className }) {
  return (
    <main
      className={cx("col-start-2 row-start-2 overflow-y-auto p-6", className)}
    >
      {children}
    </main>
  );
}

function Footer({ children, className }) {
  return (
    <footer
      className={cx(
        "col-start-2 row-start-3 border-t border-border-primary-emphasis",
        className
      )}
    >
      {children}
    </footer>
  );
}

Layout.Header = Header;
Layout.Sidebar = Sidebar;
Layout.Content = Content;
Layout.Footer = Footer;

export { Layout, Sidebar, Content, Footer, Header };
