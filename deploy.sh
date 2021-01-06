#!/bin/bash

# 当发生错误时中止脚本
set -e

echo '+++++++++++++++开始构建+++++++++++++++++++++'
npm run build
echo '+++++++++++++++构建结束+++++++++++++++++++++'


echo '+++++++++++++++开始压缩+++++++++++++++++++++'
# windows linux 环境
wsl zip -r .nuxt.zip .nuxt
echo '+++++++++++++++压缩结束+++++++++++++++++++++'


echo '+++++++++++++++开始上传+++++++++++++++++++++'
scp .nuxt.zip root@123.57.1.92:/tmp
rm .nuxt.zip
echo '+++++++++++++++上传结束+++++++++++++++++++++'



echo '+++++++++++++++开始部署+++++++++++++++++++++'
ssh root@123.57.1.92 << EOF
cd /tmp
unzip -o .nuxt.zip -d /srv/jitsi-meet-server/
cd /srv/jitsi-meet-server/
git pull
npm run server
rm .nuxt.zip
EOF
echo '+++++++++++++++部署完成+++++++++++++++++++++'

exit
