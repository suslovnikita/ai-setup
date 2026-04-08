import { describe, it, expect, beforeEach } from "vitest";
import { getToken, setToken, removeToken, isAuthenticated } from "@/lib/auth";

beforeEach(() => {
  localStorage.clear();
});

describe("getToken", () => {
  it("returns null when no token stored", () => {
    expect(getToken()).toBeNull();
  });

  it("returns stored token", () => {
    localStorage.setItem("auth_token", "abc");
    expect(getToken()).toBe("abc");
  });
});

describe("setToken", () => {
  it("persists token to localStorage", () => {
    setToken("tok123");
    expect(localStorage.getItem("auth_token")).toBe("tok123");
  });
});

describe("removeToken", () => {
  it("removes token from localStorage", () => {
    localStorage.setItem("auth_token", "tok123");
    removeToken();
    expect(localStorage.getItem("auth_token")).toBeNull();
  });
});

describe("isAuthenticated", () => {
  it("returns false when no token", () => {
    expect(isAuthenticated()).toBe(false);
  });

  it("returns true when token exists", () => {
    localStorage.setItem("auth_token", "tok123");
    expect(isAuthenticated()).toBe(true);
  });
});
