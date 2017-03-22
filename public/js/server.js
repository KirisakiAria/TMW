$(function() {
	$("a").click(function(e) {
		e.preventDefault();
	});
	//登录页
	


	//CMS
	$(".maina").click(function() {
		$(this).next().slideToggle();
	});
	$(".mainul").find("a").click(function() {
		$(".mainul").find("a").parent().removeClass("act");
		$(this).parent().addClass("act");
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
				for (var i = 0; i < data.length; i++) {
					var date = moment(data[i].time).utc().utcOffset(+8).format('YYYY-MM-DD HH:mm:ss');
					var html = "<li class='clearfix'>" +
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
							var newsid = $(this).parent().parent().find(".newsid").html();
							$.ajax({
								url: window.location.href + "/news/" + newsid + "/del",
								type: "POST",
								success: function(data) {
									alert(data);
								},
								error: function() {
									alert("ajax好像出了些问题");
								}
							});
						}
					});
				}
			},
			error: function() {
				alert("ajax好像出了些问题");
			}
		});
	});
	//全选
	$("#all").off().click(function() {
		$(".listbody").find("input:checkbox").prop("checked", true);
	});
	//反选
	$("#res").off().click(function() {
		$(".listbody").find("input:checkbox").each(function(index, el) {
			$(this).prop("checked", !$(this).prop("checked"));
		});
	});
	//批量删除
	$("#del").off().click(function() {
		var list = [];
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
					alert("ajax好像出了些问题");
				}
			});
		}
	});
	//添加新闻
	$("#addnews").click(function() {
		$(".item").addClass("disnone");
		$(".addnews").removeClass("disnone");
	});
	//批量删除
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
				alert("保存出错");
			}
		});
	})
})