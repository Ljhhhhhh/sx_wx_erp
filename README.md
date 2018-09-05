### 项目主要目录结构
├─build  ->wepback脚本
├─config -> webpack配置
├─src ->主项目               
│ ├─api ->接口请求
│ ├─assets ->静态资源（暂时弃用）
│ ├─base ->组件
│ ├─components ->页面
│ │  ├─apply_show ->审核页面
│ │  └─new_flow ->新建流程（暂时弃用）
│ ├─router ->路由
│ └─store ->VUEX
├─static ->静态资源
│ ├─images ->图片
│ │  └─icons ->图标
│ ├─js -> js
│ └─styles -> 样式

### 项目开发思想
- 利用vue-router控制路由、利用vuex进行数据管理、利用vux框架开发页面
- 尽量使用组件化开发
- 扫码、签到使用微信提供的接口获取必要数据
- 公用的函数提取到static/js文件夹下，方便多次调取
- 如需添加审核模块，请navbar.js进行配置，navbar.js会根据配置自动展示所需数据，具体查看navbar.js解析

### 项目开发难点

- 项目中各个模块菜单使用了统一的组件，利用接口返回信息，展示所需的子模块
- 审核页面的审核详情 利用src/api/navbar.js进行各个模块的定制化展示

### navbar.js解析
 - navbar_json为主要配置
 - c_name是该模块的中文名称
 - data下的字段为该模块直接从api可以获取并使用的信息
 - data下的每个字段为一条信息，title为该字段的中文名称
 - 当data下的字段有unit时，表示该字段需要添加单位，单位信息为unit的值
 - 当data下的字段有_formatUnixTime时，表示该字段为时间，会对该字段进行时间格式化处理
 - 当模块存在calcData时，说明该模块含有需要自定义计算后展示的属性
 - calcData下的每个字段表示计算后得到的字段名称
 - calcData下的field表示该模块需要根据api的哪些字段进行计算
 - 当模块存在otherData时，说明该模块含有关联的详情，可从api中获取到所需字段
 - otherData下的对象是指该数据绑定的其他详情信息的字段
 - 当存在withOther时，说明该信息需要同withOther指定的字段同时展示
 - setNotSureData()函数：此函数设置基本详情并具有处理时间格式化、单位处理、绑定更多字段、天数小时合并计算功能
 - detailInfoDeal()函数：此函数设置当前信息所绑定的其他信息详情，具体功能类似setNotSureData()函数
 - 除工资条以为的所有模块，都是走navbar，如果后续有不进入流程的模块，可以在navbars.vue的detail中处理

### api/config
- 此文件更改开发/测试环境的url配置

### base/list-item
- 此文件集成了下拉刷新，上拉加载，头部点击等功能，navabr_detail通过该组件封装，具体使用可参照navbar_detail.vue