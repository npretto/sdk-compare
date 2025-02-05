import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as sdk_master from "sdk-master";
import * as sdk_mantine from "sdk-mantine";
import "./App.css";

type SDK = typeof sdk_master;

const authConfig = sdk_master.defineMetabaseAuthConfig({
  metabaseInstanceUrl: "http://localhost:3000",
  authProviderUri: "http://localhost:8888/api/sso",
});

const Playground = ({ sdk }: { sdk: SDK }) => {
  const { MetabaseProvider, InteractiveQuestion } = sdk;

  return (
    <MetabaseProvider authConfig={authConfig}>
      <InteractiveQuestion questionId={1} />
    </MetabaseProvider>
  );
};

const VersionA = () => {
  return (
    <div>
      <h1>Master</h1>
      <Playground sdk={sdk_master} />
    </div>
  );
};

const VersionB = () => {
  return (
    <div>
      <h1>Mantine</h1>
      <Playground sdk={sdk_mantine} />
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
        height: "100%",
      }}
    >
      <iframe src="/version-a" style={{ width: "100%", height: "100%" }} />
      <iframe src="/version-b" style={{ width: "100%", height: "100%" }} />
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
