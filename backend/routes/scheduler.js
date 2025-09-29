@@ .. @@
   body('name').isLength({ min: 1 }).trim().escape(),
   body('serverIds').isArray({ min: 1 }),
-  body('scheduledTime').isISO8601()
+  body('scheduledTime').isISO8601(),
+  body('smsMessage').optional().isLength({ max: 150 })
 ], async (req, res) => {