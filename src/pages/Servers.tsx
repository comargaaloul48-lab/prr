@@ .. @@
   group: string;
   restartOrder: number;
   restartDelay: number;
+  scriptPath: string;
 }
@@ .. @@
     group: 'default',
     restartOrder: 0,
-    restartDelay: 0
+    restartDelay: 0,
+    scriptPath: ''
   });
@@ .. @@
       group: 'default',
       restartOrder: 0,
-      restartDelay: 0
+      restartDelay: 0,
+      scriptPath: ''
     });
   };
@@ .. @@
                <th className="text-left py-3 px-6 text-gray-400 font-medium">IP:Port</th>
                <th className="text-left py-3 px-6 text-gray-400 font-medium">Groupe</th>
+               <th className="text-left py-3 px-6 text-gray-400 font-medium">Script</th>
                <th className="text-left py-3 px-6 text-gray-400 font-medium">Statut</th>
                <th className="text-left py-3 px-6 text-gray-400 font-medium">Actions</th>
@@ .. @@
                  <td className="py-4 px-6 text-gray-300">{server.ipAddress}:{server.port}</td>
                  <td className="py-4 px-6 text-gray-300">{server.group}</td>
+                 <td className="py-4 px-6 text-gray-300 text-sm">
+                   {server.scriptPath || 'Non défini'}
+                 </td>
                  <td className="py-4 px-6">
@@ .. @@
                />
              </div>
              
+             <div>
+               <label className="block text-gray-300 text-sm font-medium mb-1">
+                 Chemin du script
+               </label>
+               <input
+                 type="text"
+                 value={formData.scriptPath}
+                 onChange={(e) => setFormData({ ...formData, scriptPath: e.target.value })}
+                 className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
+                 placeholder="/opt/scripts/restart-service.sh"
+               />
+               <p className="text-gray-400 text-xs mt-1">
+                 Chemin complet du script à exécuter sur le serveur (ex: ./script.sh ou /path/to/script.sh)
+               </p>
+             </div>
+             
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Description