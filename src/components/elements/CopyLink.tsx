"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

const CopyLink = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);

    setCopied(true);

    setTimeout(() => {
      setCopied(false)
    }, 1000);
  };

  return (
    <div onClick={handleCopy}>
      {copied? (
        <Check className="absolute p-1 top-1 right-1" color="green" size={25} />
      ): (
        <Copy className="absolute p-1 top-1 right-1" color="orange" size={25} />
      )}
    </div>
  );
};

export default CopyLink;
