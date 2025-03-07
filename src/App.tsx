import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as sdk_local from "sdk-local";
import * as sdk_npm_53 from "npm-53";
import "./App.css";
import { useMemo, useState } from "react";

type SDK = typeof sdk_local;

const authConfig = sdk_local.defineMetabaseAuthConfig({
  metabaseInstanceUrl: "http://localhost:3000",
  authProviderUri: "http://localhost:8888/api/sso",
});

const Playground = ({ sdk }: { sdk: SDK }) => {
  const {
    MetabaseProvider,
    InteractiveQuestion,
    InteractiveDashboard,
    CollectionBrowser,
    CreateQuestion,
    SdkDebugInfo,
    StaticQuestion,
    CreateDashboardModal,
    StaticDashboard,
    useQuestionSearch,
  } = sdk;

  const [questionId, setQuestionId] = useState<number>(1);

  const questions = useQuestionSearch();

  const orderedQuestions = useMemo(() => {
    if (!questions.data) return [];
    return [...questions.data].sort((a, z) => a.id - z.id);
  }, [questions]);

  return (
    <div>
      <SdkDebugInfo style={{ position: "absolute", top: 0, right: 0 }} />
      <select
        value={questionId}
        onChange={(e) => setQuestionId(Number(e.target.value))}
      >
        {orderedQuestions.map((question) => (
          <option key={question.id} value={question.id}>
            {question.name}
          </option>
        ))}
      </select>
      {/* <CreateDashboardModal /> */}
      {/* <StaticDashboard dashboardId={1} /> */}
      {/* <InteractiveDashboard dashboardId={1} /> */}
      {/* <InteractiveQuestion questionId={1} /> */}
      {/* <CreateQuestion /> */}
      {/* <CollectionBrowser collectionId={"root"} /> */}
      {/* <InteractiveQuestion questionId={1} /> */}
      <StaticQuestion questionId={7} height={500} />
    </div>
  );
};

const PlaygroundWrapper = ({ sdk }: { sdk: SDK }) => {
  const { MetabaseProvider } = sdk;

  return (
    <MetabaseProvider authConfig={authConfig}>
      <Playground sdk={sdk} />
    </MetabaseProvider>
  );
};

const VersionA = () => {
  return (
    <div>
      <h1>NPM 53</h1>
      <PlaygroundWrapper sdk={sdk_npm_53} />
    </div>
  );
};

const VersionB = () => {
  return (
    <div>
      <h1>Local</h1>
      <PlaygroundWrapper sdk={sdk_local} />
    </div>
  );
};

const Compare = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        height: "100vh",
        width: "100vw",
      }}
    >
      <iframe
        src="/version-a"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
      <iframe
        src="/version-b"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Compare />} />
        <Route path="/version-a" element={<VersionA />} />
        <Route path="/version-b" element={<VersionB />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
