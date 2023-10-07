"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scriptRouter = void 0;
var express_1 = __importDefault(require("express"));
var controller_1 = require("./controller");
exports.scriptRouter = express_1.default.Router();
exports.scriptRouter.route("/write").post(controller_1.scriptCtrl.writeLL);
//# sourceMappingURL=router.js.map