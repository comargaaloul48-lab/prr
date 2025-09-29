@@ .. @@
         name: 'SiegeAssurnetFront',
         hostname: 'SiegeAssurnetFront',
         ipAddress: '192.168.1.10',
         port: 80,
         group: 'frontend',
         restartOrder: 1,
-        description: 'Frontend server'
+        description: 'Frontend server',
+        scriptPath: '/opt/scripts/restart-frontend.sh'
       },
       {
         name: 'droolslot2',
         hostname: 'droolslot2',
         ipAddress: '192.168.1.11',
         port: 80,
         group: 'frontend',
         restartOrder: 2,
-        description: 'Drools server'
+        description: 'Drools server',
+        scriptPath: '/opt/scripts/restart-drools.sh'
       },
       {
         name: 'siegeawf',
         hostname: 'siegeawf',
         ipAddress: '192.168.1.12',
         port: 80,
         group: 'middleware',
         restartOrder: 3,
-        description: 'AWF server'
+        description: 'AWF server',
+        scriptPath: '/opt/scripts/restart-awf.sh'
       },
       {
         name: 'siegeasdrools',
         hostname: 'siegeasdrools',
         ipAddress: '192.168.1.13',
         port: 8080,
         group: 'middleware',
         restartOrder: 4,
-        description: 'AS Drools server'
+        description: 'AS Drools server',
+        scriptPath: '/opt/scripts/restart-asdrools.sh'
       },
       {
         name: 'siegeaskeycloak',
         hostname: 'siegeaskeycloak',
         ipAddress: '192.168.1.14',
         port: 8080,
         group: 'auth',
         restartOrder: 5,
-        description: 'Keycloak authentication server'
+        description: 'Keycloak authentication server',
+        scriptPath: '/opt/scripts/restart-keycloak.sh'
       },
       {
         name: 'siegeasbackend',
         hostname: 'siegeasbackend',
         ipAddress: '192.168.1.15',
         port: 7001,
         group: 'backend',
         restartOrder: 6,
         restartDelay: 650,
-        description: 'Backend application server'
+        description: 'Backend application server',
+        scriptPath: '/opt/scripts/restart-backend.sh'
       },
       {
         name: 'assurnetprod',
         hostname: 'assurnetprod',
         ipAddress: '192.168.1.16',
         port: 80,
         group: 'production',
         restartOrder: 7,
-        description: 'Production server'
+        description: 'Production server',
+        scriptPath: '/opt/scripts/restart-prod.sh'
       },
       {
         name: 'SiegeAssurnetDigitale',
         hostname: 'SiegeAssurnetDigitale',
         ipAddress: '172.30.7.89',
         port: 7002,
         group: 'backend',
         restartOrder: 6,
-        description: 'Digital platform server'
+        description: 'Digital platform server',
+        scriptPath: '/opt/scripts/restart-digital.sh'
       },
       {
         name: 'siegedbc',
         hostname: 'siegedbc',
         ipAddress: '192.168.1.18',
         port: 1521,
         group: 'database',
         restartOrder: 0,
-        description: 'Database server (not restarted automatically)'
+        description: 'Database server (script not executed automatically)',
+        scriptPath: null
       }
     ];