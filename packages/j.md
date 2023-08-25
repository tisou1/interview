
- 可视化建模
    - 底层使用aiflow - zrender作为canvas渲染引擎
- 所有模块基本都是以列表页, 详情页, 创建页组成
- class写法向函数写法过渡


- 列表页, 使用布局组件作为壳子,列表的渲染使用antd为基础,做一层业务封装,支持定时刷新,手动刷新接口,以及过滤和筛选. 整个列表以json对象的形式配置,
- 创建页,简单表单联动, 通过配置的表单项唯一name,引用起值做简单判断, 复杂的联动,还是需要抛出事件处理函数或者做react state的存储,方便多表单联动
- redux的action使用,和一些接口做合并
``` xx.js  action文件

// 需要存储store的接口
export function getExperimentV2List(param) {
    return async dispatch => {
        const page = await request.bdlPost(method.experimentV2List, param);
        dispatch && dispatch({
            type: EXPERIMENTV2_LIST,
            experimentList: page.result
        });
        return page;
    };
}


// 不需要存储store的接口
export function getExperimentV2Detail(param) {
    return () => request.bdlPost(method.experimentV2Detail, param);
}

```

路由以模块进行文件划分

- modules (模块组件)
    - 模块1
    - 模块2
    - 模块3
- containers (路由配置和store注入)
    - 与模块1对应的路由
    - 与模块2对应的路由
    - 与模块3对应的路由
然后在router中绑定action和store,使用的是class写法中的mapStateToProps
和mapDispatchToProps

action.increase = function (info) {
  return {
     {
        type:'INCREASE'，
        info
     }
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increase: (...args) => dispatch(actions.increase(...args)),
    decrease: (...args) => dispatch(actions.decrease(...args))
  }
}

//  使用bindActionCreators和上面的结果一致,返回一个可以直接调用的函数,而这个函数经过bindActionCreators封装,会在内部dispatch一个action

const mapDispatchToProps = { } = (dispatch, ownProps) => {
  return bindActionCreators({
    increase: action.increase,
    decrease: action.decrease
  }, dispatch);
}

/* 返回跟上面一样的object */
{
   increase: (...args) => dispatch(action.increase(...args)),
   decrease: (...args) => dispatch(action.decrease(...args)),
}


在绑定时,使用了react-redux提供的connect高阶组件,但是如果要再注入router的信息(history location…), 需要使用
`export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebookList));
`
如果只有connect包裹,想要注入ref的话,就要传入第四个参数
`export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(TextCreate));
`



- 接口请求封装(直接将)
   const {data: workflowData = {}} = useFetch(
        getExperimentList,
        {type: 'workflow', projectId, ...DEFAULT_QUERY, ...params}
    );


        bmlWebRequest
            .post(api.trainJobRunDetail, {
                ...params
            })
            .then(res => {
            	// …
            })
            .catch(e => {
                throw new Error('error');
            });


还有将方法名传入到form中的



我涉及的模块
	- 作业建模重构
	- 工作流重构
	- 可视化建模新功能添加

搜索和过滤联合使用,同时搜索支持高亮关键词
可视化画布运行时,依据上下游的图标颜色来设置edge的渐变色
可视化画布的快捷键添加 使用mousetrap库
可拖拽的左右布局, 有点类似vscode的侧边栏和编辑区的拖拽

国际化方案i18next, 涉及到ast()
