@@ .. @@
 const cron = require('node-cron');
 const { ScheduledTask, Server } = require('../models');
-const { executeRestart } = require('./restartService');
+const { executeScript } = require('./restartService');
 const { sendScheduledRestartNotification } = require('./emailService');
+const { sendScheduledScriptNotification } = require('./smsService');
 const logger = require('../utils/logger');
@@ .. @@
     // Send notification email if enabled
     if (task.emailNotification && task.notificationEmails.length > 0) {
-      await sendScheduledRestartNotification(task, task.notificationEmails);
+      await sendScheduledScriptNotification(task, task.notificationEmails);
+    }
+
+    // Send SMS notification if enabled
+    if (task.smsNotification && task.smsMessage) {
+      const { User } = require('../models');
+      const user = await User.findByPk(task.createdBy);
+      if (user && user.phoneNumber) {
+        const { sendScheduledScriptNotification } = require('./smsService');
+        await sendScheduledScriptNotification(task, [user.phoneNumber]);
+      }
     }
     
-    // Create restart log for scheduled task
+    // Create execution log for scheduled task
     const { RestartLog } = require('../models');
     const restartLog = await RestartLog.create({
       userId: task.createdBy,
@@ -67,8 +78,8 @@
       isScheduled: true
     });
     
-    // Execute restart
-    await executeRestart(servers, restartLog, io);
+    // Execute script
+    await executeScript(servers, restartLog, io);
     
     // Update task status
     await task.update({ status: 'completed' });