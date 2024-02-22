import { Router } from "express";
//middleware
import { isAuthenticated } from "./middleware/isAuthenticaded";

//user imports
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";
import { FindUserByIdController } from "./controllers/user/FindUserByIdController";

//subscription imports
import { CreateSubscriptionController } from "./controllers/subscription/CreateSubscriptionController";
import { GetSubscriptionbyUserController } from "./controllers/subscription/GetSubscriptionByUserController";

const router = Router();

router.post("/user", new CreateUserController().handle);
router.post("/signin", new AuthUserController().handle);
router.delete("/user", isAuthenticated, new DeleteUserController().handle);
router.get("/user/id", isAuthenticated, new FindUserByIdController().handle);

// Subscriptions
router.post(
  "/subscription",
  isAuthenticated,
  new CreateSubscriptionController().handle,
);

router.get(
  "/subscription/id",
  isAuthenticated,
  new GetSubscriptionbyUserController().handle,
);

export { router };
