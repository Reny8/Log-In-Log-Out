import { controller, get, use } from "./decorators";
import { NextFunction, Request, Response } from "express";

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send(
    `
      <div style="position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);">
      <h1 style="text-align: center;">Not Permitted</h1>
      </div>
      `
  );
}

@controller("")
class RootController {
  @get("/")
  getRoot(request: Request, response: Response) {
    if (request.session && request.session.loggedIn) {
      response.send(
        `
              <div style="position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);">
              <h1 style="text-align: center;">You are successfully logged in!</h1>
              <a href="/auth/logout" style="text-decoration:none;color:black">
              <button style="width:-webkit-fill-available;" >
              Logout
              </button>
              </a>
              </div>
              `
      );
    } else {
      response.send(
        `
              <div style="position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);">
              <h1  style="text-align: center;">You need to login</h1>
              <a href="/auth/login" style="text-decoration:none;color:black">
              <button  style="width:-webkit-fill-available;" >
              Login
              </button>
              </a>
              </div>
              `
      );
    }
  }
  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send(
      `
              <div style="position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);">
              <h1 style="text-align: center;">Welcome to the protected route, logged in user!</h1>
              </div>
              `
    );
  }
}
