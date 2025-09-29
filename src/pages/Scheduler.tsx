@@ .. @@
   emailNotification: boolean;
   notificationEmails: string[];
+  smsNotification: boolean;
+  smsMessage: string;
   User: {
     username: string;
   };
@@ .. @@
     serverIds: [] as number[],
     scheduledTime: '',
     emailNotification: false,
-    notificationEmails: ['']
+    notificationEmails: [''],
+    smsNotification: false,
+    smsMessage: ''
   });
@@ .. @@
     setFormData({
       name: '',
       serverIds: [],
       scheduledTime: '',
       emailNotification: false,
-      notificationEmails: ['']
+      notificationEmails: [''],
+      smsNotification: false,
+      smsMessage: ''
     });
   };
@@ .. @@
                     <div className="flex items-center mt-1">
                       <Mail size={12} className="text-blue-400 mr-1" />
                       <span className="text-xs text-blue-400">Notifications par email</span>
                     </div>
                   )}
+                  {task.smsNotification && (
+                    <div className="flex items-center mt-1">
+                      <span className="text-xs text-green-400">📱 Notifications SMS</span>
+                    </div>
+                  )}
                 </div>
               </div>
             </td>
@@ .. @@
               <div>
                 <label className="block text-gray-300 text-sm font-medium mb-1">
-                  Nom de la tâche
+                  Nom de la tâche d'exécution
                 </label>
                 <input
                   type="text"
@@ -218,7 +228,7 @@
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
-                  placeholder="Ex : Redémarrage hebdomadaire du serveur"
+                  placeholder="Ex : Exécution hebdomadaire du script de maintenance"
                 />
               </div>
               
@@ .. @@
               <div>
                 <label className="block text-gray-300 text-sm font-medium mb-2">
-                  Sélectionnez les serveurs
+                  Sélectionnez les serveurs pour l'exécution de scripts
                 </label>
                 <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
@@ .. @@
                 </label>
               </div>
               
+              <div>
+                <label className="flex items-center space-x-2">
+                  <input
+                    type="checkbox"
+                    checked={formData.smsNotification}
+                    onChange={(e) => setFormData({ ...formData, smsNotification: e.target.checked })}
+                    className="text-blue-600"
+                  />
+                  <span className="text-gray-300">Envoyer des notifications SMS</span>
+                </label>
+              </div>
+              
+              {formData.smsNotification && (
+                <div>
+                  <label className="block text-gray-300 text-sm font-medium mb-2">
+                    Message SMS (max 150 caractères)
+                  </label>
+                  <textarea
+                    value={formData.smsMessage}
+                    onChange={(e) => {
+                      const cleanValue = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 150);
+                      setFormData({ ...formData, smsMessage: cleanValue });
+                    }}
+                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
+                    rows={3}
+                    placeholder="Message de notification SMS (lettres et chiffres uniquement)"
+                  />
+                  <p className="text-gray-400 text-xs mt-1">
+                    {formData.smsMessage.length}/150 caractères
+                  </p>
+                </div>
+              )}
+              
               {formData.emailNotification && (
                 <div>
                   <label className="block text-gray-300 text-sm font-medium mb-2">
@@ .. @@
                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                 >
-                  Planifier la tâche
+                  Planifier l'exécution
                 </button>
               </div>
             </form>