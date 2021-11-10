$(function(){
    // 按下回车 将数据 存储到本地存储里面
    // 存储格式 var data = [{title:"xxx",done: false}]
    load();
    $("#title").on("keydown",function(e){
        if(e.keyCode === 13){
            if($(this).val() === ""){
                alert("请输入内容在添加！")
            }else{
                // alert(1)
                // 先读取本地存储原来的数据
                var local = getData();
                // console.log(local);
                // 把local数据进行更新
                local.push({ title:$(this).val(),done: false});
                // 把local 存储给本地存储
                savaData(local);
                // 把本地存储的数据渲染到页面
                load();
                $(this).val("");
            }
        }
    });
    // todolist 删除操作
    $("ol,ul").on("click","a",function(){
        // alert(11)
        // 先获取本地存储
        var data = getData();
        // 修改数据
        var index = $(this).attr("id");
        // console.log(index);
        // 保存到本地存储
        data.splice(index,1);
        savaData(data);
        // 重新渲染页面
        load();
    })
    // 正在进行和完成操作
    $("ol,ul").on("click","input",function(){
        // alert(1)
        // 获取里面的数据
        var data = getData();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        console.log(data);
        // 保存到本地存储
        savaData(data);
        // 重新渲染
        load();
    })

    // 读取本地存储原来的数据 声明成函数
    function getData(){
        var data = localStorage.getItem("todolist");
        if(data !== null){
            // 本地存储数据是字符串格式
            return JSON.parse(data);
        }else{
            return [];
        }
    }
    // 保存本地存储数据
    function savaData(data){
        localStorage.setItem("todolist",JSON.stringify(data));
    }
    // 渲染加载数据
    function load(){
        // 读取数据
        var data = getData();
        // console.log(data);
        // 遍历之前先清空ol里面的元素
        $("ol,ul").empty();
        var todoCount = 0;// 正在进行的个数
        var doneCount = 0;// 已完成的个数
        // 遍历数据
        $.each(data,function(i,n){
            // console.log(n);
            if(n.done){
                $("ul").prepend("<li><input checked='checked' type='checkbox'><p>"+n.title+"</p><a href='javascript:;' id="+i+"></a></li>")
                doneCount++;
            }else{
                $("ol").prepend("<li><input type='checkbox'><p>"+n.title+"</p><a href='javascript:;' id="+i+"></a></li>")
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#doneCount").text(doneCount);
    }
})