"use strict";

$(function() {
	$("a").click(function(e) {
		e.preventDefault();
	});
	//注册页
	$("#signup").click(function(e) {
		e.preventDefault();
		if (!($("#username").val().length >= 1 && $("#username").val().length <= 16)) {
			return alert('用户名请在1-16个字符之内');
		}
		if (!($("#password").val().length >= 1 && $("#password").val().length <= 16)) {
			return alert('密码请在1-16个字符之内');
		}
		if ($("#repeatpassword").val() !== $("#password").val()) {
			return alert("两次密码输入不一致！");
		}
		$.ajax({
			url: window.location.href + "/sign",
			data: $("#form").serialize(),
			datatype: "json",
			type: "POST",
			success: function(data) {
				alert(data);
				if (data.includes("成功")) {
					window.location.href = "/signin"
				}
			},
			error: function() {
				alert("好像出了点小问题");
			}
		});
	});
	//登录页
	$("#signin").click(function(e) {
		e.preventDefault();
		if (!($("#username").val().length >= 1 && $("#username").val().length <= 16)) {
			return alert('用户名请在1-16个字符之内');
		}
		if (!($("#password").val().length >= 1 && $("#password").val().length <= 16)) {
			return alert('密码请在1-16个字符之内');
		}
		$.ajax({
			url: window.location.href + "/sign",
			data: $("#form").serialize(),
			datatype: "json",
			type: "POST",
			success: function(data) {
				if (data.includes("cms")) {
					window.location.href = data;
				} else {
					alert(data);
				}
			},
			error: function() {
				alert("好像出了点小问题");
			}
		});
	});
	//CMS
	$(".maina").click(function() {
		$(this).next().slideToggle();
	});
	$(".mainul").find("a").click(function() {
		$(".mainul").find("a").parent().removeClass("act");
		$(this).parent().addClass("act");
	});
	//登出
	$(".logout").click(function() {
		if (confirm("确定要登出吗?")) {
			$.ajax({
				url: window.location.href + "/signout",
				datatype: "json",
				type: "GET",
				success: function() {
					window.location.href = "/signin"
				},
				error: function() {
					alert("好像出了点小问题")
				}
			});
		}
	});
	//查看新闻
	$("#watchnews").click(function() {
		$(".item").addClass("disnone");
		$(".news").removeClass("disnone");
		$.ajax({
			url: window.location.href + "/watchnews",
			datatype: "json",
			success: function(data) {
				$(".listbody").find("ul").empty();
				for (let i = 0; i < data.length; i++) {
					let date = moment(data[i].time).utc().utcOffset(+8).format('YYYY-MM-DD HH:mm:ss');
					let html = "<li class='clearfix'>" +
						"<div class='newsid'>" + data[i].id + "</div>" +
						"<div>" + data[i].titlel + "</div>" +
						"<div>" + data[i].author + "</div>" +
						"<div>" + date + "</div>" +
						"<div>" + "<input type='checkbox' name=''>" +
						"<a href='javascript:;' class='edit'>编辑</a>" +
						"<a href='javascript:;' class='del'>删除</a>" +
						"</div></li>";
					$(".listbody").find("ul").append(html);
					$(".del").off().click(function() {
						if (confirm("确定删除吗？")) {
							let newsid = $(this).parent().parent().find(".newsid").html();
							$.ajax({
								url: window.location.href + "/news/" + newsid + "/del",
								type: "POST",
								success: function(data) {
									alert(data);
								},
								error: function() {
									alert("好像出了点小问题");
								}
							});
						}
					});
				}
			},
			error: function() {
				alert("好像出了点小问题");
			}
		});
	});
	//全选
	$("#all").off().click(function() {
		$(".listbody").find("input:checkbox").prop("checked", true);
	});
	//反选
	$("#res").off().click(function() {
		$(".listbody").find("input:checkbox").each(function(el, index) {
			$(this).prop("checked", !$(this).prop("checked"));
		});
	});
	//批量删除
	$("#del").off().click(function() {
		let list = [];
		if (confirm("确定删除吗？")) {
			$(".listbody").find("input:checkbox").each(function(index, el) {
				if ($(this).prop("checked")) {
					list.push($(this).parent().parent().find(".newsid").html());
				}
			});
			$.ajax({
				url: window.location.href + "/news/muldel/" + list,
				type: "POST",
				success: function(data) {
					alert(data);
				},
				error: function() {
					alert("好像出了点小问题");
				}
			});
		}
	});
	//导航栏添加新闻
	$("#addnews").click(function() {
		$(".item").addClass("disnone");
		$(".addnews").removeClass("disnone");
	});
	//导航栏批量删除
	$("#addnews").click(function() {
		$(".item").addClass("disnone");
		$(".addnews").removeClass("disnone");
	});
	//发表新闻
	$("#submitnews").off().click(function(e) {
		e.preventDefault();
		$.ajax({
			url: window.location.href + "/createnews",
			data: $(".addnews").find("form").serialize(),
			type: "POST",
			success: function(data) {
				if (data) {
					alert(data);
				}
			},
			error: function() {
				alert("保存出错了");
			}
		});
	})
})