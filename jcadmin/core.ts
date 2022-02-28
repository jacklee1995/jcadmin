import { App, Component } from "vue";
import { NavigationGuard, RouteRecordRaw } from "vue-router";
import {iframeStore} from './store'

import HeaderLogo from './views/components/HeaderLogo.vue'

declare type Lazy<T> = () => Promise<T>;
declare type VueComponent = Component | Lazy<Component>;

declare type AdminPageType = 'component'|'iframe';
declare type AdminRouterRecordRaw = { 
  title:string, 
  useTitle?:string, 
  path:string, 
  type?:AdminPageType, 
  value?:string|VueComponent, 
  // transition?:string 
  animate?:{
    enter:string,
    leave:string
  },
  beforeEnter?: NavigationGuard | NavigationGuard[],
  icon?:string | {value:string,color:string},
};

export class AdminRouter{
  private _urls:RouteRecordRaw[] = [];
  private _adminPath = '/admin';
  private _sideBardatas;
  private _adminLoginUrl = '/login';        // 登陆页面地址
  private _loginEmbeddedAdmin = true;       // 登陆页面嵌入在 Admin 页面外壳内，如果使用此项，登陆页面地址会自动成为 /admin/login
  // private _iframDict:any;
  private _spage404Component: VueComponent = ()=>import('./exceptions/Page404View.vue');
  private _beginningComponent: VueComponent = ()=>import('./views/BeginningPage.vue');
  private _headerLogo: Component;
  constructor(urls: AdminRouterRecordRaw[]){
    this._sideBardatas = urls;
    const iframe_dict = iframeStore()
    for(const r of urls){
      if(r.type==="iframe"){
        iframe_dict.setRecord(this._adminPath + '/:page'+ '/' + r.path, r.value)
      }
    }
    
    this._headerLogo = HeaderLogo;

    // this.addUrlRecord({
    //   path:'beginning',
    //   title:'Beginning',
    //   type:'component',
    //   value:()=>import('./views/BeginningPage.vue')
    // })

    for(const url of urls){
        this.addUrlRecord(url)
      }
  }

  /**添加一条记录 */
  addUrlRecord(url:AdminRouterRecordRaw):void{
    const record:RouteRecordRaw = {path:url['path'],component:{},beforeEnter:[]}
    
    // 只有定义了 type 属性的才有路由视图
    if(url.type){
      // 依据类型添加
      if(url.type === 'component'){record.component = url['value'] as VueComponent}
      // iframe 页面
      else if(url.type === 'iframe'){
        record.component = ()=>import('./views/IframeView.vue');
        record.props = {url: url['value'], nodeId:url ['path']}
      }
      // 无法直接嵌入的页面暂时需要跳转
      else if(url.type === 'redirect'){
        record.component = ()=>import('./views/RedirectView.vue');
        record.props = {url: url['value']}
      }
      // pdf 阅读页面 - 待实现
      else if(url.type === 'pdf'){record.component = ()=>import('./views/PdfViewerView.vue');}

      // 多图片阅读页 - 待实现
      else if(url.type === 'images'){
        this._urls.push({path:url['path'], component: ()=>import('./views/IframeView.vue'), })
      }

      // 文件资源管理页 - 待实现
      else if(url.type === 'files'){
        this._urls.push({path:url['path'], component: ()=>import('./views/IframeView.vue'), })
      }
      else{console.warn('路由错误:',url);}

      // 添加路由守卫
      if(url.beforeEnter){
        if(url.beforeEnter instanceof Array){
          for(const i of url.beforeEnter){
            (record as any).beforeEnter.push(i)
          }
        }
        else if(url.beforeEnter instanceof Function){
          (record as any).beforeEnter.push(url.beforeEnter)
        }
      }

      // 配置目录标题
      if(url.useTitle){
        (record as any).beforeEnter.push(
          ()=>{document.title = url.useTitle as string}
        )
      }
      else{
        (record as any).beforeEnter.push(
          ()=>{document.title = url.title as string}
        )
      }

      // 完成新增路由
      this._urls.push(record)
    }
  }

  /**404页面所使用的组件 */
  set page404Component(component: VueComponent){
    this._spage404Component = component;
  }

  /**初始页面所使用的组件 */
  set pageBeginningComponent(component: VueComponent){
    this._beginningComponent = component;
  }

  /**头部 Logo 位置使用的组件 */
  set headerLogoComponent(component: Component){
    this._headerLogo = component;
  }

  /**完成配置后 JCAdmin 提供的路由表 */
  get urls():RouteRecordRaw[]{
    return [
      { 
        path:this._adminPath, 
        redirect: this._adminPath + '/:page/beginning', 
        name:'BeginningPage'
      },
      {
        path: this._adminPath + '/:page',
        component: ()=>import('./views/AdminView.vue'),
        name: 'AdminBasement',
        children: [
          ...this._urls,
          {
            path: 'beginning',
            name: 'Beginning',
            component: this._beginningComponent,
          },
          { 
            path: ':pathMatch(.*)*',
            component:this._spage404Component,
            name: 'NotFound',
          }
        ],
        props: {
          adminPath:this._adminPath,
          urlPatterns:this._sideBardatas,
          LogoBox:this._headerLogo
        }
      },
    ]
  }
}

// export const Admin = {
//   install:(app: App<Element>)=>{
//     app
//   }
// }