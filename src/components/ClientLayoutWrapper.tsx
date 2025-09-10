"use client";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  return <>{children}</>;
}
