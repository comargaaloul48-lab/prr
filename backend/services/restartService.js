@@ .. @@
 const { spawn } = require('child_process');
 const { RestartLog } = require('../models');
 const logger = require('../utils/logger');
-const { sendEmail } = require('./emailService');
+const { sendEmail } = require('./emailService');

-const executeRestart = async (servers, restartLog, io) => {
+const executeScript = async (servers, restartLog, io) => {
   try {
     const details = { servers: [], errors: [] };
     
-    // Sort servers by restart order
+    // Sort servers by execution order
     servers.sort((a, b) => a.restartOrder - b.restartOrder);
     
-    io.emit('restart-status', {
+    io.emit('script-status', {
       logId: restartLog.id,
       status: 'started',
-      message: 'Restart process initiated'
+      message: 'Script execution process initiated'
     });
     
     for (const server of servers) {
       try {
-        logger.info(`Restarting server: ${server.name} (${server.hostname})`);
+        logger.info(`Executing script on server: ${server.name} (${server.hostname})`);
         
         // Ping test first
         const pingResult = await pingServer(server.hostname);
@@ -32,8 +32,8 @@
           throw new Error('Server is not reachable');
         }
         
-        // Execute SSH reboot command
-        const sshResult = await executeSSHReboot(server);
+        // Execute SSH script command
+        const sshResult = await executeSSHScript(server);
         
         details.servers.push({
           id: server.id,
@@ -43,12 +43,12 @@
           timestamp: new Date()
         });
         
-        io.emit('restart-status', {
+        io.emit('script-status', {
           logId: restartLog.id,
           serverId: server.id,
-          status: 'restarted',
-          message: `Server ${server.name} restarted successfully`
+          status: 'executed',
+          message: `Script executed successfully on ${server.name}`
         });
         
-        // Wait for restart delay if specified
+        // Wait for execution delay if specified
         if (server.restartDelay > 0) {
@@ -56,7 +56,7 @@
         }
         
       } catch (error) {
-        logger.error(`Failed to restart ${server.name}:`, error);
+        logger.error(`Failed to execute script on ${server.name}:`, error);
         details.errors.push({
           serverId: server.id,
           serverName: server.name,
@@ -64,12 +64,12 @@
         });
         
-        io.emit('restart-status', {
+        io.emit('script-status', {
           logId: restartLog.id,
           serverId: server.id,
           status: 'error',
-          message: `Failed to restart ${server.name}: ${error.message}`
+          message: `Failed to execute script on ${server.name}: ${error.message}`
         });
       }
     }
@@ -82,18 +82,18 @@
       endTime: new Date()
     });
     
-    io.emit('restart-status', {
+    io.emit('script-status', {
       logId: restartLog.id,
       status: status,
-      message: `Restart process ${status}`,
+      message: `Script execution process ${status}`,
       details
     });
     
   } catch (error) {
-    logger.error('Restart process failed:', error);
+    logger.error('Script execution process failed:', error);
     await restartLog.update({
       status: 'failed',
       details: { error: error.message },
       endTime: new Date()
     });
     
-    io.emit('restart-status', {
+    io.emit('script-status', {
       logId: restartLog.id,
       status: 'failed',
-      message: `Restart process failed: ${error.message}`
+      message: `Script execution process failed: ${error.message}`
     });
   }
 };
@@ .. @@
   });
 };

-const executeSSHReboot = (server) => {
+const executeSSHScript = (server) => {
   return new Promise((resolve, reject) => {
+    if (!server.scriptPath) {
+      reject(new Error('No script path specified for this server'));
+      return;
+    }
+
     const ssh = spawn('ssh', [
       '-o', 'StrictHostKeyChecking=no',
       '-o', 'ConnectTimeout=10',
       '-o', 'HostKeyAlgorithms=+ssh-rsa',
       `root@${server.hostname}`,
-      'reboot'
+      server.scriptPath
     ]);
     
     let error = '';
@@ .. @@
     });
     
     ssh.on('close', (code) => {
-      if (code === 0 || code === null) { // null code is expected for reboot
+      if (code === 0) {
         resolve(true);
       } else {
         reject(new Error(error || `SSH command failed with code ${code}`));
@@ -130,4 +139,4 @@
   });
 };

-module.exports = { executeRestart };
+module.exports = { executeScript };