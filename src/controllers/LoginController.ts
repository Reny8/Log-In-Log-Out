import { Request, Response } from "express";
import { get, controller, bodyValidator, post } from "./decorators";

@controller("/auth")
class LoginController {
  @get("/login")
  getLogin(request: Request, response: Response): void {
    response.send(`
              <div style="position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);">
              <h1 style="text-align: center;">Login In</h1>
              <form method="POST" style="display:flex;flex-direction:column;align-items:flex-end">
              <div>
              <label style="margin-bottom:1rem;">Email</label>
              <input style="margin-bottom:1rem;" name="email"/>
              </div>
              <div>
              <label style="margin-bottom:1rem;">Password </label>
              <input style="margin-bottom:1rem;" type="password" name="password"/>
              </div>
              <button style="width:-webkit-fill-available;">Submit</button>
              </form>
              </div>
              `);
  }
  @post("/login")
  @bodyValidator("email", "password")
  postLogin(request: Request, response: Response) {
    const { email, password } = request.body;
    if (email === "test@email.com" && password === "password") {
      request.session = { loggedIn: true };
      response.redirect("/");
    } else {
      response.send("Invalid email or password");
    }
  }

  @get("/logout")
  getLogout(request: Request, response: Response) {
    request.session = undefined;
    response.redirect("/");
  }
}
