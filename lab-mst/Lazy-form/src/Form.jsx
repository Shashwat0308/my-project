import { useMemo, useState } from "react";

const SPECIAL_CHAR = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (values.name.trim().length < 8) {
    errors.name = "Name must be at least 8 characters.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  } else if (!SPECIAL_CHAR.test(values.password)) {
    errors.password = "Password must include at least one special character (e.g. !@#$%^&*).";
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords must match.";
  }

  return errors;
}

export default function Form() {
  const [values, setValues] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(values), [values]);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = (key) => (event) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleBlur = (key) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({
      name: true,
      password: true,
      confirmPassword: true,
    });

    if (!hasErrors) {
      setSubmitted(true);
    }
  };

  const showError = (field) => touched[field] && errors[field];

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 360 }}>
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 4 }} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          value={values.name}
          onChange={handleChange("name")}
          onBlur={handleBlur("name")}
          placeholder="Jane Doe"
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
        />
        {showError("name") && (
          <div style={{ color: "#b00020", marginTop: 4, fontSize: 13 }}>{errors.name}</div>
        )}
      </div>


      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 4 }} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          placeholder="At least 8 characters"
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
        />
        {showError("password") && (
          <div style={{ color: "#b00020", marginTop: 4, fontSize: 13 }}>{errors.password}</div>
        )}
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 4 }} htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          placeholder="Re-enter password"
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
        />
        {showError("confirmPassword") && (
          <div style={{ color: "#b00020", marginTop: 4, fontSize: 13 }}>{errors.confirmPassword}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={hasErrors && Object.keys(touched).length === 4}
        style={{
          cursor: hasErrors ? "not-allowed" : "pointer",
          opacity: hasErrors ? 0.6 : 1,
          padding: "10px 16px",
          borderRadius: 10,
          border: "none",
          background: "#4f46e5",
          color: "white",
          fontWeight: 600,
        }}
      >
        Submit
      </button>

      {submitted && !hasErrors ? (
        <div
          style={{
            marginTop: 18,
            padding: 14,
            borderRadius: 12,
            background: "#ecfdf5",
            border: "1px solid #34d399",
            color: "#065f46",
          }}
        >
          Form submitted successfully! 🎉
          <pre style={{ margin: 0, marginTop: 10, fontSize: 12, whiteSpace: "pre-wrap" }}>
            {JSON.stringify(values, null, 2)}
          </pre>
        </div>
      ) : null}
    </form>
  );
}
