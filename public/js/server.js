'use strict';

$(function() {
	//阻止a链接跳转
	$('.tmw').find('a').click(function(e) {
		e.preventDefault();
	});

	//注册页
	$('#signup').click(function(e) {
		e.preventDefault();
		if (!($('#username').val().length >= 1 && $('#username').val().length <= 16)) {
			return alert('用户名请在1-16个字符之内');
		}
		if (!($('#password').val().length >= 1 && $('#password').val().length <= 16)) {
			return alert('密码请在1-16个字符之内');
		}
		if ($('#repeatpassword').val() !== $('#password').val()) {
			return alert('两次密码输入不一致！');
		}
		$.ajax({
			url: window.location.href + '/sign',
			data: $('#form').serialize(),
			datatype: 'json',
			type: 'POST',
			success: function(data) {
				alert(data);
				if (data.includes('成功')) {
					window.location.href = '/tmwcms/signin'
				}
			},
			error: function() {
				alert('好像出了点小问题');
			}
		});
	});

	//登录页
	$('#signin').click(function(e) {
		e.preventDefault();
		if (!($('#username').val().length >= 1 && $('#username').val().length <= 16)) {
			return alert('用户名请在1-16个字符之内');
		}
		if (!($('#password').val().length >= 1 && $('#password').val().length <= 16)) {
			return alert('密码请在1-16个字符之内');
		}
		$.ajax({
			url: window.location.href + '/sign',
			data: $('#form').serialize(),
			datatype: 'json',
			type: 'POST',
			success: function(data) {
				if (data.includes('cms')) {
					window.location.href = data;
				} else {
					alert(data);
				}
			},
			error: function() {
				alert('好像出了点小问题');
			}
		});
	});

	//CMS
	$('.maina').click(function() {
		$(this).next().slideToggle();
	});

	$('.mainul').find('a').click(function() {
		$('.mainul').find('a').parent().removeClass('act');
		$(this).parent().addClass('act');
	});

	//登出
	$('.logout').click(function() {
		if (confirm('确定要登出吗?')) {
			$.ajax({
				url: window.location.href + '/signout',
				datatype: 'json',
				type: 'GET',
				success: function() {
					window.location.href = '/tmwcms/signin'
				},
				error: function() {
					alert('好像出了点小问题')
				}
			});
		}
	});

	//查看主内容
	function showMainContent() {
		$(".item").addClass("disnone");
		$(".article-mc").removeClass("disnone");
		$.ajax({
			url: window.location.href + "/maincontent",
			datatype: 'json',
			success: function(data) {
				$('.listbody').find('ul').empty();
				for (let i = 0; i < data.length; i++) {
					let date = moment(data[i].time).utc().utcOffset(+8).format('YYYY-MM-DD HH:mm:ss');
					let html = '<li class="clearfix">' +
						'<div class="aid">' + data[i].id + '</div>' +
						'<div>' + data[i].title + '</div>' +
						'<div>' + data[i].author + '</div>' +
						'<div>' + data[i].editor + '</div>' +
						'<div>' + date + '</div>' +
						'<div>' + '<a href="javascript:;" class="edit">编辑</a>' +
						'</div></li>';

					$('.listbody').find('ul').append(html);
				}
				//编辑主内容
				$('.edit').click(function() {
					let aid = $(this).parents('li').find('.aid').html();
					$('.item,#editbtn,.aid,.dailybtn').addClass('disnone');
					$('.editartarea-mc').removeClass('disnone');
					$.ajax({
						url: window.location.href + '/maincontentedit/' + aid,
						type: 'GET',
						success: function(data) {
							$('#mcid').val(data.id);
							$('#entitle').val(data.title);
							$('#describe').val(data.describe);
						},
						error: function() {
							alert('好像出了点小问题');
						}
					});
				});
			},
			error: function() {
				alert('好像出了点小问题');
			}
		});
	}

	$('.maincontent').click(function() {
		showMainContent();
	});

	//修改主内容
	$('#editbtn-main').click(function(e) {
		e.preventDefault();
		editArticle('#mcid', "maincontent", function() {
			showMainContent();
		});
	});

	//查看文章
	function showArticle(arturl1, arturl2, fn) {
		$(".item").addClass("disnone");
		$(".article-art").removeClass("disnone");
		$.ajax({
			url: window.location.href + arturl1,
			datatype: 'json',
			success: function(data) {
				$('.listbody').find('ul').empty();
				for (let i = 0; i < data.length; i++) {
					let date = moment(data[i].time).utc().utcOffset(+8).format('YYYY-MM-DD HH:mm:ss');
					let html = '<li class="clearfix">' +
						'<div class="aid">' + data[i].id + '</div>' +
						'<div>' + data[i].titlel + '</div>' +
						'<div>' + data[i].author + '</div>' +
						'<div>' + data[i].editor + '</div>' +
						'<div>' + date + '</div>' +
						'<div>' + '<input type="checkbox" name="">' +
						'<a href="javascript:;" class="edit">编辑</a>' +
						'<a href="javascript:;" class="del">删除</a>' +
						'</div></li>';

					$('.listbody').find('ul').append(html);
				}

				$('.del').click(function() {
					let thisElement = $(this);
					delOneArt(arturl1, arturl2, fn, thisElement);
				});

				$('.edit').click(function() {
					let thisElement = $(this);
					editPage(arturl2, fn, thisElement);
				});

				$('.groupdel').click(function() {
					delArts(arturl1, arturl2, fn, thisElement);
				});

			},
			error: function() {
				alert('好像出了点小问题');
			}
		});
	}

	//编辑文章页
	function editPage(arturl2, fn, thisElement) {
		var aid = thisElement.parents('li').find('.aid').html();
		console.log(thisElement)
		fn();
		$.ajax({
			url: window.location.href + '/edit' + arturl2 + '/' + aid,
			type: 'POST',
			success: function(data) {
				$('#aid').val(data.id);
				$('#titles').val(data.titles);
				$('#titlel').val(data.titlel);
				$('#content').val(data.content);
			},
			error: function() {
				alert('好像出了点小问题');
			}
		});
	}


	//删除单条文章
	function delOneArt(arturl1, arturl2, fn, thisElement) {
		if (confirm('确定删除吗？')) {
			let aid = thisElement.parents('li').find('.aid').html();
			$.ajax({
				url: window.location.href + '/' + arturl2 + '/' + aid + '/del',
				type: 'POST',
				success: function(data) {
					if (data) {
						console.log(data);
						showArticle(arturl1, arturl2, fn);
					}
				},
				error: function() {
					alert('好像出了点小问题');
				}
			});
		}
	}

	//批量删除文章
	function delArts(arturl1, arturl2, fn, thisElement) {
		let list = [];
		if (confirm('确定删除吗？')) {
			$('.listbody').find('input:checkbox').each(function(index, el) {
				if ($(this).prop('checked')) {
					list.push($(this).parents('li').find('.aid').html());
				}
			});
			$.ajax({
				url: window.location.href + '/' + arturl2 + '/' + list + '/mutidel/',
				type: 'POST',
				success: function(data) {
					if (data) {
						console.log(data);
						showArticle(arturl1, arturl2, fn);
					}
				},
				error: function() {
					alert('好像出了点小问题');
				}
			});
		}
	}

	//添加文章
	function addArticle(url) {
		$.ajax({
			url: window.location.href + url,
			data: $('.editartarea').find('form').serialize(),
			type: 'POST',
			success: function(data) {
				if (data) {
					alert(data);
				}
			},
			error: function() {
				alert('保存出错了');
			}
		});
	}

	//编辑主内容/文章
	function editArticle(aid, url, fn) {
		let id = $(aid).val();
		$.ajax({
			url: window.location.href + '/' + url + '/' + id + '/edit',
			data: $('.editartarea').find('form').serialize(),
			type: 'POST',
			success: function(data) {

				if (data) {
					alert(data);
				}
				fn();
			},
			error: function() {
				alert('保存出错了');
			}
		});
	}
	/*------新闻------*/

	//查看新闻
	$('.shownews').click(function() {
		$('.item,#editbtn-news,.aid,.dailybtn').addClass('disnone');
		$('.article-art,#subbtn-news').removeClass('disnone');
		showArticle('/shownews', 'news', function() {
			$('#subbtn-news,.article').addClass('disnone');
			$('#editbtn-news,.editartarea-art,.aid').removeClass('disnone');
		});
	});

	//全选
	$('.groupall').off().click(function() {
		$('.listbody').find('input:checkbox').prop('checked', true);
	});

	//反选
	$('.groupres').off().click(function() {
		$('.listbody').find('input:checkbox').each(function(el, index) {
			$(this).prop('checked', !$(this).prop('checked'));
		});
	});

	//导航栏添加新闻
	$('.addnews').click(function() {
		$('.item,#editbtn,.aid,.dailybtn').addClass('disnone');
		$('.editartarea-art,#subbtn-news,.newsbtn').removeClass('disnone');
	});

	//发表新闻
	$('#subbtn-news').off().click(function(e) {
		e.preventDefault();
		addArticle('/news/create');
	});

	//编辑提交新闻
	$('#editbtn-news').off().click(function(e) {
		e.preventDefault();
		editArticle('#aid', 'news', function() {
			$('.item,#editbtn-news,.aid').addClass('disnone');
			$('.article-art,#subbtn-news').removeClass('disnone');
			showArticle('/shownews', 'news', function() {
				$('#subbtn-news,.article').addClass('disnone');
				$('#editbtn-news,.editartarea-art,.aid').removeClass('disnone');
			});
		})
	});
	/*------新闻结束------*/



	/*------日志------*/

	//查看日志
	$('.showdailies').click(function() {
		$('.item,#editbtn-daily,.aid,.newsbtn').addClass('disnone');
		$('.article-art,#subbtn-daily').removeClass('disnone');
		showArticle('/showdailies', 'daily', function() {
			$('#subbtn-daily,.article').addClass('disnone');
			$('#editbtn-daily,.editartarea-art,.aid').removeClass('disnone');
		});
	});

	//导航栏添加日志
	$('.adddaily').click(function() {
		$('.item,#editbtn,.aid,.newsbtn').addClass('disnone');
		$('.editartarea-art,#subbtn-daily,.dailybtn').removeClass('disnone');
	});

	//发表日志
	$('#subbtn-daily').off().click(function(e) {
		e.preventDefault();
		addArticle('/daily/create');
	});

	//编辑提交日志
	$('#editbtn-daily').off().click(function(e) {
		e.preventDefault();
		editArticle('#aid', 'daily', function() {
			$('.item,#editbtn-daily,.aid').addClass('disnone');
			$('.article-art,#subbtn-daily').removeClass('disnone');
			showArticle('/showdailies', 'daily', function() {
				$('#subbtn-daily,.article').addClass('disnone');
				$('#editbtn-daily,.editartarea-art,.aid').removeClass('disnone');
			});
		});
	});
	/*------日志结束------*/
});