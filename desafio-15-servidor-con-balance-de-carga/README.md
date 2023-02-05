Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node
```sh
npm run dev -- -p 8080 -m fork
npm run dev -- -p 8080 -m cluster
```

Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
```sh
forever start -w --minUptime=1000 --spinSleepTime=1000 index.js -p 8080
forever list // listo los procesos por forever
Get-Process // listo los prosesos por sistema operativo (powershell)
```

Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.

```sh
pm2 start index.js --name="server1" --watch -- -- -p 8080
pm2 start index.js --name="server2" --watch -i max -- -- -p 8081
pm2 list // listo los procesos por pm2
Get-Process // listo los prosesos por sistema operativo (powershell)
```

