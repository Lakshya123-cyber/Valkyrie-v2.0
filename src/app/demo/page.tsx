"use client";

import * as Sentry from "@sentry/nextjs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function DemoPage() {
  const { userId } = useAuth();

  const [loading, setLoading] = useState(false);

  // const handleBlocking = async () => {
  //   setLoading(true);
  //   await fetch("/api/demo/blocking", { method: "POST" });
  //   setLoading(false);
  // };

  const handleBackground = async () => {
    setLoading(true);
    await fetch("/api/demo/background", { method: "POST" });
    setLoading(false);
  };

  // 1. Client Error - throws in the browser
  const handleClientError = () => {
    Sentry.logger.info("User attempting to click on Client function", {
      userId,
    });
    throw new Error("Client error: Something went wrong in the browser!");
  };

  // 2. API Error - triggers server-side error
  const handleAPIError = async () => {
    await fetch("/api/demo/error", { method: "POST" });
  };

  // 3. Inngest Error - triggers error in the background job
  const handleInngestError = async () => {
    await fetch("/api/demo/inngest-error", { method: "POST" });
  };

  return (
    <div className="p-8 space-x-4">
      {/* <Button disabled={loading} onClick={handleBlocking}>
        {loading ? "Loading..." : "Blocking"}
      </Button> */}
      <Button disabled={loading} onClick={handleBackground}>
        {loading ? "Loading..." : "Background"}
      </Button>

      <Button onClick={handleClientError} variant="destructive">
        Client Error
      </Button>

      <Button onClick={handleAPIError} variant="destructive">
        API Error
      </Button>

      <Button onClick={handleInngestError} variant="destructive">
        Inngest Error
      </Button>
    </div>
  );
}
