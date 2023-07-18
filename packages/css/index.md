# css

##

### 1.css页面导入样式试的link和@import区别
- link是标签,@import是css语法
- link是结构和样式同事加载的,@import是先加载结构,在加载样式
- link没有兼容问题, @import不兼容ie5以下
- link由于是标签,所以可以用js动态添加在页面结构中,而@import不能


### 2.src和href的区别
- src用指定的资源替换当前元素
- href用来建立当前文档和引用资源之间的联系

`src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置`  

`href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接`


### 3. 解决垂直边距重合问题

#### 3.1 父子关系的边距重合
父子关系时,如果元素设置了外边距,而父元素没有开启`BFC`的话, 父元素也会产生外边距  
**解决方式**:给父元素设置`overflow: hidden`,给父元素开启了`BFC`,不会随子元素产生外边距.

```js

 <style>
    .main{
      width: 500px;
      background-color: gray;
    //   overflow:hidden;  开启BFC解决外边距重合
    }
    .main >div{
      width: 100px;
      height: 100px;
      background-color: aquamarine;
      margin-top: 20px;
    }


  <div class="main">
    <div>1</div>
  </div>
```

#### 3.2 同级兄弟关系的重合
同级元素在垂直方向会产生边距重合,边距大小取决于最大的那个, margin-bottom和margin-top重叠  
[参考](https://juejin.cn/post/6844903497045917710)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .main{
      width: 500px;
      background-color: gray;
      overflow: hidden;
    }

    .main >div{
      width: 100px;
      height: 100px;
      background-color: aquamarine;
      margin-bottom: 20px;
    }
    .main >div.div-2{
      background-color: red;
      margin-top: 50px;
      padding: 12px;
      float: left;
    }
  </style>
</head>
<body>
  
  <script src="tree-array.js"></script>

  <div class="main">
    <div class="div-1">1</div>
    <div class="div-2">1</div>
  </div>
</body>
</html>

```


[参考](https://blog.csdn.net/qq_54753561/article/details/124240903?spm=1001.2014.3001.5502)



### 4. css权重
!import > 内联样式 > id > 类名|属性|伪类 > 标签 > 全局  

无穷大∞>1000>100>10>1>0



### 5. 响应式布局方案

1. 弹性盒子布局, display: flex
2. rem布局  --  (回头可以整一个demo测试一下)
3. 媒体查询(以前用过)
4. vh + vw



### 6. css盒模型
页面中每一个元素都可以被看成一个盒子,盒子是由外边距(margin), 边框(border), 内边距(padding), 内容(content)组成  

有两种盒模型
- 标准盒模型 box-sizing: context-box;  
给盒子设置的width时, 最终元素展示的width = border + padding + content
- 怪异盒模型 box-sizing: border-box;
给盒子设置的width时, 最终元素展示的的宽度就是设置的. 但是其content会变化, 也就是说要减去padding和border


### 7. 伪类和伪元素
1. 单冒号的(:hover)为伪类  div:hover
2. 双冒号的(::befor)为伪元素  div::before

一句话是伪元素产生新对象，在DOM树中看不到（审查元素的时候可以看到），但是可以操作；伪类不产生新的对象，仅是DOM中一个元素的不同状态；


### 8. 重绘与回流
- 重绘
  当渲染书中更新dom的属性,而不影响dom布局的,只会改变外观,风格等成为重绘

- 回流
  元素的尺寸大小,布局,可见性等发生变化而引起的就是回流

重绘是指更新元素的样式，而重排是指重新计算元素的位置和大小。

回流必发生重绘, 重绘不一定发生回流.

### 9. 浏览器是如何渲染页面的
1. 浏览器将获得的HTML解析成DOM树
2. 处理css,构建CSSOM树(css对象模型)
3. 将DOM和CSSOM树合并成渲染树(render tree), 渲染树只包含需要显示的内容
4. 布局和绘制,浏览器根据渲染树,进行布局和绘制,确定每个元素在文档中的位置和样式,将其绘制在屏幕上
5. 页面重绘和重排(回流),如果页面发生变化，浏览器会进行重绘（Repaint）和重排（Reflow）。重绘是指更新元素的样式，而重排是指重新计算元素的位置和大小。
6. 最终呈现页面。经过布局和绘制后，浏览器将页面内容呈现给用户。

