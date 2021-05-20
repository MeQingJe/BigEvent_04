$(function() {
    $('#link-reg').click(function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link-login').click(function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 表单验证
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'
        ],
        repwd: function(value) {
            let pwd = $('.reg-box input[name = password]').val();
            if (pwd !== value) return '两次密码输入不一致！';
        }
    });

    // 注册
    let layer = layui.layer;
    $('#form_reg').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: {
                username: $('.reg-box input[name = username]').val(),
                password: $('.reg-box input[name = password]').val(),
            },
            success: function(res) {
                if (res.status != 0) return layer.msg(res.message);
                layer.msg(res.message);
                $('#form_reg')[0].reset();
                $('#link-login').click();
            }
        });
    });

    // 登录
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) return layer.msg(res.message);
                layer.msg(res.message);
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        });
    });
});