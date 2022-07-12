# Vue Tutorial & CBR Jobs

This tutorial includes many Vue basic knowledge points
This Demo includes code for Vue Router, Fetch, Mount Hook, v-for, v-if, v-else, props, etc.
![image](https://user-images.githubusercontent.com/68500948/178519179-e087c9c2-cd8b-4d11-a0da-0e4d0eb506db.png)

## Vue 常用命令
安装Vue脚手架（Cli）
```
npm install -g @vue/cli
```

创建新项目
```
vue create <project-name>
```

启动Dev Server
```
npm run serve
```

启动Json-Server
```
npx json-server --watch data/db.json
```

## 几个重要Vue板块

### data
data板块用于存储数据，下例中，我们在.env设置Endpoint路径并且在data中定义。
```
data() {
    return {
      BASE_URL: process.env.VUE_APP_BASEURL,
      jobs: [],
    }
  },
```

### props
props板块用于接受参数，包括通过标签传进来的或者通过route参数传进来的。
Case1: 通过标签作为参数传入，下例中，:reactionTime作为绑定参数传入ResultVue componenet
```
<ResultsVue v-if="showResults" :reactionTime="score"></ResultsVue>
```

Case2：作为Route参数传入，下例中，传入名为'id'的参数
```
<router-link :to="{ name: 'jobDetails', params: { id: job.id } }">
    <h2>{{ job.title }}</h2>
</router-link>
```

这种方法传参需要在router的index.js enable，如下例 props: true
```
{
    path: "/jobs/:id",
    name: "jobDetails",
    component: JobDetails,
    props: true, // can accept route parameter as props
  },
```

### methods
methods定义函数

### computed
computed定义函数，用已有的内容计算一个新值return

### name
name是名称

### hooks
https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram
根据不同的Lifecycle有不同的钩子，最常用的有mounted()，updated()，unmounted()三个。mounted()最适合作为initialization获取数据。

mounted()例子：
```
mounted() {
    fetch(this.BASE_URL + "/jobs").then(res => res.json()).then(data => this.jobs = data).catch(err => console.log(err.message))
  }
```

## 定义全局变量

在根目录创建.env文件，变量命名方式为VUE_APPxxx，例如
```
VUE_APP_BASEURL = "http://localhost:3000"
```
获取：
```
BASE_URL: process.env.VUE_APP_BASEURL
```

## 标签+vue, etc.

### 动态显示data
```
{{ <data_name> }}
```
### v-on: or @和其它事件
@是v-on:缩写，多用于和Button绑定创建点击事件绑定函数。例如：（请注意，下例使用了名为'isPlaying'的variable绑定于按钮的diabled属性）
```
<button @click="start" :disabled="isPlaying">play</button>
```
如果想要点击事件只作用于父元素而不包含任何子元素，使用"@click.self"。

还可以trigger其它键盘属性，如下例中，按下alt+某键起来就会触发名为'addSkill'的函数。函数第一个参数默认为e（也就是event）
```
<input type="text" v-model="tempSkill" @keyup.alt="addSkill">
```
函数示例：
```
addSkill(e) {
    if (e.key === ',' && this.tempSkill) {
        if (!this.skills.includes(this.tempSkill))
            {
                this.skills.push(this.tempSkill)
            }
        this.tempSkill = ''
    }
}
```


### v-if和v-show
都可以实现隐藏元素的效果，但是v-if是动态添加/移除，v-show仅仅改变元素为隐形，仍存在于dom中
```
<div class="block" v-if="showBlock" @click="stopTimer">
    click me
</div>
```
v-if后可以跟随同等级v-else标签，在if为false的时候显示

### v-bind和v-model
v-model基于表单数据实行双向绑定，而v-bind可作用于表单外。
示例：
```
<input type="email" required v-model="email"/>
```
下例中名为'role'的variable会获得选择中value的值，同时可以指定'role'初始值，这样select会自动初始选中那个option
```
<select v-model="role">
    <option value="developer">Web Developer</option>
    <option value="designer">Web Designer</option>
    <option value="janitor">Janitor</option>
</select>
```
除了上面的例子外，v-model绑定单个checkbox会为boolean；绑定多个checkbox需要用array承接，会把选中的checkbox的value添加到array

### 动态Class
语法是:class="{ <class_name> : <boolean expression> }"
例如
```
<div :class="{ sale: theme === 'sale' }" /> 
```

## 设置路由

### 普通路由注册
需要在index.js先import，然后如下例进行使用。
```
{
    path: "/",
    name: "home",
    component: HomeView,
}
```

### 某个路径（a）重定向到别的地方（b）
下例中，把/all-jobs路径重定向到/jobs
```
// redirect
  {
    path: "/all-jobs",
    redirect: "/jobs",
  }
```

### 把针对没有出现路由的访问重定向到404界面
```
// catchall 404
  {
    path: "/:catchAll(.*)", // regex, catch all that does not match any of the above
    name: "Not Found",
    component: NotFound,
  }
```

### 详情页通过路由id访问
下例中，我们通过jobs/id（绑定id）的形式来访问job detail，例如jobs/1
```
{
    path: "/jobs/:id",
    name: "jobDetails",
    component: JobDetails,
    props: true, // can accept route parameter as props
}

<router-link :to="{ name: 'jobDetails', params: { id: job.id } }">
    <h2>{{ job.title }}</h2>
</router-link>
```
我们在上文写到过，我们需要通过props来接受id参数
```
props: ['id']
```

### router-link
如果使用to，那么放上path，如果用:to，那么请给予name，有时还需要params（如上例）
```
<router-link to="/">Home</router-link> |
<router-link to="/about">About</router-link>
<router-link :to="{ name: 'jobs'}">Jobs</router-link>
```

### 发生改变的视图
router-view，一般被放在App.vue中
```
<router-view></router-view>
```

## 传参&传函数

### 传参
父元素放置子标签时使用':<var_name>'，下例中，传入名为'delay'的参数，参数var是父元素data中名为'delay'的那个（因为使用了:进行绑定）
```
<BlockVue :delay="delay" v-if="isPlaying" @endTimer="endGame"></BlockVue>
```
子元素在props中接收参数
```
props: ['delay']
```

### 传回调函数，使用@<function>和this.$emit
还是上面的BlockVue例子，在BlockVue中定义下面的函数，则下面函数执行时通过this.$emit调用父元素名为"endGame"的函数，并且将子元素"reactionTime"变量作为父元素"endGame"函数第一个param。简而言之，通过this.$emit调用父元素的一个函数。
```
stopTimer() {
    clearInterval(this.timer)
    this.$emit('endTimer', this.reactionTime)
}
```

## Style Scope
在<style>定义的类和标签样式会被作用于全局，想要局限于组件则使用
```
<style scoped></style> 
```
## Slot 模板

子元素定义<slot>标签，在父元素使用子元素标签开合内（例如<ModalVue></ModalVue>中）传入<template>来填充对应的<slot>标签
下例中父元素传进去的<p></p>会被填充于子元素默认的<slot>，传入的name=links的slot会被填充于v-slot:links

```
<slot>
    xxx <!-- This only show when no default slot is passed in-->
</slot>
<div class="actions">
    <slot name="links"></slot>
</div>
```
```
<ModalVue :header="header" :text="text" @close="toggleModal" theme="sale">
    <template v-slot:links>
        <a href="#" class="href">sign up now</a>
        <a href="#" class="href">more info</a>
    </template>
    <p>Test slots</p>
</ModalVue>
```

## teleport
<teleport>标签将里面的元素渲染到不同于id="app"的div中，如下例会将<a>标签渲染到id为modals的div中（这些div需要在index.html中出现）
```
<teleport to="#modals" v-if="showModal">
    <a href="https://google.com>Google</a>
</teleport>
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
