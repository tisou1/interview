



#### 1. 强缓存和协商缓存

**强缓存**

> 设置强缓存后,前端第一次请求到资源会把资源缓存到客户端,如果下次请求时资源没有过期,那么直接调用本地缓存缓存的资源,如果过期则重新发送请求

- 强缓存由服务器开启, 利用`http头`中的`Expires`和`Cache-Control`两个字段控制
- 客户端设置值请求头`Cache-control`
- 强缓存返回状态码为200
- post请求不能设置缓存,只有get有效

`Expires`: 响应头中的过期时间, 浏览器再次加载资源时,如果在这个时间内,则命中强缓存(http1.0产物)
`expires: Thu, 03 Jan 2019 11:43:04 GMT`
他是一个时间戳,当客户端再次请求资源时,会将客户端时间和该时间戳进行比对,

**协商缓存**

> 第一次请求资源时,服务器会返回资源以及资源标识,当下次请求时,会对比资源标识,如果一致,则只返回状态码304,不用返回资源,如果不一致,则会返回资源和新的资源标识.协商缓存主要是依赖响应头包括`last-modified`和`ETag`

- 协商缓存需要与服务器交互
- 请求命中协商缓存后,返回的状态码为`304`

`last-modified`: 记录资源最后修改的时间,
🔥 只要编辑了, 不管内容是否真的有改变, 都会以这最后修改的时间作为判断依据, 当成新资源返回, 从而导致了没必要的请求相应, 而这正是缓存本来的作用即避免没必要的请求
🔥 时间的精确度只能到秒, 如果在一秒内的修改是检测不到更新的, 仍会告知浏览器使用旧的缓存


`ETag` 的出现就是为了解决last-modified的上述问题。ETag会基于资源的内容编码生成一串唯一的标识字符串, 只要内容不同, 就会生成不同的ETag。启动ETag之后, 请求资源后的响应返回会增加一个ETag字段, 如下: