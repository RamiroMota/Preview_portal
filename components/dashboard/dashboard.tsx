"use client";

import { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { SupervisionModule } from "../supervision/supervision-module";
import { POAModule } from "../poa/poa-module";
import { DashboardHome } from "./dashboard-home";
import { CreateSequenceModule } from "../create-sequence/create-sequence-module";
import { UserControlModule } from "../user-control/user-control-module";
import PersonalEvaluationModule from "../personal-evaluation/personal-evaluation-module";

export type ActiveModule =
  | "home"
  | "supervision"
  | "poa"
  | "create-sequence"
  | "user-control"
  | "personal-evaluation";

export function Dashboard() {
  const [activeModule, setActiveModule] = useState<ActiveModule>("home");

  const renderActiveModule = () => {
    switch (activeModule) {
      case "supervision":
        return <SupervisionModule />;
      case "poa":
        return <POAModule />;
      case "create-sequence":
        return <CreateSequenceModule />;
      case "user-control":
        return <UserControlModule />;
      case "personal-evaluation":
        return <PersonalEvaluationModule />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
}
