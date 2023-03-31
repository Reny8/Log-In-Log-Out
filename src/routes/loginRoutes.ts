import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

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
const router = Router();

router.get("/login", (request: RequestWithBody, response: Response) => {
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
});
router.get("/", (request: RequestWithBody, response: Response) => {
  if (request.session && request.session.loggedIn) {
    response.send(
      `
        <div style="position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);">
        <h1 style="text-align: center;">You are successfully logged in!</h1>
        <a href="/logout" style="text-decoration:none;color:black">
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
        <a href="/login" style="text-decoration:none;color:black">
        <button  style="width:-webkit-fill-available;" >
        Login
        </button>
        </a>
        </div>
        `
    );
  }
});
router.post("/login", (request: RequestWithBody, response: Response) => {
  const { email, password } = request.body;
  if (
    email &&
    password &&
    email === "test@email.com" &&
    password === "password"
  ) {
    request.session = { loggedIn: true };
    response.redirect("/");
  } else {
    response.send("Invalid email or password");
  }
});
router.get("/logout", (request: RequestWithBody, response: Response) => {
  request.session = undefined;
  response.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send(
    `
        <div style="position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);">
        <h1 style="text-align: center;">Welcome to the protected route, logged in user!</h1>
        </div>
        `
  );
});
export { router };
