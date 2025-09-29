@@ .. @@
 const { Server, RestartLog, User } = require('../models');
 const { authenticateToken, requirePermission } = require('../middleware/auth');
-const { executeRestart } = require('../services/restartService');
+const { executeScript } = require('../services/restartService');
 
 const router = express.Router();

-// Restart servers
+// Execute scripts on servers
 router.post('/', [
   authenticateToken,
   requirePermission('canRestart')
@@ .. @@
     }
     
-    // Create restart log
+    // Create execution log
     const restartLog = await RestartLog.create({
       userId: req.user.userId,
       serverIds: serverIds,
       status: 'started'
     });
     
-    // Execute restart asynchronously
-    executeRestart(servers, restartLog, req.app.get('io'));
+    // Execute script asynchronously
+    executeScript(servers, restartLog, req.app.get('io'));
     
     res.json({ 
-      message: 'Restart initiated successfully',
+      message: 'Script execution initiated successfully',
       logId: restartLog.id
     });
   } catch (error) {