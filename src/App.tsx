import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as sdk_local from "sdk-local";
import * as sdk_npm_53 from "npm-53";
import "./App.css";

type SDK = typeof sdk_local;

const authConfig = sdk_local.defineMetabaseAuthConfig({
  metabaseInstanceUrl: "http://localhost:3000",
  authProviderUri: "http://localhost:8888/api/sso",
});

const Playground = ({ sdk }: { sdk: SDK }) => {
  const {
    MetabaseProvider,
    InteractiveQuestion,
    CollectionBrowser,
    CreateQuestion,
    SdkDebugInfo,
  } = sdk;

  return (
    <MetabaseProvider authConfig={authConfig}>
      <SdkDebugInfo style={{ position: "absolute", top: 0, right: 0 }} />
      <InteractiveQuestion questionId={1} />
      {/* <div style={{ width: "100%", height: 500 }}></div> */}
      {/* <CreateQuestion /> */}
      {/* <CollectionBrowser /> */}
      <InteractiveQuestion questionId={1} />
    </MetabaseProvider>
  );
};

const VersionA = () => {
  return (
    <div>
      <h1>NPM 53</h1>
      <Playground sdk={sdk_npm_53} />
    </div>
  );
};

const VersionB = () => {
  return (
    <div>
      <h1>Local</h1>
      <Playground sdk={sdk_local} />
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
