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
