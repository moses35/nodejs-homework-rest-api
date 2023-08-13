const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", ctrl.getContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.contactsSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put("/:contactId", isValidId, ctrl.updateById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
