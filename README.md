# CBR Jobs

This Demo includes code for Vue Router, Fetch, Mount Hook, v-for, v-if, v-else, props, etc.
![image](https://user-images.githubusercontent.com/68500948/178519179-e087c9c2-cd8b-4d11-a0da-0e4d0eb506db.png)

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


### v-if



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
