import { Suspense, lazy, useMemo, useState } from "react";
import "./App.css";

const HeaderImage = lazy(() => import("./HeaderImage"));
const Form = lazy(() => import("./Form"));

export default function App() {
  const [showImage, setShowImage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const toggleLabel = showForm ? "Hide form" : "Show form";
  const imageLabel = showImage ? "Hide image" : "Load image";

  const intro = useMemo(
    () =>
      "This portal demo lazy-loads an image and a form module on demand.\n" +
      "Click the buttons to load each piece when you need it.",
    []
  );

  return (
    <div className="app">
      <h1>Portal</h1>
      <p className="intro" style={{ whiteSpace: "pre-line" }}>
        {intro}
      </p>

      <div className="buttonRow">
        <button
          className="toggle"
          onClick={() =>
            setShowImage((prev) => {
              const next = !prev;
              if (next) {
                setShowForm(true);
              }
              return next;
            })
          }
        >
          {imageLabel}
        </button>
        <button className="toggle" onClick={() => setShowForm((v) => !v)}>
          {toggleLabel}
        </button>
      </div>

      {showImage && (
        <Suspense fallback={<div className="imgLoading">Loading image…</div>}>
          <HeaderImage />
        </Suspense>
      )}

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
