"use client";

import ModelResultsPage from "@/components/ai-model-extra";
import AIModelTest from "@/components/ai-models-test";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function AIModelTestPage() {
  const [isTraditional, setIsTraditional] = useState(true);
  return (
    <div className="flex flex-col items-center py-5">
      <Switch onCheckedChange={(checked) => setIsTraditional(checked)} />
      {isTraditional && <AIModelTest />}
      {!isTraditional && <ModelResultsPage />}
    </div>
  );
}
