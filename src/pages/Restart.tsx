@@ .. @@
   useEffect(() => {
     if (socket) {
-      socket.on('restart-status', (data) => {
+      socket.on('script-status', (data) => {
         setRestartStatus(data);
         
         if (data.status === 'completed' || data.status === 'failed') {
           setRestarting(false);
-          toast.success(`Processus de redémarrage ${data.status === 'completed' ? 'terminé' : 'échoué'}`);
+          toast.success(`Processus d'exécution ${data.status === 'completed' ? 'terminé' : 'échoué'}`);
         }
       });

       return () => {
-        socket.off('restart-status');
+        socket.off('script-status');
       };
     }
   }, [socket]);
@@ .. @@
   const handleRestart = async () => {
     if (selectedServers.length === 0) {
-      toast.error('Veuillez sélectionner au moins un serveur');
+      toast.error('Veuillez sélectionner au moins un serveur');
       return;
     }

-    if (!confirm(`Êtes-vous sûr de vouloir redémarrer ${selectedServers.length} serveur(s) ?`)) {
+    if (!confirm(`Êtes-vous sûr de vouloir exécuter les scripts sur ${selectedServers.length} serveur(s) ?`)) {
       return;
     }

     try {
       setRestarting(true);
       setRestartStatus(null);
       await restartAPI.execute(selectedServers);
-      toast.success('Processus de redémarrage lancé');
+      toast.success('Processus d\'exécution de scripts lancé');
     } catch (error) {
-      toast.error('Échec du lancement du processus de redémarrage');
+      toast.error('Échec du lancement du processus d\'exécution');
       setRestarting(false);
     }
   };
@@ .. @@
      <div className="flex justify-between items-center">
        <div>
-         <h1 className="text-3xl font-bold text-white">Redémarrage des serveurs</h1>
-         <p className="text-gray-400">Sélectionnez et redémarrez les serveurs individuellement ou par groupe</p>
+         <h1 className="text-3xl font-bold text-white">Exécution de scripts</h1>
+         <p className="text-gray-400">Sélectionnez et exécutez les scripts sur les serveurs individuellement ou par groupe</p>
        </div>
        
        <div className="flex space-x-3">
@@ .. @@
           <button
             onClick={handleRestart}
             disabled={restarting || selectedServers.length === 0}
             className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
           >
             {restarting ? (
               <>
                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
-                Redémarrage...
+                Exécution...
               </>
             ) : (
               <>
                 <RotateCcw size={20} className="mr-2" />
-                Redémarrer la sélection ({selectedServers.length})
+                Exécuter sur la sélection ({selectedServers.length})
               </>
             )}
           </button>
@@ .. @@
       {/* État du redémarrage */}
       {restartStatus && (
         <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
-          <h3 className="text-lg font-semibold text-white mb-2">État du redémarrage</h3>
+          <h3 className="text-lg font-semibold text-white mb-2">État de l'exécution</h3>
           <div className="flex items-center space-x-2">
             {restartStatus.status === 'completed' ? (
               <CheckCircle className="text-green-500" size={20} />
@@ .. @@
                   <div className="space-y-1 text-sm text-gray-400">
                     <p>Hôte : {server.hostname}</p>
                     <p>IP : {server.ipAddress}:{server.port}</p>
+                    <p>Script : {server.scriptPath || 'Non défini'}</p>
                     <p>Ordre : #{server.restartOrder}</p>
                     <div className="flex items-center space-x-2 mt-2">
@@ .. @@
         <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
           <RotateCcw size={48} className="mx-auto text-gray-600 mb-4" />
           <h3 className="text-xl font-medium text-gray-400 mb-2">Aucun serveur actif</h3>
-          <p className="text-gray-500">Ajoutez des serveurs pour commencer à gérer les redémarrages</p>
+          <p className="text-gray-500">Ajoutez des serveurs pour commencer à gérer l'exécution de scripts</p>
         </div>
       )}
     </div>