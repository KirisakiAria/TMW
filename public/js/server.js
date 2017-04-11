"use strict";

$(function() {
	//阻止a链接跳转
	$(".tmw").find("a").click(function(e) {
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

	//查看文章
	function showArticle(arturl1, arturl2, fn) {
		$.ajax({
			url: window.location.href + arturl1,
			datatype: "json",
			success: function(data) {
				$(".listbody").find("ul").empty();
				for (let i = 0; i < data.length; i++) {
					let date = moment(data[i].time).utc().utcOffset(+8).format('YYYY-MM-DD HH:mm:ss');
					let html = "<li class='clearfix'>" +
						"<div class='aid'>" + data[i].id + "</div>" +
						"<div>" + data[i].titlel + "</div>" +
						"<div>" + data[i].author + "</div>" +
						"<div>" + data[i].editor + "</div>" +
						"<div>" + date + "</div>" +
						"<div>" + "<input type='checkbox' name=''>" +
						"<a href='javascript:;' class='edit'>编辑</a>" +
						"<a href='javascript:;' class='del'>删除</a>" +
						"</div></li>";

					$(".listbody").find("ul").append(html);

					//删除单条文章
					$(".del").off().click(function() {
						if (confirm("确定删除吗？")) {
							let aid = $(this).parents("li").find(".aid").html();
							$.ajax({
								url: window.location.href + "/" + arturl2 + "/" + aid + "/del",
								type: "POST",
								success: function(data) {
									if (data) {
										alert(data);
									}
									showArticle(arturl1, arturl2, fn);
								},
								error: function() {
									alert("好像出了点小问题");
								}
							});
						}
					});

					//编辑文章
					$(".edit").click(function() {
						var aid = $(this).parents("li").find(".aid").html();
						fn();
						$.ajax({
							url: window.location.href + "/edit" + arturl2 + "/" + aid,
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

					//批量删除文章
					$(".groupdel").off().click(function() {
						let list = [];
						if (confirm("确定删除吗？")) {
							$(".listbody").find("input:checkbox").each(function(index, el) {
								if ($(this).prop("checked")) {
									list.push($(this).parents("li").find(".aid").html());
								}
							});
							$.ajax({
								url: window.location.href + "/" + arturl2 + "/" + list + "/mutidel/",
								type: "POST",
								success: function(data) {
									if (data) {
										alert(data);
									}
									showArticle(arturl1, arturl2, fn);
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
	}

	/*------新闻------*/

	//查看新闻
	$(".shownews").click(function() {
		$(".item,#editbtn-news,.aid,.editartarea,.dailybtn").addClass("disnone");
		$(".article,#subbtn-news").removeClass("disnone");
		showArticle("/shownews", "news", function() {
			$("#subbtn-news,.article").addClass("disnone");
			$("#editbtn-news,.editartarea,.aid").removeClass("disnone");
		});
	});

	//全选
	$(".groupall").off().click(function() {
		$(".listbody").find("input:checkbox").prop("checked", true);
	});
	//反选
	$(".groupres").off().click(function() {
		$(".listbody").find("input:checkbox").each(function(el, index) {
			$(this).prop("checked", !$(this).prop("checked"));
		});
	});

	//导航栏添加新闻
	$(".addnews").click(function() {
		$(".item,#editbtn,.aid,.dailybtn").addClass("disnone");
		$(".editartarea,#subbtn-news,.newsbtn").removeClass("disnone");
	});

	//查看/编辑单条新闻
	$(".addnews").click(function() {
		$(".item,#editbtn,.aid,.dailybtn").addClass("disnone");
		$(".editartarea,#subbtn-news,.newsbtn").removeClass("disnone");
	});

	//发表新闻
	$("#subbtn-news").off().click(function(e) {
		e.preventDefault();
		$.ajax({
			url: window.location.href + "/createnews",
			data: $(".editartarea").find("form").serialize(),
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
	$("#editbtn-news").off().click(function(e) {
		e.preventDefault();
		var newsid = $("#aid").val();
		$.ajax({
			url: window.location.href + "/news/" + newsid + "/edit",
			data: $(".editartarea").find("form").serialize(),
			type: "POST",
			success: function(data) {
				if (data) {
					alert(data);
				}
				$(".item,#editbtn-news,.aid,.editartarea").addClass("disnone");
				$(".article,#subbtn-news").removeClass("disnone");
				showArticle("/shownews", "news", function() {
					$("#subbtn-news,.article").addClass("disnone");
					$("#editbtn-news,.editartarea,.aid").removeClass("disnone");
				});
			},
			error: function() {
				alert("保存出错了");
			}
		});
	});
	/*------新闻结束------*/



	/*------日志------*/

	//查看日志
	$(".showdailies").click(function() {
		$(".item,#editbtn-daily,.aid,.editartarea,.newsbtn").addClass("disnone");
		$(".article,#subbtn-daily").removeClass("disnone");
		showArticle("/showdailies", "daily", function() {
			$("#subbtn-daily,.article").addClass("disnone");
			$("#editbtn-daily,.editartarea,.aid").removeClass("disnone");
		});
	});

	//导航栏添加日志
	$(".adddaily").click(function() {
		$(".item,#editbtn,.aid,.newsbtn").addClass("disnone");
		$(".editartarea,#subbtn-daily,.dailybtn").removeClass("disnone");
	});

	//发表日志
	$("#subbtn-daily").off().click(function(e) {
		e.preventDefault();
		$.ajax({
			url: window.location.href + "/createdaily",
			data: $(".editartarea").find("form").serialize(),
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

	//编辑提交日志
	$("#editbtn-daily").off().click(function(e) {
		e.preventDefault();
		var dailyid = $("#aid").val();
		$.ajax({
			url: window.location.href + "/daily/" + dailyid + "/edit",
			data: $(".editartarea").find("form").serialize(),
			type: "POST",
			success: function(data) {
				if (data) {
					alert(data);
				}
				$(".item,#editbtn-daily,.aid,.editartarea").addClass("disnone");
				$(".article,#subbtn-daily").removeClass("disnone");
				showArticle("/showdailies", "daily", function() {
					$("#subbtn-daily,.article").addClass("disnone");
					$("#editbtn-daily,.editartarea,.aid").removeClass("disnone");
				});
			},
			error: function() {
				alert("保存出错了");
			}
		});
	});

	/*------日志结束------*/
});