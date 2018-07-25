# 第一节：

我在D盘的Code目录下建立了SmileVue文件夹。smile是微笑的意思，使用这个单词，我需要大家在学习完这套教程都对整个项目的理解和技术上的应用有一个层次的提供，露出微笑的表情。

你也可以利用终端的形式建立，打开终端进入D盘的code目录下，建立命令如下：

mkdir SmileVue

当然这个目录可以和我的不一样，你可以起一个自己喜欢的名字，也可以找一个自己喜欢的盘符位置。

目录建立好以后，打开代码编辑工具Visual Studio Code(以后简称VSCode)。并在VSCode中打开我们的项目。

2.使用vue-cli生成项目目录
使用vue-cli非常方便快速，它可以为我们生成基本的Vue的项目结构。

检测npm版本，在终端输入 npm -v,尽量使用5.x以上版本。
全局安装vue-cli，在终端里输入，npm install vue-cli -g。
在终端中输入 vue init webpack
等到上面这些都正确安装完成后，我们需要验证一下，我们安装是否成功。

3.测试环境是否安装成功

使用npm run dev 进行测试环境的打开。
在浏览器中输入 http://localhost:8080 进行测试。
在浏览器中打开页面，出现Vue的正常页面时，说明你的项目已经初始化成功了。


# 第02节：优雅引入Vant组件库
安装Vant
npm i vant -S：这是简写形式。
npm install vant --save:这是完整写法。
如果你网络很慢的话，可以使用淘宝的源，但是不建议使用cnpm来进行安装，用cnpm安装时我个人是会出现一些未知的问题的，所以我在实际项目中，都是用了这种安装方式。
npm install vant --save --registry=https://registry.npm.taobao.org

## 引入Vant的第一种方法（不推荐）
安装好vant后，可以使用以前常用的方法进行引入-这是一种全局引入的方式。
直接在src/main.js进行全局引入。

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
Vue.use(vant)
简单的三行代码已经可以把Vant引入进来了，但是这并不够优雅，也使得最后打包发布时会增加包的大小，Vue的SPA首屏打开时本来就有些慢，所以不建议使用这种方法进行引入。
## 优雅的引入Vant
vant是支持babel-plugin-import引入的，它可以让我们按需引入组件模块，并且不用管理我们的样式，现在Vue项目组件库的主流引入方法。
## 安装babel-plugin-import
npm i babel-plugin-import -D
也可以使用完整写法 npm install babel-plugin-import --save-dev

在.babelrc中配置plugins（插件）
"plugins": [
    "transform-vue-jsx", 
    "transform-runtime",
    ["import",{"libraryName":"vant","style":true}]
]
## 按需使用Vant组件
我们设置好.babelrc后，就可以按需引入Vant框架了。比如现在我们引入一个Button组件.
在src/main.js里加入下面的代码：

import { Button } from 'vant'
Vue.use(Button)
有了这段代码之后，我们就可以在需要的组件页面中加入Button了.
<van-button type="primary">主要按钮</van-button>

# 第3节:移动端屏幕适配基础
制作webapp时一个很关键的问题就是适配各种机型不同屏幕的大小，让每种机型上的布局看起来都尽量一样，这让很多小伙伴很是头疼。在这里我介绍一下我平时工作中常用的适配方案，当然适配方案有很多种，所以你有更好的方法，也可以使用或者大家一起交流。
## 常见移动web布局适配方法
+ 固定高度，宽度百分比：这种方法只适合简单要求不高的webApp，几乎达不到大型项目的要求，属于过时的方法。
+ Media Query（媒体查询）：现在比较主流的适配方案，比如我们常用的样式框架Bootstrap就是靠这个起家的，它能完成大部分项目需求，但是编写过于复杂。
+ flex布局：主流的布局方式，不仅适用于移动Web，网页上也表现良好，这也是现在工作中用的最多的布局方式，那我们的项目尽量采用flex+rem的方式进行布局和完成移动端的适配。

## rem单位介绍
rem（font size of the root element）是相对长度单位。相对于根元素（即html元素）font-size计算值的倍数。
+ 适配原理：将px替换成rem，动态修改html的font-size适配。它可以很好的根据根元素的字体大小来进行变化，从而达到各种屏幕基本一直的效果体验。
# JS控制适配屏幕
+ //得到手机屏幕的宽度
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
+    //得到html的Dom元素
    let htmlDom = document.getElementsByTagName('html')[0];
+    //设置根元素字体大小
    htmlDom.style.fontSize= htmlWidth/20 + 'px';
在作移动端页面适配时，一般我们不希望用户自己缩放页面大小，我们可以在index.html的meta标签进行设置，加入user-scalable=no。

# 第04节：首页布局和路由设置
## 首页路由的配置
### 打开路由配置页面：src/router/index.js,先删除vue-cli自动生成的HelloWorld.vue的配置,然后加入我们的路由配置.

````
import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    {path: '/',name: 'ShoppingMall',component: ShoppingMall}
  ]
})
````

这里的@代表的是项目的src目录。 

````
在build配置文件里面可以配置：
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
````

### 建立首页组件

删除`HelloWorld.vue`文件，建立`ShoppingMall.vue`文件。编写如下代码： 

````
<template>
  <div>
      {{msg}}
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      msg: 'Shopping Mall'
    }
  }
}
</script>
````

写好这个可以使用`npm run dev` 进行预览一下。 

### Vant布局讲解

使用Vant的布局需要先进行按需引入，我们直接在`/scr/main.js`里引入`Row`和`Col`组件。 

````
import { Button, Row, Col } from 'vant'
Vue.use(Button).use(Row).use(Col)
````

他的布局是采用24格布局法，简单的理解，就是把页面均匀的分成24等分，然后我们控制这24个等分的比例就可以实现布局。 

````
<van-row>
    <van-col span="8">span: 8</van-col>
    <van-col span="8">span: 8</van-col>
    <van-col span="8">span: 8</van-col>
</van-row>
````

# 第05节：首页搜索区域的布局

 页面很大的时候，我们作的移动适配方案会呈现很大的字体，这不是我们想要的。所以加一个判断，解决页面字体过大的问题。 在 `index.html`的`script`里加入判断页面的语句。 

````
if(htmlWidth&gt;750){htmlWidth=750}//当页面宽度大于750px时，我们就把页面的宽度设置成750像素。
````

### 搜索条的布局（search bar）

利用`van-row`和`van-col`我们快速布局一个搜索条的html骨架出来，代码如下。 

```
<!--search bar layout-->
<div class="search-bar">
    <van-row>
        <van-col span="3">icon</van-col>
        <van-col span="16">serach input</van-col>
        <van-col span="5">button</van-col>
    </van-row>
</div>
样式：
.search-bar{
      height: 2.2rem;
      background-color: #e5017d;
      line-height:2.2rem;
  }
```

*** 2. icon图标的下载 *** 

图标的下载我们依然在iconfont(网址：http://www.iconfont.cn/)进行下载， 找到自己喜欢的图标后，我们新建images文件夹，目录为`src/assets/images`,以后会把所有的项目图片都放到这里。 

*** 3. 正确引入图片 *** 

有很多小伙伴都在引入图片时摘了跟头，有的是开发时引入错误，有的是开发完成后，build时路径不对了。如果用require引入图片，在不作任何配置的情况下就可以基本解决你的图片路径问题。 

````
export default {
    data() {
        return {
            locationIcon: require('../../assets/images/location.png')
        }
    },
}
````

然后通过绑定属性的方法插入图片 

````
<van-col span="3"><img :src="locationIcon" width="100%" /></van-col>
````

*** 4. 写input和button *** 

````
<template>
    <div>
<!--search bar layout-->
<div class="search-bar">
    <van-row gutter="5">
        <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon" /></van-col>
        <van-col span="16">
          <input type="text" class="search-input"/>
        </van-col>
        <van-col span="5"><van-button size="mini">查找</van-button></van-col>
       
    </van-row>
</div>
    </div>
</template>
 
<script>
 
 
export default {
    data() {
        return {
            locationIcon: require('../../assets/images/location.png')
        }
    },
}
</script>
 
<style scoped>
  .search-bar{
      height: 2.2rem;
      background-color: #e5017d;
      line-height:2.2rem;
 
  }
  .search-input{
      width:100%;
      height: 1.3rem;
      border-top:0px;
      border-left:0px;
      border-right:0px;
      border-bottom: 1px solid 1px !important ;
      background-color: #e5017d;
      color:#fff;
  }
  .location-icon{
      padding-top: .2rem;
      padding-left: .3rem;
  }
 
</style>
````

# 第06节：首页轮播图的制作

按照惯例我们在使用Vant组件时需要把组件import进来。在`/src/main.js`下按需引入，代码如下： 

````
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
````

现在我们`/src/main.js`的样子如下: 

````
import { Button, Row, Col ,Search , Swipe , SwipeItem  } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem)
````

首先我们在js部分写入一个data参数`bannerPicArray`，把图片地址放入到里边。 

/src/components/pages/ShoppingMall.vue 

````
data() {
        return {
            locationIcon: require('../../assets/images/location.png'),
            bannerPicArray:[
                {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
                {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
                {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'},
            ]
        }
    },
````

模版文件如下 

````
<!--swipwer area-->
<div class="swiper-area">
    <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
            <img :src="banner.imageUrl" width="100%"/>
        </van-swipe-item>
    </van-swipe>
</div>

CSS:
.swiper-area{
      width:20rem;
      clear:both;
  }
````

这时候你会发现CSS样式并不是我们想要的效果，这主要是用Vant组件，他有一些默认的样式，所以我们要做一些CSS的修复操作。 `overflow: hidden;`,`clear:both;` 

### 利用Vant实现图片轮播的懒加载

引入Vant的图片懒加载组件，以后我们的项目中会有很多远程图片，所以启用图片懒加载是必须的，那正好我们这里第一次开始用远程图片，就在这里学一下图片的懒加载 

````
import { Button, Row, Col ,Search , Swipe , SwipeItem , Lazyload  } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload)
````

然后修改一下我们的template区域，加入`v-lazy="banner.imageUrl"`就可以图片的懒加了。 

### axios的引入

直接使用 `npm install` 进行安装。 

````
npm install --save axios
````

安装之后在要使用的页面组件中进行引入。 import axiso from 'axiso' 

然后在created的声明周期里取得数据 

````
created(){
    axios({
        url: 'https://www.easy-mock.com/mock/5ae2427800247c2aa1efe442/SmileVue/',
        method: 'get',
    })
    .then(response =&gt; {
        console.log(response)
    })
    .catch((error) =&gt; {     
    })
}
````

# 第09节：商品推荐vue-awesome-swiper

这节会讲解首页商品推荐区域的布局和vue-awesome-swiper的使用，作一个可以左右滑动的商品推荐区域出来。学完这节课你将对vue-awesome-swiper有个很好的了解，并能轻松使用在项目和工作中。 

我们先把基本的布局做好，在`src/components/pages/ShoppingMall.vue`，里编写如下html和CSS代码，这里只是简单的布局。 

````
<!--Recommend goods area-->
<div class="recommend-area">
    <div class="recommend-title">
        商品推荐
    </div>
    <div class="recommend-body">
        
    </div>
</div>

<style>
.recommend-area{
       background-color: #fff;
       margin-top: .3rem;
  }
  .recommend-title{
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
  }
</style>
````

### 安装 vue-awesome-swiper

````
github地址：https://github.com/surmon-china/vue-awesome-swiper
npm install vue-awesome-swiper --save
````

### 引入 vue-awesome-swiper 的两种方式

- 全局引入

可以直接使用全局引入，引入代码如下： 

````
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
 
// require styles
import 'swiper/dist/css/swiper.css'
 
Vue.use(VueAwesomeSwiper, /* { default global options } */)
````

- 以组件形式引入

这种方式是在需要的页面以`component` 的形式引入，好处就是依赖性不强。 

````
import 'swiper/dist/css/swiper.css'
 
import { swiper, swiperSlide } from 'vue-awesome-swiper'
 
export default {
  components: {
    swiper,
    swiperSlide
  }
}
````

### 获取推荐商品数据

在`javascript`部分的data里加入`recommendGoods:[]`属性，然后在`created`生命周期里获得. 

### 一个最简单的轮播图组件

我们这里作一个单独的组件，这样不会污染项目中的文件，这个只是一个最简单默认的swiper，我们在components目录下新建一个文件夹`swiper`，然后新建一个`swiperDefault.vue`文件。写入如下代码: 

````
<template>
  <div >
      <swiper>
        <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
           Slide {{item}} 
        </swiper-slide>
      </swiper>
  </div>
</template>
 
<script>
    import 'swiper/dist/css/swiper.css' 
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                slide: [1,2,3,4,5,6]
            }
        },
        components:{swiper,swiperSlide}
    }
</script>
 
<style scoped>
  .swiper-slide{
      height: 4rem;
      text-align: center;
      padding-top: 3rem;
      border-bottom: 1px solid #ccc;
  }
</style>
````

代码写好后，在`shoppingMall.vue`文件里进行引入使用。 import swiperDefault from '../swiper/swiperDefault' 

然后注册组件,其实上节课的代码也是可以封装成一个component的。 

````
components:{swiper,swiperSlide,swiperDefault},
````

注册好后，直接在`template`里使用就可以了. 

````
<swiperDefault></swiperDefault>
````

### 添加分页器

作这类轮播图效果，现在主流的都是添加上分页器的，就是下方的小圆点，配置这些就需要在`swiper`标签上使用options属性来进行配置了。 

````
swiperOption:{
    pagination:{
        el:'.swiper-pagination'
    }
}
````

然后在`template`标签里加入一个`div`用于显示分页器,注意的是要在`swiper-slide`外层。 

````
<div class="swiper-pagination" slot="pagination"></div>
````

最后是在`swiper`标签里加入 `:options="swiperOption"`。就实现了有分页期的效果。 整体代码如下： 

````
<template>
  <div >
      <swiper :options="swiperOption">
        <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
           Slide {{item}} 
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>
 
<script>
    import 'swiper/dist/css/swiper.css' 
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                slide: [1,2,3,4,5,6],
                swiperOption:{
                    pagination:{
                        el:'.swiper-pagination'
                    }
                }
            }
        },
        components:{swiper,swiperSlide}
    }
</script>
 
<style scoped>
  .swiper-slide{
      height: 4rem;
      text-align: center;
      padding-top: 3rem;
      border-bottom: 1px solid #ccc;
  }
</style>
````

### 竖屏切换效果

在配置项里直接配置`direction`就可以了，配置竖屏代码如下。 

````
swiperOption:{
    direction:'vertical',
    pagination:{
        el:'.swiper-pagination'
    }
}
````

````
<template>
  <div >
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
           Slide {{item}} 
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>
 
<script>
    import 'swiper/dist/css/swiper.css' 
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                slide: [1,2,3,4,5,6],
                swiperOption:{
                    direction:'vertical',
                    pagination:{
                        el:'.swiper-pagination'
                    }
                }
            }
        },
        components:{swiper,swiperSlide}
    }
</script>
 
<style scoped>
  .swiper-slide{
      height: 4rem;
      text-align: center;
      line-height: 4rem;
  }
  .swiper{
      height: 7rem;
      border-top:1px solid #ccc;
      border-bottom:1px solid #ccc;
  }
</style>
````

# 第11节：vue-awesome-swiper 详讲2

### 区域滚动效果

在移动布局里，在大段文章的下拉上拉时，有些老旧手机会有卡顿效果。都需要我们自己加入上划下拉的组件，这里就可以直接使用`vue-awesome-swiper`来解决。我们作一个组件，里边有一大段文字，然后给文字加入顺畅的下拉上拉效果。 

````
<template>
  <div >
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide class="text">
            <div class="centent">
               一大堆文章.........
            </div>
        </swiper-slide>
        
      </swiper>
  </div>
</template>
 
<script>
    import 'swiper/dist/css/swiper.css' 
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                swiperOption:{
                    direction:'vertical',
                    slidesPerView: 'auto',
                    freeMode:true,
                    mousewheel:true
                }
            }
        },
        components:{swiper,swiperSlide}
    }
</script>
 
<style scoped>
  .swiper{
      height: 300px;
      overflow: hidden;
  }
  .text{
      font-size: 18px !important;
      text-align: left;
      padding:30px;
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
   
  }
</style>
````

重点看一下options的加入属性： 

+ direction：’vertical’设置竖排显示 
+ slidesPerView:’auto’ 设置同屏显示的数量，默认为1，这里使用`auto`是随意的意思。 
+ freeMode:true 默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。 
+ mousewheel:true 开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。 

### 让分页器可以自由选择

在实际工作当中分页器都是可以自由选择的，只要配置一下Options的`clickable`数据就可以了。注意这个属性要配置在`pagination`下面，才能起作用。 

````
pagination:{
    el:'.swiper-pagination',
    clickable:true
}
````

# 第12节：首页楼层区域布局

# 第15节：Filter在实战中的使用

### 编写过滤器通用方法

因为过滤器都是需要在很多组建中进行使用的，所以要编写一个比较通用的方法。先在`src`文件夹下建立一个`filter`文件夹，然后在filter文件夹下建立一个`moneyFilter.js`文件。 这时候有可以编写格式化钱的方法，其实很简单，我们这里用了toFixed()方法。 

````
export function toMoney(money){
 
    let newMoney = money;
    if(newMoney){
        newMoney = newMoney.toFixed(2)
    }else{
        newMoney=0
        newMoney=newMoney.toFixed(2)
    }
    return newMoney
 
}
````

### 引入Filter

````
import {toMoney} from '@/filter/moneyFilter.js'
注意这里的@代表的是src目录的意思，这个是webpack的配置，我们可以在/build/webpack.base.conf.js里找到这个配置项。
````

### 编写vue里的filter属性

vue是支持fitler属性的，之前只是方法，现在要在vue文件里编写属性。 

````
filters:{
    moneyFilter(money){
        return toMoney(money)
    }  
},
````

这里需要注意的是你fitler的名字可以随便起，但是你用的toMoney方法，要和你上边引入的一样。 

### 在template中使用filter

直接在使用价格的地方使用`{{item.price | moneyFilter}}`就可以了。 

### 优化我们的filter通用方法

```
export function toMoney(money = 0){
    return money.toFixed(2)
}
```

# 第16节：首页热卖模块的Van-list组件使用