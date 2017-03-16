$(function() {
	$("a").click(function(e) {
		e.preventDefault();
	});
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
					var date = moment(data[i].date).utc().zone(-8).format('YYYY-MM-DD HH:mm:ss');
					var html = "<li class='clearfix'>" +
						"<div>" + (i + 1) + "</div>" +
						"<div>" + data[i].titlel + "</div>" +
						"<div>" + data[i].author + "</div>" +
						"<div>" + date + "</div>" +
						"<div>" + "<input type='checkbox' name=''>" +
						"<a href=''>编辑</a>" +
						"<a href=''>删除</a>" +
						"</div></li>";
					$(".listbody").find("ul").append(html);
				}
			},
			error: function() {
				alert("ajax好像出了些问题");
			}
		});
	});
	//添加新闻
	$("#addnews").click(function() {
		$(".item").addClass("disnone");
		$(".addnews").removeClass("disnone");
	});
	//发表新闻
	$("#submitnews").click(function(e) {
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