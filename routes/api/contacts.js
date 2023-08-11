const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const { contactsSchema } = require("../../schemas");

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(contactsSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(contactsSchema), ctrl.updateById);

module.exports = router;
