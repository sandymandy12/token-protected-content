import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/sandymandy12/token-protected-content" target="_blank" rel="noopener noreferrer">
      <PageHeader title="Rune Stake" subTitle="Stake 👁️  to access it" style={{ cursor: "pointer" }} />
    </a>
  );
}
