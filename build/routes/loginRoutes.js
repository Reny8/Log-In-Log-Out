"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("\n    <div style=\"position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);\">\n    <h1 style=\"text-align: center;\">Not Permitted</h1>\n    </div>\n    ");
}
var router = express_1.Router();
exports.router = router;
router.get("/login", function (request, response) {
    response.send("\n        <div style=\"position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);\">\n        <h1 style=\"text-align: center;\">Login In</h1>\n        <form method=\"POST\" style=\"display:flex;flex-direction:column;align-items:flex-end\">\n        <div>\n        <label style=\"margin-bottom:1rem;\">Email</label>\n        <input style=\"margin-bottom:1rem;\" name=\"email\"/>\n        </div>\n        <div>\n        <label style=\"margin-bottom:1rem;\">Password </label>\n        <input style=\"margin-bottom:1rem;\" type=\"password\" name=\"password\"/>\n        </div>\n        <button style=\"width:-webkit-fill-available;\">Submit</button>\n        </form>\n        </div>\n        ");
});
router.get("/", function (request, response) {
    if (request.session && request.session.loggedIn) {
        response.send("\n        <div style=\"position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);\">\n        <h1 style=\"text-align: center;\">You are successfully logged in!</h1>\n        <button style=\"width:-webkit-fill-available;\" >\n        <a href=\"/logout\" style=\"text-decoration:none;color:black\">\n        Logout\n        </a>\n        </button>\n        </div>\n        ");
    }
    else {
        response.send("\n        <div style=\"position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);\">\n        <h1  style=\"text-align: center;\">You need to login</h1>\n        <button  style=\"width:-webkit-fill-available;\" >\n        <a href=\"/login\" style=\"text-decoration:none;color:black\">\n        Login\n        </a>\n        </button>\n        </div>\n        ");
    }
});
router.post("/login", function (request, response) {
    var _a = request.body, email = _a.email, password = _a.password;
    if (email &&
        password &&
        email === "test@email.com" &&
        password === "password") {
        request.session = { loggedIn: true };
        response.redirect("/");
    }
    else {
        response.send("Invalid email or password");
    }
});
router.get("/logout", function (request, response) {
    request.session = undefined;
    response.redirect("/");
});
router.get("/protected", requireAuth, function (req, res) {
    res.send("\n        <div style=\"position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);\">\n        <h1 style=\"text-align: center;\">Welcome to the protected route, logged in user!</h1>\n        </div>\n        ");
});
