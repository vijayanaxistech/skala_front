"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function EventsClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <Loader /> : children}</>;
}
