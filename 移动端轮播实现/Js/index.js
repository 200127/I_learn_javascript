window.addEventListener('load',function(){
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    console.log(ul);
    var w = focus.offsetWidth;
    //2、利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function(){
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX('+ translatex +'px)';
    },2000);
    //等着我们过度完成之后，在去判断 监听过度完成事件 transitionend
    ul.addEventListener('transitionend',function(){
        //无缝滚动
        var ull = ul.children.length - 2;
        // console.log(ull);
        if(index >= ull){
            index = 0;
            // 去掉过度效果 这样让我们的ul 快速跳到目标位置
            ul.style.transition = 'none';
            //继续滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX('+ translatex +'px)';
        }else if(index < 0){
            index = ull - 1;
             // 去掉过度效果 这样让我们的ul 快速跳到目标位置
             ul.style.transition = 'none';
             //继续滚动图片
             var translatex = -index * w;
             ul.style.transform = 'translateX('+ translatex +'px)';
        }
        //小圆点变化
        //把ol里面li带有curren类去掉
        ol.querySelector('.curren').classList.remove('curren');
        //当前索引号li加上curren类
        ol.children[index].classList.add('curren');
    });
    //3、手指滑动轮播图
    //触摸元素 touchstart： 获取手指初始坐标
    var startX = 0;
    var movex = 0;
    ul.addEventListener('touchstart',function(e){
        startX = e.targetTouches[0].pageX;
        //手指触摸的时候取消定时器
        clearInterval(timer);
    })
    //移动手指 touchmove: 计算手指滑动距离，并且移动盒子
    ul.addEventListener('touchmove',function(e){
        //计算移动距离
        movex = e.targetTouches[0].pageX - startX;
        //盒子移动： 盒子原来的位置 + 手指移动的距离
        var translatex = -index * w + movex;
        //手指移动的时候不需要过度,取消过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX('+ translatex +'px)';
        flag = true;//如果手指移动再去判断，否知不做判断
        e.preventDefault();//阻止滚动屏幕的行为
    });
    //手指离开 根据移动距离去判断是回弹还是播放上一张下一张
    ul.addEventListener('touchend',function(e){
        if(flag){
            //(1)如果移动距离大于50像素我们就播放下一张获取上一张
            if(Math.abs(movex) > 50){
                //如果是正值 播放上一张  右滑
                if(movex > 0){
                    index--;
                }else{
                    //如果是负值 播放下一张 左滑
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX('+ translatex +'px)';
            }else{
                var translatex = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX('+ translatex +'px)'
            }
        }
        //手指离开后开启定时器
        clearInterval(timer);
        timer = setInterval(function(){
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX('+ translatex +'px)';
        },2000);
    });
    //返回顶部模块制作
    var goback = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll',function(){
        if(window.pageYOffset >= 180){
            goback.style.display = 'block';
        }else{
            goback.style.display = 'none';
        }
    });
    goback.addEventListener('click',function(){
        window.scroll(0,0)
    })
})