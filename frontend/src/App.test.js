import { render, screen } from "@testing-library/react";
import * as context from "./lib/context.ts";
import App from "./App";

jest.mock("./components/Login.tsx", () => () => <div>Login Page</div>);
jest.mock("./components/Signup.tsx", () => () => <div>Signup Page</div>);
jest.mock("./pages/Home.tsx", () => () => <div>Home Page</div>);
jest.mock("./template/Grades.tsx", () => ({ branchName }) => (
  <div>Grades {branchName}</div>
));

describe("App routing", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    window.history.pushState({}, "Test page", "/");
  });

  test("redirects to login when user is not authenticated", async () => {
    jest.spyOn(context, "isAuthenticated").mockReturnValue(false);
    jest.spyOn(context, "getToken").mockReturnValue(null);
    jest.spyOn(context, "getBranches").mockResolvedValue([]);

    render(<App />);

    expect(await screen.findByText("Login Page")).toBeInTheDocument();
  });

  test("renders home when user is authenticated", async () => {
    jest.spyOn(context, "isAuthenticated").mockReturnValue(true);
    jest.spyOn(context, "getToken").mockReturnValue(null);
    jest.spyOn(context, "getBranches").mockResolvedValue([]);

    render(<App />);

    expect(await screen.findByText("Home Page")).toBeInTheDocument();
  });
});
