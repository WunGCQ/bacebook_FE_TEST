##初始化和运行

1. 首先要安装node，版本在4以上， npm 在3以上（可以通过 nvm来管理）
2. 按照 react-native 官网的guide来安装好 `react-native` 和 `rnpm`
3. `$ npm install`
4. `$ rnpm link` 用来连接静态资源库
5. `$ npm run fake_server_init`
6. 配置host ($sudo vim /etc/hosts) 加上一个数据行 `127.0.0.1 m.me`
7. 新开一个命令行运行假数据服务器 `npm run backend`
8. 在 test 目录下运行 `$ react-native run-ios`
