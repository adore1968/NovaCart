import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BsEnvelope, BsLock } from "react-icons/bs";
import { useAuth } from "../context/auth/AuthContext";
import { Helmet } from "react-helmet-async";
import type { UserForm } from "../types/authTypes";

function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserForm>();

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = handleSubmit((data): void => {
    const session = login(data);

    if (!session) return;

    navigate(session.role === "user" ? "/products" : "/admin/products");
  });

  return (
    <>
      <Helmet>
        <title>Login | MyStore</title>

        <meta name="description" content="Sign in to your MyStore account." />
      </Helmet>

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="card shadow-sm border-0"
          style={{ maxWidth: "450px", width: "100%" }}
        >
          <div className="card-body p-4">
            <h2 className="text-center fw-bold mb-4">Login</h2>

            <form onSubmit={onSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <BsEnvelope className="me-2" />
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="email@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                />

                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  <BsLock className="me-2" />
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  placeholder="********"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />

                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>

              <button className="btn btn-primary w-100" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
