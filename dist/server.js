"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
var config_1 = require("./shared/config");
var context_1 = __importDefault(require("./shared/context/context"));
var resolvers_1 = require("./graphql/resolvers");
var schema_1 = require("./graphql/schema");
var apollo_server_core_1 = require("apollo-server-core");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var schema_2 = require("@graphql-tools/schema");
var graphql_middleware_1 = require("graphql-middleware");
var shileds_1 = require("./shared/security/shileds");
var apollo_server_express_1 = require("apollo-server-express");
var ErrorHandler_1 = require("./shared/middlewares/ErrorHandler");
var app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use(ErrorHandler_1.clientErrorHandler);
var schema = (0, schema_2.makeExecutableSchema)({ typeDefs: schema_1.typeDefs, resolvers: resolvers_1.resolvers });
var schemaWithMiddleware = (0, graphql_middleware_1.applyMiddleware)(schema, shileds_1.permissions);
var apollo = new apollo_server_express_1.ApolloServer({
    schema: schemaWithMiddleware,
    introspection: process.env.ENV_NAME !== 'production',
    context: context_1.default,
    plugins: process.env.ENV_NAME !== 'production'
        ? [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()]
        : [],
});
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, apollo.start()];
            case 1:
                _a.sent();
                apollo.applyMiddleware({
                    app: app,
                });
                app.listen({ port: config_1.PORT }, function () {
                    return console.log("Listen port ".concat(process.env.PORT || 8080, "..."));
                });
                return [2 /*return*/];
        }
    });
}); };
exports.startServer = startServer;
//# sourceMappingURL=server.js.map