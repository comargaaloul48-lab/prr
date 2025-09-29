@@ .. @@
   isActive: boolean;
   lastLogin?: string;
+  phoneNumber?: string;
 }
@@ .. @@
     permissions: {
       canMonitor: true,
       canRestart: false,
       canViewLogs: true,
       canManageServers: false,
       canManageUsers: false,
       canScheduleTasks: false
     },
-    isActive: true
+    isActive: true,
+    phoneNumber: ''
   });
@@ .. @@
      permissions: {
        canMonitor: true,
        canRestart: false,
        canViewLogs: true,
        canManageServers: false,
       canManageUsers: false,
       canScheduleTasks: false
     },
-    isActive: true
+    isActive: true,
+    phoneNumber: ''
   });
 };
@@ .. @@
     setFormData({
       username: user.username,
       email: user.email,
       password: '',
       role: user.role,
       permissions: user.permissions,
-      isActive: user.isActive
+      isActive: user.isActive,
+      phoneNumber: user.phoneNumber || ''
     });
     setShowModal(true);
   };
@@ .. @@
                <th className="text-left py-3 px-6 text-gray-400 font-medium">Utilisateur</th>
                <th className="text-left py-3 px-6 text-gray-400 font-medium">Rôle</th>
+               <th className="text-left py-3 px-6 text-gray-400 font-medium">Téléphone</th>
                <th className="text-left py-3 px-6 text-gray-400 font-medium">Permissions</th>
                <th className="text-left py-3 px-6 text-gray-400 font-medium">Statut</th>
@@ .. @@
                     </div>
                   </td>
+                  <td className="py-4 px-6 text-gray-300">
+                    {user.phoneNumber || 'Non défini'}
+                  </td>
                   <td className="py-4 px-6">
@@ .. @@
                />
              </div>
             
+             <div>
+               <label className="block text-gray-300 text-sm font-medium mb-1">
+                 Numéro de téléphone
+               </label>
+               <input
+                 type="tel"
+                 value={formData.phoneNumber}
+                 onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
+                 className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
+                 placeholder="Ex: 58434532"
+               />
+               <p className="text-gray-400 text-xs mt-1">
+                 Numéro pour les notifications SMS (optionnel)
+               </p>
+             </div>
+             
             <div>
               <label className="block text-gray-300 text-sm font-medium mb-1">
                Mot de passe {editingUser && '(laisser vide pour conserver le mot de passe actuel)'}