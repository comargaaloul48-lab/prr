@@ .. @@
   body('username').isLength({ min: 3 }).trim().escape(),
-  body('email').isEmail().normalizeEmail()
+  body('email').isEmail().normalizeEmail(),
+  body('phoneNumber').optional().isMobilePhone()
 ], async (req, res) => {