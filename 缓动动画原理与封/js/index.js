window.addEventListener('load',function(){
    var focus = document.querySelector('.focus');
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    focus.addEventListener('mouseenter',function(){
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        //鼠标经过关闭定时器
        clearInterval(timer);
        timer = null;//清楚定时器
    });
    focus.addEventListener('mouseleave',function(){
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function(){
            //手动调用点击事件
            arrowr.click();
        },2000);
    });
    // 动态生成小圆圈, 有几张图生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    // console.log(ul.children.length);
    for(var i = 0;i < ul.children.length; i++){
        //创建一个小li
        var li = document.createElement('li');
        //记录当前小圆圈索引号 通过自定义属性来做
        li.setAttribute('index',i);
        //把小li插入ol
        ol.appendChild(li);
        //小圆圈排他思想
        li.addEventListener('click',function(){
            //干掉所有人
            for(var i = 0;i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            //留下自己
            this.className = 'current';
            //点击小圆圈移动图片，ul
            //ul移动距离就是小圆圈索引号*li宽度
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            // console.log(focusWidth);
            // console.log(index);
            animate(ul,-index * focusWidth)
        })
    }
    ol.children[0].className = 'current';
    //点击a右侧按钮 滚动一次 无缝滚动
    //克隆第一张图片放在最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮
    var num = 0;
    //控制小圆圈的播放      
    var circle = 0;
    //flag 就是节流阀
    var flag = true;
    // 右侧按钮
    arrowr.addEventListener('click',function(){
        if(flag){
            flag = false;//关闭节流阀
            if(num == ul.children.length - 1){
                ul.style.left = 0;
                num = 0;
            }
            num++
            var focusWidth = focus.offsetWidth;
            animate(ul,-num * focusWidth,function(){
                flag = true;
            });
            circle ++;
            if(circle == ol.children.length){
                circle = 0;
            }
            //先清楚其余小圆圈的circle类名
            for(var i = 0;i < ol.children.length;i++){
                ol.children[i].className = '';
            }
            //留下当前的小圆圈的circle类名
            ol.children[circle].className = 'current';
        }

    });
    //左侧按钮
    arrowl.addEventListener('click',function(){
        if(flag){
            flag = false;
            if(num == 0){
                num = ul.children.length -1;
                ul.style.left = num * focusWidth + 'px';
            }
            num--;
            var focusWidth = focus.offsetWidth;
            animate(ul,-num * focusWidth,function(){
                flag = true
            });
            circle --;
            //如果circle < 0 说明是第一张图片，小圆圈要改成第六个
            if(circle < 0){
                circle = ol.children.length - 1;
            }
            //先清楚其余小圆圈的circle类名
            for(var i = 0;i < ol.children.length;i++){
                ol.children[i].className = '';
            }
            //留下当前的小圆圈的circle类名
            ol.children[circle].className = 'current';
        }
    });
    //自动播放轮播图
    var timer = setInterval(function(){
        //手动调用点击事件
        arrowr.click();
    },2000);
})