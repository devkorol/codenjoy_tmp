
#!/bin/bash


cp /var/log/codenjoy.log /var/log/codenjoy$(date +%F).log;

systemctl stop codenjoy;
systemctl start codenjoy;

