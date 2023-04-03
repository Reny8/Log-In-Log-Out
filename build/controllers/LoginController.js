"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.getLogin = function (request, response) {
        response.send("\n              <div style=\"position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);\">\n              <h1 style=\"text-align: center;\">Login In</h1>\n              <form method=\"POST\" style=\"display:flex;flex-direction:column;align-items:flex-end\">\n              <div>\n              <label style=\"margin-bottom:1rem;\">Email</label>\n              <input style=\"margin-bottom:1rem;\" name=\"email\"/>\n              </div>\n              <div>\n              <label style=\"margin-bottom:1rem;\">Password </label>\n              <input style=\"margin-bottom:1rem;\" type=\"password\" name=\"password\"/>\n              </div>\n              <button style=\"width:-webkit-fill-available;\">Submit</button>\n              </form>\n              </div>\n              ");
    };
    LoginController.prototype.postLogin = function (request, response) {
        var _a = request.body, email = _a.email, password = _a.password;
        if (email === "test@email.com" && password === "password") {
            request.session = { loggedIn: true };
            response.redirect("/");
        }
        else {
            response.send("Invalid email or password");
        }
    };
    LoginController.prototype.getLogout = function (request, response) {
        request.session = undefined;
        response.redirect("/");
    };
    __decorate([
        decorators_1.get("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogin", null);
    __decorate([
        decorators_1.post("/login"),
        decorators_1.bodyValidator("email", "password"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "postLogin", null);
    __decorate([
        decorators_1.get("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogout", null);
    LoginController = __decorate([
        decorators_1.controller("/auth")
    ], LoginController);
    return LoginController;
}());
