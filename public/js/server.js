'use strict';
let show;
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
			url: window.location.href + "/showmaincontent",
			datatype: 'json',
			success: function(data) {
				$('.listbody').find('ul').empty();
				data.forEach(function(e, i) {
					let date = moment(e.time).utc().utcOffset(+8).format('YYYY-MM-DD HH:mm:ss');
					let html = '<li class="clearfix">' +
						'<div class="aid">' + e.id + '</div>' +
						'<div>' + e.title + '</div>' +
						'<div>' + e.author + '</div>' +
						'<div>' + e.editor + '</div>' +
						'<div>' + date + '</div>' +
						'<div>' + '<a href="javascript:;" class="edit">编辑</a>' +
						'</div></li>';

					$('.listbody').find('ul').append(html);
				});
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

	show = showMainContent;
	
	$('.maincontent').click(function() {
		showMainContent();
	});

	//修改主内容
	$('#editbtn-main').click(function(e) {
		e.preventDefault();
		editArticle('.mcform', '#mcid', "maincontent", function() {
			showMainContent();
		});
	});

	//查看文章
	//参数fn为editPage方法的回调函数
	function showArticle(arturl1, arturl2, fn) {
		$(".item").addClass("disnone");
		$(".article-art").removeClass("disnone");
		$.ajax({
			url: window.location.href + arturl1,
			datatype: 'json',
			success: function(data) {
				$('.listbody').find('ul').empty();
				data.forEach(function(e, i) {
					let date = moment(e.time).utc().utcOffset(+8).format('YYYY-MM-DD HH:mm:ss');
					let html = '<li class="clearfix">' +
						'<div class="aid">' + e.id + '</div>' +
						'<div>' + e.titlel + '</div>' +
						'<div>' + e.author + '</div>' +
						'<div>' + e.editor + '</div>' +
						'<div>' + date + '</div>' +
						'<div>' + '<input type="checkbox" name="">' +
						'<a href="javascript:;" class="edit">编辑</a>' +
						'<a href="javascript:;" class="del">删除</a>' +
						'</div></li>';
					$('.listbody').find('ul').append(html);
				});
				$('.del').click(function() {
					let thisElement = $(this);
					delOneArt(arturl1, arturl2, fn, thisElement);
				});

				$('.edit').click(function() {
					let thisElement = $(this);
					editPage(arturl2, fn, thisElement);
				});

				$('.groupdel').off().click(function() {
					let thisElement = $(this);
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
		fn();
		$.ajax({
			url: window.location.href + 'edit' + arturl2 + '/' + aid,
			type: 'GET',
			success: function(data) {
				if (arturl2 == "share") {
					$('#songid').val(data.id);
					$('#song').val(data.titlel);
					$('#singer').val(data.singer);
					$('#href').val(data.href);
					$('#details').val(data.details);
				} else {
					$('#aid').val(data.id);
					$('#titles').val(data.titles);
					$('#titlel').val(data.titlel);
					$('#content').val(data.content);
				}
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
	function addArticle(className, url) {
		$.ajax({
			url: window.location.href + url,
			data: $(className).serialize(),
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
	function editArticle(className, aid, url, fn) {
		let id = $(aid).val();
		$.ajax({
			url: window.location.href + '/' + url + '/' + id + '/edit',
			data: $(className).serialize(),
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

	//导航栏查看新闻
	$('.shownews').click(function() {
		$('.item,#editbtn-news,.aid,.dailybtn').addClass('disnone');
		$('.article-art,#subbtn-news').removeClass('disnone');
		showArticle('shownews', 'news', function() {
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

	//发表新闻按钮
	$('#subbtn-news').off().click(function(e) {
		e.preventDefault();
		addArticle('.artform', '/news/create');
	});

	//编辑新闻按钮
	$('#editbtn-news').off().click(function(e) {
		e.preventDefault();
		editArticle('.artform', '#aid', 'news', function() {
			$('.item,#editbtn-news,.aid').addClass('disnone');
			$('.article-art,#subbtn-news').removeClass('disnone');
			showArticle('shownews', 'news', function() {
				$('#subbtn-news,.article').addClass('disnone');
				$('#editbtn-news,.editartarea-art,.aid').removeClass('disnone');
			});
		})
	});
	/*------新闻结束------*/



	/*------日志------*/

	//导航栏查看日志
	$('.showdailies').click(function() {
		$('.item,#editbtn-daily,.aid,.newsbtn').addClass('disnone');
		$('.article-art,#subbtn-daily').removeClass('disnone');
		showArticle('showdailies', 'daily', function() {
			$('#subbtn-daily,.article').addClass('disnone');
			$('#editbtn-daily,.editartarea-art,.aid').removeClass('disnone');
		});
	});

	//导航栏添加日志
	$('.adddaily').click(function() {
		$('.item,#editbtn,.aid,.newsbtn').addClass('disnone');
		$('.editartarea-art,#subbtn-daily,.dailybtn').removeClass('disnone');
	});

	//发表日志按钮
	$('#subbtn-daily').off().click(function(e) {
		e.preventDefault();
		addArticle('.artform', '/daily/create');
	});

	//编辑日志按钮
	$('#editbtn-daily').off().click(function(e) {
		e.preventDefault();
		editArticle('.artform', '#aid', 'daily', function() {
			$('.item,#editbtn-daily,.aid').addClass('disnone');
			$('.article-art,#subbtn-daily').removeClass('disnone');
			showArticle('showdailies', 'daily', function() {
				$('#subbtn-daily,.article').addClass('disnone');
				$('#editbtn-daily,.editartarea-art,.aid').removeClass('disnone');
			});
		});
	});
	/*------日志结束------*/

	/*------分享------*/

	//导航栏查看分享
	$('.showshare').click(function() {
		$('.item,#editbtn-share,.aid').addClass('disnone');
		$('.article-art,#subbtn-share').removeClass('disnone');
		showArticle('showshare', 'share', function() {
			$('#subbtn-share,.article').addClass('disnone');
			$('#editbtn-share,.editartarea-share,.aid').removeClass('disnone');
		});
	});

	//导航栏添加分享
	$('.addshare').click(function() {
		$('.item,#editbtn-share,.aid').addClass('disnone');
		$('.editartarea-share,#subbtn-share').removeClass('disnone');
	});

	//发表分享按钮
	$('#subbtn-share').off().click(function(e) {
		e.preventDefault();
		addArticle('.shareform', '/share/create');
	});

	//编辑分享按钮
	$('#editbtn-share').off().click(function(e) {
		e.preventDefault();
		editArticle('.shareform', '#songid', 'share', function() {
			$('.item,#editbtn-share,.aid').addClass('disnone');
			$('.article-art,#subbtn-share').removeClass('disnone');
			showArticle('showshare', 'share', function() {
				$('#subbtn-share,.article').addClass('disnone');
				$('#editbtn-share,.editartarea-share,.aid').removeClass('disnone');
			});
		})
	});

	/*------分享结束------*/

});