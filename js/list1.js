



$(function () {

  let list = null

  const list_info = {
    cat_one: 'all',
    sort_method: '默认',
    sort_type:'ASC',
    current:1,
    pagesize:15
    
  } 


// 渲染分类列表
  getCatOne()

  async function getCatOne() {
    const cat_one_list = await $.get('./server/getCateOne.php',null, null, 'json')

    let str = ` <li data-type="all">CHUCK 70<img src=""></li>
    
    `
    
    cat_one_list.list.forEach(item => {
      str +=`<li data-type="${ item.cat_one_id }">${ item.cat_one_id}</li>

      `

    })
    $('.screen_2').html(str)
  }


  getTotalPage()
  async function getTotalPage() {
    // 2-1. 请求分页数据
    const totalInfo = await $.get('./server/getTotalPage.php', list_info, null, 'json')

    // 2-2. 渲染分页内容
    // jquery-pagination 插件
    $('.pagination').pagination({
      pageCount: totalInfo.total,
      callback (index) {
        list_info.current = index.getCurrent()
        // 从新请求商品列表
        getGoodsList()
      }
    })
  }



  getGoodsList()
  async function getGoodsList() {
    const goodsList = await $.get('./server/getGoodsList.php', list_info, null, 'json')

    list = goodsList.list
    
    let str = ''
    goodsList.list.forEach(item => {
      str += `
      <dl>
      <dt><a href="javascript:;"><img src="${ item.goods_big_logo }"></a></dt>
      <dd class="p_name" data-id="${ item.goods_id}"><a href="javascript:;">${ item.goods_name}</a></dd>
      <dd class="p_b">¥${ item.goods_price}</dd>
      <dd class="p_c">¥${ item.goods_price}</dd>

      <a href="javascript:;" class="btn btn-danger addCart" role="button" data-id="${ item.goods_id }">加入购物车</a>
              <a href="./cart.html" class="btn btn-warning" role="button">去结算</a>
    </dl>
      `
      $('.commodity').html(str)
    })

  }

  $('.screen_2').on('click', 'li', function () {

    $(this).addClass('active').siblings().removeClass('active')
    
    const type = $(this).data('type')

    list_info.current = 1
    list_info.cat_one = type
    getTotalPage()
    getGoodsList()

  })

  $('.sort-list').on('click','a',function () {
    const method = $(this).attr('data-method')
    const type = $(this).attr('data-type')
    
    list_info.sort_method = method
    list_info.sort_type = type

    getTotalPage()
    getGoodsList()

    $(this)
    .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
    .siblings()
    .attr('data-type', 'ASC')
  })

  $('.clearfix').on('click', '.addCart', function () {
    // 4-2. 拿到 localStorage 里面有没有数组
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []
  
    // 多一个拿到 id 的操作
    const id = $(this).data('id')
  
    // 4-3. 判断一下 cart 数组里面有没有这个数据
    const flag = cart.some(item => item.goods_id == id)
    if (flag) {
      // 4-4. 如果有这个数据拿到这个信息
      const cart_goods = cart.filter(item => item.goods_id == id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + 1
    } else {
      // 拿到当前商品 id 所属的信息
      const info = list.filter(item => item.goods_id == id)[0]
      info.cart_number = 1
      cart.push(info)
    }
  
    // 4-5. 添加完毕还要存储到 localStorage 里面
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })
})

$('.commodity').on('click', '.p_name', function () {
  // 9-2. 拿到 标签身上记录的商品 id
  const id = $(this).data('id')
  // 9-3. 把这个 id 存储到 cookie 中
  setCookie('goods_id', id)
  // 9-4. 进行页面跳转
  window.location.href = './detail.html'
})

// 树状菜单
$('.screen_1>ul>li').click(function () {
  $(this).toggleClass('active').siblings().removeClass('active')

  $(this)
  .find('ol')
  .stop()
  .slideToggle(500)
  .parent()
  .siblings()
  .find('ol')
  .slideUp(500)
})
$('.screen_1>ul>li>ol>li').click(e => e.stopPropagation())
$('.screen_1>ul>li>ol').click(e => e.stopPropagation())

$('.sort-list').on('click','a',function () {

  $(this).addClass('active').siblings().removeClass('active')

})

/* 搜索引擎 */

const ul = document.querySelector('.ul-1')
console.log(ul)


    // 1. 给 文本框 绑定给一个 input 事件
    const inp = document.querySelector('.keywords')
    console.log(inp)
    inp.addEventListener('input', function () {

      // 2. 拿到文本框输入的内容
      // trim() 去除首位空格
      const value = this.value.trim()
      if (!value) return

      // 3. 准备发送请求
      // 动态创建 script 标签
      const script = document.createElement('script')
      // 准备一个请求地址
      // wd 这个参数要换成我文本框里面输入的内容
      const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
      script.src = url
      // 把 script 标签插入到页面里面
      document.body.appendChild(script)
      // 当 script 标签插入到页面里面的时候, 等到响应回来
      // 就会调用 bindHtml 的方法
      // 我需要提前准备
      // 函数写在全局, 还是写在这个事件里面 ?
      //   全局: 必须写在全局
      //   因为你相当于在页面里面多加了一个 script 标签
      //   script 标签里面的内容就是 bindHtml(xxx)
      // 使用 script 标签的目的是为了把请求发送出去
      // 当 script 标签插入到页面里面的挥手, 请求已经发送出去了
      // 此时, script 标签已经没有用了
      script.remove()
    })

    // 全局准备一个 jsonp 的处理函数
    function bindHtml(res) {
      // console.log(res)
      /*
        res 是人家服务器给我们返回的数据, 是一个对象数据类型
        {
          g: 是应该显示的列表数组,
          p: false,
          q: 'ai',
          queryid: 'xxxx'
        }
        循环遍历就应该遍历 res.g

        res.g 是一个列表数组
        [
          { type: 'sug', sa: 's_1', q: 'ai1' },
          { type: 'sug', sa: 's_1', q: 'ai2' },
          { type: 'sug', sa: 's_1', q: 'ai3' },
          { type: 'sug', sa: 's_1', q: 'ai4' },
          { type: 'sug', sa: 's_1', q: 'ai5' },
        ]

        res.g[0] 得到的就是一个对象数据类型 { type: 'sug', sa: 's_1', q: 'ai1' }
        拿到里面的 q 成员
        res.g[0].q
        res.g[1].q
        在循环内
        res.g[i].q
      */

      // 没有 g 这个数据, 就不渲染页面了
      if (!res.g) {
        ul.classList.remove('active')
        return
      }

      // 代码来到这里, 表示有 g 这个数据, 渲染页面
      let str = ''

      for (let i = 0; i < res.g.length; i++) {
        str += `
          <li>${ res.g[i].q }</li>
        `
      }

      ul.innerHTML = str
      // 让 ul 显示出来
      ul.classList.add('active')
    }