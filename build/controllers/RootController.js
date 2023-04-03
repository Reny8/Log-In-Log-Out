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
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("\n      <div style=\"position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);\">\n      <h1 style=\"text-align: center;\">Not Permitted</h1>\n      </div>\n      ");
}
var RootController = /** @class */ (function () {
    function RootController() {
    }
    RootController.prototype.getRoot = function (request, response) {
        if (request.session && request.session.loggedIn) {
            response.send("\n              <div style=\"position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);\">\n              <h1 style=\"text-align: center;\">You are successfully logged in!</h1>\n              <a href=\"/auth/logout\" style=\"text-decoration:none;color:black\">\n              <button style=\"width:-webkit-fill-available;\" >\n              Logout\n              </button>\n              </a>\n              </div>\n              ");
        }
        else {
            response.send("\n              <div style=\"position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);\">\n              <h1  style=\"text-align: center;\">You need to login</h1>\n              <a href=\"/auth/login\" style=\"text-decoration:none;color:black\">\n              <button  style=\"width:-webkit-fill-available;\" >\n              Login\n              </button>\n              </a>\n              </div>\n              ");
        }
    };
    RootController.prototype.getProtected = function (req, res) {
        res.send("\n              <div style=\"position:absolute;top:50%;left:50%; transform:translate(-50%, -50%);\">\n              <h1 style=\"text-align: center;\">Welcome to the protected route, logged in user!</h1>\n              </div>\n              ");
    };
    __decorate([
        decorators_1.get("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], RootController.prototype, "getRoot", null);
    __decorate([
        decorators_1.get("/protected"),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], RootController.prototype, "getProtected", null);
    RootController = __decorate([
        decorators_1.controller("")
    ], RootController);
    return RootController;
}());
