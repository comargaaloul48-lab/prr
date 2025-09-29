@@ .. @@
   body('hostname').isLength({ min: 1 }).trim(),
   body('ipAddress').isIP(),
-  body('port').isInt({ min: 1, max: 65535 })
+  body('port').isInt({ min: 1, max: 65535 }),
+  body('scriptPath').optional().isLength({ min: 1 }).trim()
 ], async (req, res) => {
@@ .. @@
   body('hostname').isLength({ min: 1 }).trim(),
   body('ipAddress').isIP(),
-  body('port').isInt({ min: 1, max: 65535 })
+  body('port').isInt({ min: 1, max: 65535 }),
+  body('scriptPath').optional().isLength({ min: 1 }).trim()
 ], async (req, res) => {