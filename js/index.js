// const { mouseover } = require("dom7")

var input = document.querySelector('.inputstyle')
var maxkey = document.querySelector('.maxkey')
document.body.onclick=function(){maxkey.style.display="none"}
console.log(maxkey)
input.onclick = function(e){
  e = e||window.event
  e.stopPropagation()
  maxkey.style.display="block"}
  
  
  $('lv1 > a').hover(function(){
    $(this).previousSibling().css({'display':'flex'})
    console.log(1111)
  })

/* 轮播图 */
        
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    direction : 'horizontal',
    speed:300,
    autoplay:{
      delay:3000
    },
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })




/* 显示头部二级菜单 */
var son = document.querySelectorAll('.lv1 > a')
var won = document.querySelectorAll('.lv1 > i')

for(var i = 0; i < son.length; i++){
  son[i].addEventListener("mouseover",function(e){
    e = e || window.event
    target = e.target || e.srcElement
    if(target.nodeName==='A'){
      target.previousElementSibling.style.display='block'
    }
  })

  son[i].addEventListener("mouseout",function(e){
    e = e || window.event
    target = e.target || e.srcElement
    if(target.nodeName==='A'){
      target.previousElementSibling.style.display='none'
    }
  })
}

/* 导航栏定位 */
// function fixTop($hdMenBox,top){
//   var $windows = $(window);
//   var offset = $hdMenBox.offset();
//   if(window.XMLHttpRequest){
//     $hdMenBox.css({
//       position:'fixed'
//     });
//   }else{
//     $hdMenBox.css({
//       position:'absolute'
//     });
//   }
//   if($window.scrollTop() >=offset.top){
//     $hdMenBox.css({
//       top:$window.scrollTop(),
//     });
//   }else{
//     $hdMenBox.css({
//       top:0,
//     });
//   }
// }


// var tit = document.getElementById("bingav");
// console.log(tit)
// var titleTop = tit.offsetHeight;

// document.onscroll = function(){
//   var btop = document.body.scrollTop||document.documentElement.scrollTop;
//   if(btop > titleTop) {
//     tit.style.position='fixed';
    
//   }else{
//     tit.style.position='relactive';
//   }
// }

$(function (){
  // 获取 cookie
  var cookie = getCookie('nickname')
  console.log(cookie)

  if(cookie){
      $('.cookie-text').text(cookie + ',您好!')
      $('.header .header-top .header-right span').css('color', 'skyblue')
      $('.header .header-top .header-right > strong').css('display','block')
     
  }else{
      // $('.cookie-text').text(cookie + ',您好!')
      $('.header .header-top .header-right span').css('color', 'white')
      $('.header .header-top .header-right > strong').css('display','none')
      $('.myself').click(function(){
          window.location.href = './login.html'
      })
  }

  $('.list-city').click(function(){
      console.log(1111)
      window.location.href = './list.html'
      
  })

  // 发送请求

})


const ul = document.querySelector('ul')

    const inp = document.querySelector('.keywords')
    inp.addEventListener('input', function () {

      const value = this.value.trim()
      if (!value) return

      const script = document.createElement('script')
      const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
      script.src = url
      document.body.appendChild(script)
     
      script.remove()
    })

    function bindHtml(res) {
     
      if (!res.g) {
        ul.classList.remove('active')
        return
      }

      let str = ''

      for (let i = 0; i < res.g.length; i++) {
        str += `
          <li>${ res.g[i].q }</li>
        `
      }

      ul.innerHTML = str
      ul.classList.add('active')
    }