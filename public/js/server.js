"use strict";

$(function() {
	//阻止a链接跳转
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
	function watchNews() {
		$(".item,#editnews,.aid,.addnews").addClass("disnone");
		$(".news,#submitnews").removeClass("disnone");
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
						"<div>" + data[i].editor + "</div>" +
						"<div>" + date + "</div>" +
						"<div>" + "<input type='checkbox' name=''>" +
						"<a href='javascript:;' class='edit'>编辑</a>" +
						"<a href='javascript:;' class='del'>删除</a>" +
						"</div></li>";

					$(".listbody").find("ul").append(html);

					//删除单条新闻
					$(".del").off().click(function() {
						if (confirm("确定删除吗？")) {
							let newsid = $(this).parents("li").find(".newsid").html();
							$.ajax({
								url: window.location.href + "/news/" + newsid + "/del",
								type: "POST",
								success: function(data) {
									if (data) {
										alert(data);
									}
									watchNews()
								},
								error: function() {
									alert("好像出了点小问题");
								}
							});
						}
					});

					//编辑新闻
					$(".edit").click(function() {
						var newsid = $(this).parents("li").find(".newsid").html();
						$("#submitnews,.news").addClass("disnone");
						$("#editnews,.addnews,.aid").removeClass("disnone");
						console.log(newsid);
						$.ajax({
							url: window.location.href + "/editnews/" + newsid,
							type: "POST",
							success: function(data) {
								$("#aid").val(data.id);
								$("#titles").val(data.titles);
								// $("#titles").val(data.title);
								$("#titlel").val(data.titlel);
								$("#content").val(data.content);
							},
							error: function() {
								alert("好像出了点小问题");
							}
						});
					});
				}
			},
			error: function() {
				alert("好像出了点小问题");
			}
		});
	}

	//绑定查看新闻
	$("#watchnews").click(function() {
		watchNews();
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
					list.push($(this).parents("li").find(".newsid").html());
				}
			});
			$.ajax({
				url: window.location.href + "/news/" + list + "/mutidel/",
				type: "POST",
				success: function(data) {
					if (data) {
						alert(data);
					}
					watchNews();
				},
				error: function() {
					alert("好像出了点小问题");
				}
			});
		}
	});

	//导航栏添加新闻
	$("#addnews").click(function() {
		$(".item,#editnews,.aid").addClass("disnone");
		$(".addnews,#submitnews").removeClass("disnone");
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
	});

	//编辑提交新闻
	$("#editnews").off().click(function(e) {
		e.preventDefault();
		var newsid = $("#aid").val();
		$.ajax({
			url: window.location.href + "/news/" + newsid + "/edit",
			data: $(".addnews").find("form").serialize(),
			type: "POST",
			success: function(data) {
				if (data) {
					alert(data);
				}
				watchNews();
			},
			error: function() {
				alert("保存出错了");
			}
		});
	});
})