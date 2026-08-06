import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import notify from "../Utils/notfiy";
const loginValidation = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be at most 30 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain uppercase, lowercase, number and special character",
    ),
});

export default function Login({ handlePageType, handleToken }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();
        if (!res.ok || !data?.token) {
          throw new Error(data?.message || "Invalid username or password");
        }

        notify("success", "Login successful!");
        handleToken(data.token);
      } catch (error) {
        notify("error", error.message || "An error occurred during login.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputClass = (field) =>
    `w-full rounded-2xl border bg-slate-950/50 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-500/70 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
        : "border-white/10 focus:border-violet-500 focus:bg-slate-950/70 focus:ring-4 focus:ring-violet-500/15"
    }`;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b18] px-4 py-8">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.14),_transparent_35%)]" />

      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-[100px]" />

      {/* Login card */}
      <section className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
        {/* Top gradient line */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400" />

        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600 to-cyan-500 text-4xl shadow-xl shadow-violet-600/20">
            🔐
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Login to continue to your account
          </p>
        </header>

        <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass("username")}
            />

            {formik.touched.username && formik.errors.username && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-200"
              >
                Password
              </label>

              <button
                type="button"
                className="text-xs font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                Forgot password?
              </button>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass("password")}
            />

            {formik.touched.password && formik.errors.password && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="
    group flex w-full items-center justify-center gap-3 rounded-2xl
    bg-gradient-to-r from-violet-600 to-cyan-500
    py-4 font-bold text-white
    shadow-lg shadow-violet-600/20
    transition-all duration-300
    hover:scale-[1.02]
    hover:shadow-xl hover:shadow-violet-600/30
    active:scale-[0.98]

    disabled:cursor-not-allowed
    disabled:scale-100
    disabled:bg-none
    disabled:from-slate-700
    disabled:to-slate-700
    disabled:text-slate-400
    disabled:shadow-none
    disabled:opacity-70
  "
          >
            {formik.isSubmitting ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </button>
        </form>

        {/* Register */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-slate-400">Don&apos;t have an account?</p>

          <button
            type="button"
            onClick={() => handlePageType("register")}
            disabled={formik.isSubmitting}
            className="mt-2 font-bold text-cyan-400 transition hover:text-cyan-300 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create an account
          </button>
        </div>
      </section>
    </main>
  );
}
