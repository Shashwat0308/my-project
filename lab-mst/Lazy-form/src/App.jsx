import { Suspense, lazy, useMemo, useState } from "react";
import "./App.css";

const Form = lazy(() => import("./Form"));

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const toggleLabel = showForm ? "Hide form" : "Show form";

  const intro = useMemo(
    () =>
      "Click the button to lazy-load the form component.\n" +
      "Validation runs locally and shows inline errors on blur/submission.",
    []
  );

  return (
    <div className="app">
      <h1>React Lazy Load + Form Validation (Lab MST)</h1>
      <p className="intro" style={{ whiteSpace: "pre-line" }}>
        {intro}
      </p>

      <button className="toggle" onClick={() => setShowForm((v) => !v)}>
        {toggleLabel}
      </button>

      <div className="formContainer">
        {showForm ? (
          <Suspense fallback={<div className="loading">Loading form…</div>}>
            <Form />
          </Suspense>
        ) : (
          <div className="loading">Click “Show form” to lazy-load the form module.</div>
        )}
      </div>
    </div>
  );
}
