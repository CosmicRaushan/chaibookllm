"use client";

import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryCleint] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryCleint}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
