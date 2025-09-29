@@ .. @@
     notificationEmails: {
       type: DataTypes.JSON,
       defaultValue: []
+    },
+    smsNotification: {
+      type: DataTypes.BOOLEAN,
+      defaultValue: false
+    },
+    smsMessage: {
+      type: DataTypes.STRING,
+      allowNull: true,
+      validate: {
+        len: [1, 150]
+      }
     }
   });
 };