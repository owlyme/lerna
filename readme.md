### 创建packages 命令
1. ```yarn temp```
2. ```plop 创建组件```
3. ```yarn upload ```

### /cdnServer 目录
1. 提供一个静态资源服务，localhost:4000
2. 开发的脚本存放在public/reactComps 目录
3. db/data.json文件**存储数据**，有条件的可以换数据库
4. 暴露接口列表

    |  接口名   | 功能  |
    |  :----  | ----  |
    | /upload  | 上传看法完成的组件 |
    | /complist  | 获取所有上传成功的文件信息列表 |
    | /save/config  | 保存配置 |
    | /get/config | 获取配置 |
    | /compose/js  | 将多个js文件合并成一个脚本，返回给客户端 |

### /packages 目录
1. 组件开发目录，该目录下的没有路径对应一个组件
    - 组件文件下执行脚本，打包 ```命令 yarn build ```

### /workspace 目录
1. devPage 开发调试页面

