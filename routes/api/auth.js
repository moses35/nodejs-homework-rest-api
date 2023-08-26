const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/users/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/users/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.registerSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.patch(
  "/users/:userId",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updeteSubscription
);

module.exports = router;
