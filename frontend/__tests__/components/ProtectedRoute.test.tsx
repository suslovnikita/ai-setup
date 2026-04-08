import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProtectedRoute from "@/components/ProtectedRoute";
import * as AuthProviderModule from "@/components/AuthProvider";

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

function renderWithAuth(token: string | null, isLoading = false) {
  vi.spyOn(AuthProviderModule, "useAuth").mockReturnValue({
    token,
    isLoading,
    user: null,
    login: vi.fn(),
    signup: vi.fn(),
    logout: vi.fn(),
  });

  return render(
    <ProtectedRoute>
      <span>protected content</span>
    </ProtectedRoute>,
  );
}

describe("ProtectedRoute", () => {
  it("renders children when token is present", () => {
    renderWithAuth("jwt");
    expect(screen.getByText("protected content")).toBeInTheDocument();
  });

  it("renders nothing when no token", () => {
    renderWithAuth(null);
    expect(screen.queryByText("protected content")).not.toBeInTheDocument();
  });

  it("redirects to /login when no token", () => {
    renderWithAuth(null);
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  it("renders nothing while loading", () => {
    renderWithAuth(null, true);
    expect(screen.queryByText("protected content")).not.toBeInTheDocument();
  });

  it("does not redirect while loading", () => {
    mockReplace.mockClear();
    renderWithAuth(null, true);
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
