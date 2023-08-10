const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../schemas");

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody.addValidateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put(
  "/:contactId",
  validateBody.updateByIdValidateBody(schemas.addSchema),
  ctrl.updateById
);

module.exports = router;
