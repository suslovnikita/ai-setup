import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiRequest } from "@/lib/api";

function mockFetch(body: unknown, ok = true, status = 200) {
  return vi.spyOn(global, "fetch").mockResolvedValueOnce({
    ok,
    status,
    json: async () => body,
  } as Response);
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("apiRequest", () => {
  it("returns parsed response on success", async () => {
    mockFetch({ token: "abc", user: { id: 1, email: "a@b.com" } });
    const data = await apiRequest<{ token: string }>("/api/auth/login", {
      method: "POST",
      body: { email: "a@b.com", password: "pass" },
    });
    expect(data.token).toBe("abc");
  });

  it("sets Authorization header when token provided", async () => {
    const spy = mockFetch({ ok: true });
    await apiRequest("/api/test", { token: "mytoken" });
    expect(spy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer mytoken" }),
      }),
    );
  });

  it("throws Error with message string on failure", async () => {
    mockFetch({ error: "Invalid credentials" }, false, 401);
    await expect(apiRequest("/api/auth/login")).rejects.toThrow("Invalid credentials");
  });

  it("throws Error joining array errors on failure", async () => {
    mockFetch({ error: ["Email is invalid", "Password is too short"] }, false, 422);
    await expect(apiRequest("/api/auth/signup")).rejects.toThrow(
      "Email is invalid, Password is too short",
    );
  });

  it("throws default message when error field missing", async () => {
    mockFetch({}, false, 500);
    await expect(apiRequest("/api/test")).rejects.toThrow("Request failed");
  });

  it("omits body when not provided", async () => {
    const spy = mockFetch({ data: [] });
    await apiRequest("/api/test");
    expect(spy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ body: undefined }),
    );
  });
});
