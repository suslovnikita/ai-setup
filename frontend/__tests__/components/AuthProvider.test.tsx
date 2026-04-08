import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import * as api from "@/lib/api";
import * as auth from "@/lib/auth";

function TestConsumer() {
  const { user, token, isLoading, logout } = useAuth();
  return (
    <div>
      <span data-testid="token">{token ?? "null"}</span>
      <span data-testid="user">{user?.email ?? "null"}</span>
      <span data-testid="loading">{String(isLoading)}</span>
      <button onClick={logout}>logout</button>
    </div>
  );
}

function wrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("AuthProvider", () => {
  it("initialises token from localStorage", () => {
    localStorage.setItem("auth_token", "stored");
    render(<TestConsumer />, { wrapper });
    expect(screen.getByTestId("token").textContent).toBe("stored");
  });

  it("login sets token and user", async () => {
    vi.spyOn(api, "apiRequest").mockResolvedValueOnce({
      token: "jwt",
      user: { id: 1, email: "a@b.com" },
    });

    function LoginButton() {
      const { login } = useAuth();
      return <button onClick={() => login("a@b.com", "pass")}>login</button>;
    }

    render(
      <AuthProvider>
        <LoginButton />
        <TestConsumer />
      </AuthProvider>,
    );

    await act(async () => {
      screen.getByText("login").click();
    });

    expect(screen.getByTestId("token").textContent).toBe("jwt");
    expect(screen.getByTestId("user").textContent).toBe("a@b.com");
    expect(localStorage.getItem("auth_token")).toBe("jwt");
  });

  it("signup sets token and user", async () => {
    vi.spyOn(api, "apiRequest").mockResolvedValueOnce({
      token: "jwt2",
      user: { id: 2, email: "b@c.com" },
    });

    function SignupButton() {
      const { signup } = useAuth();
      return <button onClick={() => signup("b@c.com", "pass", "pass")}>signup</button>;
    }

    render(
      <AuthProvider>
        <SignupButton />
        <TestConsumer />
      </AuthProvider>,
    );

    await act(async () => {
      screen.getByText("signup").click();
    });

    expect(screen.getByTestId("token").textContent).toBe("jwt2");
    expect(screen.getByTestId("user").textContent).toBe("b@c.com");
  });

  it("logout clears token and user", async () => {
    localStorage.setItem("auth_token", "jwt");
    render(<TestConsumer />, { wrapper });

    await act(async () => {
      screen.getByText("logout").click();
    });

    expect(screen.getByTestId("token").textContent).toBe("null");
    expect(screen.getByTestId("user").textContent).toBe("null");
    expect(localStorage.getItem("auth_token")).toBeNull();
  });

  it("useAuth throws outside AuthProvider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow("useAuth must be used within AuthProvider");
    consoleError.mockRestore();
  });
});
