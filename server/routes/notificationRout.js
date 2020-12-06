const router = require("express").Router();
const ntfcControl = require("../controllers/notificationControl");

router.get("/", ntfcControl.getNotifications);
router.post("/new-notification", ntfcControl.addNotification);
router.put("/update-notification/:id", ntfcControl.updeteAndSendNote);
router.delete("/delete-notification/:id", ntfcControl.deleteNotification);

module.exports = router;
