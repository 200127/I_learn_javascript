function animate(obj,target,calback){
    //先清除以前定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        //步长值写到定时器里面
        //把小数转换成整数，不要出现小数运算
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - window.pageYOffset) / 10
        var step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(window.pageYOffset == target){
            clearInterval(obj.timer);
            if(calback){
                //调用函数
                calback();
            }
        }
        //把每次加1 这个步长值改为一个个慢慢变小的值   步长公式：(目标值 - 现在的位置) / 10
        // obj.style.top = window.pageYOffset + step + 'px';
        window.scroll(0,window.pageYOffset + step);
    },10);
};