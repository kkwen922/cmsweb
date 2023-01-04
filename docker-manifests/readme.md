
 #從 dockerfile 建立一個名為 cmsweb 的映像檔
 docker build . -t cmsweb

docker run -it -p 1234:8090 -v /home/kevinchang/myProject/cmsweb:/app cmsweb sh

