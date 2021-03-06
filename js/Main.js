

var CuteenFunc = {
	sidebar: function () {
		var b;
		(CUTEEN_SETTING.HEADROOM) ? b = 316 : b = 535
		if (0 < $("#sidebar").length) {
			(new SidebarFollow()).init({
				element: jQuery('.sidebar-2'),
				prevElement: jQuery('.sidebar-1'),
				distanceToTop: b
			});
		}
	},
	sidebar2: function () {
		var b;
		(CUTEEN_SETTING.HEADROOM) ? b = 16 : b = 82
		if (0 < $("#sidebar").length) {
			(new SidebarFollow()).init({
				element: jQuery('.sidebar-3'),
				prevElement: jQuery('.sidebar-1'),
				distanceToTop: b
			});
		}
	},
	QiPao: function () {
		if (CUTEEN_SETTING.QIPAO) {
			$('#hero').circleMagic({
				radius: 10,
				density: .2,
				color: 'rgba(255,255,255,.4)',
				clearOffset: 0.99
			});
		}
	},
	owo: function () {
		if ($(".OwO666").length > 0) {
			new OwO({
				logo: 'OwO666',
				container: document.getElementsByClassName('OwO')[0],
				target: document.getElementsByClassName('textarea')[0],
				api: '/Func/OwO/OwO.json',
				position: 'down',
				width: '100%',
				maxHeight: '250px'
			})
		};
	},
	SearchModel: function () {
		if ($("#searchbox").length > 0) {
			if (!CUTEEN_SETTING.IS_MOBILE) {
				$('#searchbox').iziModal({
					title: '搜索内容',
					headerColor: 'var(--mlv)',
					background: '#fff',
					width: '80%',
				})
			} else {
				$('#searchbox').iziModal({
					title: '搜索内容',
					headerColor: 'var(--mlv)',
					background: '#fff',
					width: '100%',
				})
			}
		};
	},
	Entersearch: function (item) {
		var event = window.event || arguments.callee.caller.arguments[0];
		if (event.keyCode == 13) {
			CuteenFunc.startSearch(item);
			$('#searchbox').iziModal('close')
		}
	},

	startSearch: function (item) {
		var c = $(item).val();
		$(item).val('');
		$(item).blur();
		if (!c || c == '') {
			$(item).attr('placeholder', '你还没有输入任何信息');
			return;
		}
		var t = CUTEEN_SETTING.SITE_URL + c;
		if (CUTEEN_SETTING.PJAX) {
			$.pjax({
				url: t,
				container: '#pjax',
				fragment: '#pjax',
				timeout: 8000,
			});
		} else {
			window.open(t, '_self');
		}
	},
	TopPost: function () {
		if ($(".top-top").length > 0) {
			new tns({
				container: '.top-top',
				items: 1,
				axis: 'vertical',
				controls: false,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayButtonOutput: false
			});
		};
	},
	BackTop: function () {
		$("#btn").hide();
		$(function () {
			$(window).scroll(function () {
				if ($(window).scrollTop() > 50) {
					$("#btn").fadeIn(200);
				} else {
					$("#btn").fadeOut(200);
				}
			});
			$("#btn").click(function () {
				$('body,html').animate({
					scrollTop: 0
				}, 500);
				return false;
			});
		});
		
	},
	Toc: function () {
		if ($("#right-menu").length > 0) {
			var headerEl = 'h2,h3,h4,h5', content = '.duta';
			tocbot.init({
				tocSelector: '#MENU',
				contentSelector: content,
				headingSelector: headerEl,
				headingsOffset: 70
			});
		}
	},
	NoCopy: function () {
		if (CUTEEN_SETTING.NOPA) {
			((function () {
				var callbacks = [], timeLimit = 50, open = false; setInterval(loop, 1);
				return {
					addListener: function (fn) { callbacks.push(fn); },
					cancleListenr: function (fn) { callbacks = callbacks.filter(function (v) { return v !== fn; }); }
				}
				function loop() {
					var startTime = new Date(); debugger;
					if (new Date() - startTime > timeLimit) {
						if (!open) { callbacks.forEach(function (fn) { fn.call(null); }); }
						open = true; window.stop(); alert('大佬别再扒了！ヽ(￣ω￣(￣ω￣〃)ゝ'); document.body.innerHTML = "";
					} else {
						open = false;
					}
				}
			})()).addListener(function () { window.location.reload(); });
		}
	},
	NavBgFix: function () {
		if (CUTEEN_SETTING.HERO_IMG) {
			(function () {
				$(document).on('scroll', function () {
					if ($(document).scrollTop() <= 60) {
						$('.nav').addClass('nobg p1').removeClass('hasbg p2');
					} else {
						$('.nav').removeClass('nobg p1').addClass('hasbg p2');
					}
				});
			})();
		}
	},
	AjaxNext: function () {
		if (CUTEEN_SETTING.AJAX_PAGE || CUTEEN_SETTING.IS_MOBILE) {
			$('.next:not(.shangyiye):not(.xiayiye)').click(function () {
				var href = $('.next').attr('href');
				if (href != undefined) {
					$.ajax({
						url: href,
						type: 'get',
						beforeSend: function () {
							$(".next").hide();
						},
						error: function () { },
						success: function (data) {
							$('.next').show().text('点击查看更多');
							var $res = $(data).find('.ajaxcard');
							$('.cuteup').append($res.fadeIn(500));
							var newhref = $(data).find('.next').attr('href');
							if (newhref != undefined) {
								$('.next').attr('href', newhref);
							} else {
								$('.next').remove();
							}
						}
					});
				}
				return false;
			});
		}
	},
	Acc: function () {
		if ($(".allpost").length > 0) {
			$(".allpost .accordion-thumb").last().addClass("lastyj");
			$(".allpost .accordion-thumb").first().addClass("firstyj");
			$(".allpost .accordion-item").first().addClass("open");
		};
		$(".accordion > .accordion-item.open").children(".accordion-panel").slideDown();
		$(".accordion  .accordion-thumb").click(function () {
			$(this).parent().siblings(".accordion-item").removeClass("open").children(".accordion-panel").slideUp();
			$(this).parent().toggleClass("open").children(".accordion-panel").slideToggle("ease-out");
		});
	},
	Tab: function () {
		$(".tabs-wrap").each(function () {
			$(".tabs-item:nth-of-type(1)").addClass("active");
			$(".tabs-content:nth-of-type(1)").addClass("active");
			$(".tabs-item").click(function () {
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
				$(this).siblings(".tabs-content").eq($(this).index()).addClass("active");
			});
		});
	},
	DarkModeChecked: function () {
		if (CUTEEN_SETTING.THEME_COLOR == '2') {
			$("html").addClass("DarkMode");
			$(":root").css("--darkmode", "#475669");
			return;
		}
		else if (CUTEEN_SETTING.THEME_COLOR == '1') {
			$("html").removeClass("DarkMode");
			$(":root").css("--darkmode", "#eff2f7");
			return;
		}
		if (CUTEEN_SETTING.THEME_COLOR == '0' && document.cookie.replace(/(?:(?:^|.*;\s*)DarkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
			if (new Date().getHours() >= 20 || new Date().getHours() < 6) {
				$("html").addClass("DarkMode");
				$(":root").css("--darkmode", "#475669");
				document.cookie = "DarkMode=1;path=/";
				console.log('夜间模式开启');
			} else {
				$("html").removeClass("DarkMode");
				$(":root").css("--darkmode", "#eff2f7");
				document.cookie = "DarkMode=0;path=/";
				console.log('夜间模式关闭');
			}
		} else {
			var DarkMode = document.cookie.replace(/(?:(?:^|.*;\s*)DarkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
			if (DarkMode == '0') {
				$("html").removeClass("DarkMode");
				$(":root").css("--darkmode", "#eff2f7");
			} else if (DarkMode == '1') {
				$("html").addClass("DarkMode");
				$(":root").css("--darkmode", "#475669");
			}
		}
	},
	SwitchDarkMode: function () {
		$('<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><svg class="icon yueliang" aria-hidden="true"><use xlink:href="#icon-moon_"></use></svg><svg class="icon taiyang" aria-hidden="true"><use xlink:href="#icon-sun1"></use></svg></div></div>').appendTo($("body"))
		$(".DarkMode").length > 0 ? ($('.yueliang').css('display', 'block'), $('.taiyang').css('display', 'none')) : ($('.taiyang').css('display', 'block'), $('.yueliang').css('display', 'none')), setTimeout(function () {
			var DarkMode = document.cookie.replace(/(?:(?:^|.*;\s*)DarkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
			if (DarkMode == '0') {
				setTimeout("$('html').addClass('DarkMode');$(':root').css('--darkmode', '#475669');$('.taiyang').css('display','none'),$('.yueliang').css('display','block')", 900), document.cookie = "DarkMode=1;path=/", console.log('夜间模式开启'), $('#modeicon,#modeicon2').attr("xlink:href", "#icon-sun")
			} else {
				setTimeout("$('html').removeClass('DarkMode');$(':root').css('--darkmode', '#eff2f7');$('.yueliang').css('display','none'),$('.taiyang').css('display','block')", 900), document.cookie = "DarkMode=0;path=/", console.log('夜间模式关闭'), $('#modeicon,#modeicon2').attr("xlink:href", "#icon-_moon")
			};
			setTimeout(function () {
				$(".Cuteen_DarkSky").fadeOut(1e3, function () {
					$(this).remove()
				})
			}, 2e3)
		}), 50
	},
	upstar: function () {
		a = $('.like').attr('data-pid');
		i = $.cookie('upstar');
		if (i == a) return $('.like').addClass("done"),
			iziToast.show({
				title: "您已经点过赞啦",
				class: 'noshadow',
				position: 'topRight',
				backgroundColor: 'var(--mzi)',
				titleColor: 'var(--bai)',
				iconColor: '#ffffff',
				progressBarColor: '#ffffff',
				icon: 'fa fa-grin-alt',
				timeout: 5000
			}); $.post('action/like', { cid: a },
				function () {
					$.cookie('upstar', a, { expires: 7 });
					$('.like').find('span.likeCount').text(parseInt($('.like').find('span.likeCount').text()) + 1)
					iziToast.show({
						title: "点赞成功！感谢支持~",
						class: 'noshadow',
						position: 'topRight',
						backgroundColor: 'var(--mlv)',
						titleColor: 'var(--bai)',
						iconColor: '#ffffff',
						progressBarColor: '#ffffff',
						icon: 'fa fa-check',
						timeout: 5000
					});
				}
			);
	},
	MobileBarAcc: function () {
		$(".mobfl").click(function () {
			$(this).next('.mobzkcon').slideToggle(300);
			$(this).toggleClass('active');
		});
	},
	MobileMenu: function () {
		$("#mobar").toggleClass("leftopen");
		$("body").toggleClass("mobile-nav-open");
	},
	MobileCloseBar: function () {
		if ($('.mobile-nav-open').length > 0) {
			CuteenFunc.MobileMenu();
		}
		if ($('.rightopen').length > 0) {
			$('body').toggleClass('rightopen');
		}
	},
	
	randomString: function (len) {
		len = len || 32;
		let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let res = "";
		for (let i = 0; i < len; i++) {
			res += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return res;
	},

	getCodeFromBlock: function (block) {
		var codeOfBlocks = {};
		if (codeOfBlocks[block.id] != undefined) {
			return codeOfBlocks[block.id];
		}
		let lines = $(".hljs-ln-code", block);
		let res = "";
		for (let i = 0; i < lines.length - 1; i++) {
			res += lines[i].innerText;
			res += "\n";
		}
		res += lines[lines.length - 1].innerText;
		codeOfBlocks[block.id] = res;
		return res;
	},
	highlightJsRender: function () {
		if (typeof (hljs) == "undefined") {
			return;
		}
		$(".duta pre code").each(function (index, block) {
			if ($(block).hasClass("no-hljs")) {
				return;
			}
			$(block).parent().attr("id", CuteenFunc.randomString());
			hljs.highlightBlock(block);
			hljs.lineNumbersBlock(block, { singleLine: true });
			$(block).parent().addClass("hljs-codeblock");
			$(block).attr("hljs-codeblock-inner", "");
			let copyBtnID = "copy_btn_" + CuteenFunc.randomString();
			$(block).parent().append(`<div class="hljs-control hljs-title">
			<div class="hljs-control-btn hljs-control-toggle-break-line">
						<i class="fa fa-align-left"></i>
					</div>
					<div class="hljs-control-btn hljs-control-copy" id=` + copyBtnID + `>
						<i class="fa fa-clipboard"></i>
					</div>
				</div>`);
			let clipboard = new ClipboardJS("#" + copyBtnID, {
				text: function (trigger) {
					return CuteenFunc.getCodeFromBlock($(block).parent()[0]);
				}
			});
			clipboard.on('success', function (e) {
				iziToast.show({
					title: '复制成功',
					message: "代码已复制到剪贴板",
					class: 'noshadow',
					position: 'topRight',
					backgroundColor: 'var(--mlv)',
					titleColor: '#ffffff',
					messageColor: '#ffffff',
					iconColor: '#ffffff',
					progressBarColor: '#ffffff',
					icon: 'fa fa-check',
					timeout: 5000
				});
			});
			clipboard.on('error', function (e) {
				iziToast.show({
					title: '复制失败',
					message: "请手动复制到剪贴板",
					class: 'noshadow',
					position: 'topRight',
					backgroundColor: '#f5365c',
					titleColor: '#ffffff',
					messageColor: '#ffffff',
					iconColor: '#ffffff',
					progressBarColor: '#ffffff',
					icon: 'fa fa-close',
					timeout: 5000
				});
			});
		});
	},
	CodeToolBar: function () {
		$(document).on("click", ".hljs-control-toggle-break-line", function () {
			let block = $(this).parent().parent();
			block.toggleClass("hljs-break-line");
		});
	},
	FixSidebarHeight: function () {
		var g = $('#qjcbl').outerHeight(true);
		var j = $('#BLOG_CARD').outerHeight(true);
		if (j < g) {
			$('#BLOG_CARD').css('min-height', g)
		}
	},

	FixSomeStyle: function () {
		$(".sidebar-2").css("width", $(".widthhhh").width());
		if (0 < $('.sidebar-2').prev().length) {
			$('.sidebar-2').css('position', 'static').prev().remove();
		}
		if (CUTEEN_SETTING.HEADROOM) {
			var myElement = document.querySelector(".nav");
			var headroom = new Headroom(myElement);
			headroom.init();
		}
	}
};

Cuteen = {
	init: function () {
		CuteenFunc.SearchModel(); CuteenFunc.MobileBarAcc();
		CuteenFunc.owo(); CuteenFunc.FixSomeStyle(); CuteenFunc.QiPao();
		CuteenFunc.Toc(); CuteenFunc.NoCopy(); CuteenFunc.NavBgFix();
		CuteenFunc.Acc(); CuteenFunc.Tab(); CuteenFunc.sidebar();CuteenFunc.sidebar2();
		CuteenFunc.DarkModeChecked(); CuteenFunc.FixSidebarHeight();
		CuteenFunc.highlightJsRender(); CuteenFunc.AjaxNext(); CuteenFunc.BackTop();
	},

	loading: function () {
		$(window).preloader({
			selector: "#page-loading",
			delay: 0
		});
	}
};

$(document).ready(function () {
	Cuteen.init(); Cuteen.loading(); CuteenFunc.TopPost(); CuteenFunc.CodeToolBar();
})

function before_pjax() {
	$('body').append('<div id="page-loading" ><div class="circle"></div></div>');
	CuteenFunc.MobileCloseBar();
}
function after_pjax() {
	Cuteen.loading();
	CuteenFunc.TopPost();
	CuteenFunc.CodeToolBar();
}
function end_pjax() {
	Cuteen.init();
	

}
MathJax = {
	options: {
		renderActions: { addMenu: [0, '', ''] }
	},
	tex: {
		inlineMath: [['$', '$'], ['\\(', '\\)']]
	},
	svg: {
		fontCache: 'global'
	}
}



//本地搜索函数
var searchFunc = function (path, search_id, content_id) {
    'use strict';
    $.ajax({
        url: path,
        dataType: "xml",
        success: function( xmlResponse ) {
            // get the contents from search data
            var datas = $( "entry", xmlResponse ).map(function() {
                return {
                    title: $( "title", this ).text(),
                    content: $("content",this).text(),
                    url: $( "url" , this).text()
                };
            }).get();

            var $input = document.getElementById(search_id);
            var $resultContent = document.getElementById(content_id);

            $input.addEventListener('input', function(){
                var str='<ul class=\"search-result-list\">';                
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                $resultContent.innerHTML = "";
                if (this.value.trim().length <= 0) {
                    return;
                }
                // perform local searching
                datas.forEach(function(data) {
                    var isMatch = true;
                    var content_index = [];
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                    var data_url = data.url;
                    var index_title = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    // only match artiles with not empty titles and contents
                    if(data_title != '' && data_content != '') {
                        keywords.forEach(function(keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);

                            if( index_title < 0 && index_content < 0 ){
                                isMatch = false;
                            } else {
                                if (index_content < 0) {
                                    index_content = 0;
                                }
                                if (i == 0) {
                                    first_occur = index_content;
                                }
                            }
                        });
                    }
                    // show search results
                    if (isMatch) {
                        str += "<li><a href='"+ data_url +"' class='search-result-title'>"+ data_title +"</a>";
                        var content = data.content.trim().replace(/<[^>]+>/g,"");
                        if (first_occur >= 0) {
                            // cut out 100 characters
                            var start = first_occur - 20;
                            var end = first_occur + 80;

                            if(start < 0){
                                start = 0;
                            }

                            if(start == 0){
                                end = 100;
                            }

                            if(end > content.length){
                                end = content.length;
                            }

                            var match_content = content.substr(start, end); 

                            // highlight all keywords
                            keywords.forEach(function(keyword){
                                var regS = new RegExp(keyword, "gi");
                                match_content = match_content.replace(regS, "<em class=\"search-keyword\">"+keyword+"</em>");
                            });
                            
                            str += "<p class=\"search-result\">" + match_content +"...</p>"
                        }
                        str += "</li>";
                    }
                });
                str += "</ul>";
                $resultContent.innerHTML = str;
            });
        }
    });
}

function addAlt(){
$('section.ajaxcard:nth-child(even) .cardstyle').addClass('alt');
}

addAlt();

//彩虹标签
function colortag(){
	$("ul.tag-list li").each(function(){
		let random = Math.floor(Math.random()*5+1);
		if(random == 2){
			$(this).find('a').addClass('tagred');
		} else if ( random == 3 ){
			$(this).find('a').addClass('tagyellow');
		} else if ( random == 4 ){
			$(this).find('a').addClass('tagblue');
		} else if ( random == 5 ){
			$(this).find('a').addClass('taggreen');
		} else if ( random == 2 ){
			$(this).find('a').addClass('tagpurple');
		} else if ( random == 1 ){
			$(this).find('a').addClass('taggrown');
		}
			
	});}
	
	colortag();

	function timeago(dateTimeStamp) { 
		var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示 
		var hour = minute * 60; 
		var day = hour * 24; 
		var week = day * 7; 
		var month = day * 30; 
		var now = new Date().getTime(); //获取当前时间毫秒 
		var diffValue = now - dateTimeStamp; //时间差 
		if (diffValue < 0) { 
			return; 
		} 
		var minC = diffValue / minute; //计算时间差的分，时，天，周，月 
		var hourC = diffValue / hour; 
		var dayC = diffValue / day; 
		var weekC = diffValue / week; 
		var monthC = diffValue / month; 
		if (monthC >= 1 && monthC <= 3) { 
			result = " " + parseInt(monthC) + " 月前" 
		} else if (weekC >= 1 && weekC <= 3) { 
			result = " " + parseInt(weekC) + " 周前" 
		} else if (dayC >= 1 && dayC <= 6) { 
			result = " " + parseInt(dayC) + " 天前" 
		} else if (hourC >= 1 && hourC <= 23) { 
			result = " " + parseInt(hourC) + " 小时前" 
		} else if (minC >= 1 && minC <= 59) { 
			result = " " + parseInt(minC) + " 分钟前" 
		} else if (diffValue >= 0 && diffValue <= minute) { 
			result = "刚刚" 
		} else { 
			var datetime = new Date(); 
			datetime.setTime(dateTimeStamp); 
			var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1; 
			var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate(); 
			result = Nmonth + "-" + Ndate 
		} 
		return result; 
	} 


	function newcomment() {

		function queryLeanCloud(k) {
		  let root = this;
		  let len = arguments.length;
		  if (len == 1) {
			let notExist = new AV.Query("Comment");
			notExist.doesNotExist('rid');
			let isEmpty = new AV.Query("Comment");
			isEmpty.equalTo('rid', '');
			let q = AV.Query.or(notExist, isEmpty);
			if (k === '*') q.exists('url');
			else q.equalTo('url', decodeURI(k));
			q.addDescending('createdAt');
			q.addDescending('insertedAt');
			return q;
		  } else {
			let ids = JSON.stringify(arguments[1]).replace(/(\[|\])/g, '');
			let cql = `select * from ${root['config']['clazzName']} where rid in (${ids}) order by -createdAt,-createdAt`;
			return AV.Query.doCloudQuery(cql)
		  }
		}
		var valine = new Valine({
		  el: '#v123131',
		  app_id: 'C1qWqsDatomXVctTafBuJADI-gzGzoHsz',
		  app_key: 'J4CujIoElz1Wo7yLUbY4SOO5',
		  placeholder: '',
		  serverURLs: 'https://valineapi.heson10.com'
		});
	
		//判断博主，heson改为自己的昵称
		function bozhu(e){
			if (e == "heson"){
				nick = e + '[博主]'
				return nick;
			} else {
			  return e
			}
		}
	
	   //判断网址
	   function wangzhi(e){
			http = e.slice(0,4)
			https = e.slice(0,5)
			if (http == "http" || https == "https" ){
				 return e
			} else if (e == "" || e == null || e == undefined){
			  return e
			} else {
			  e = 'http://'+ e
			  return e
			}
		}
		
		//获取头像
       function getAvater(mail){
		   var a = mail.slice(-5,-6)
		   return '//v1.alapi.cn/api/avatar?email='+mail+'&size=100'
	   }



		//查询评论
		valine.Q('*').limit(7).find().then(function (comments) {
		  var hotComments = $("#hot-comments");
		  for (var i = 0; i < comments.length; i++) {
			if (i === 0) {
			  console.log(comments[0]);
			}
			let regimg =/<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/i;
			let regimghtml = /<\/?((?!img).)*?\/?>/g;
			let reghtml = /<[^>]+>/g;
			var nick = bozhu(comments[i]._serverData.nick);
			var content = comments[i]._serverData.comment;
			var newcontent = content.replace(regimg,"[表情]").replace(reghtml,"").substring(0, 50);
			var url = comments[i]._serverData.url;
			var mail = getAvater(comments[i]._serverData.mail);
			var link = wangzhi(comments[i]._serverData.link);
			var updatedAt = timeago(comments[i].updatedAt);
			var commentId = '#' + comments[i].id;
			hotComments.append('<li class="px1 pb2 flex items-center"><img style="width: 40px;height:40px" class="circle mx1 listavatar" src="'+mail+'"><div class="w100"><div class="flex justify-between"><div class="h6 listauthor overflow-hidden" title="' + nick + '"><a  target="_blank" rel="noopener external nofollow noreferrer" href="' + link + '">' + nick + '</a></div><span class="h6 mr1 listdate wenzi hang1">' + updatedAt + '</span></div> <a href="' + url + commentId +'"><div class="h5 list-comcontent overflow-hidden">' + newcontent + '</div></a></div></li>');
		  }
		});
	};


	newcomment();

	function pjax_valine() {
        if (!document.querySelectorAll("#valine_container")[0]) return;

        let pagePlaceholder = $.trim($('#pjax-comment-placeholder').text()) || "填写邮箱会收到回复提示！粘贴图片可直接上传~";

        let path = $.trim($('#pjax-comment-path').text());
        if (path.length == 0) {
            let defaultPath = '';
            path = defaultPath || decodeURI(window.location.pathname);
        }

        var valine = new Valine();
        valine.init({
            el: '#valine_container',
            meta: meta,
            placeholder: pagePlaceholder,
            path: path,
            appId: "C1qWqsDatomXVctTafBuJADI-gzGzoHsz",
            appKey: "J4CujIoElz1Wo7yLUbY4SOO5",
            pageSize: '10',
            avatar: 'robohash',
            lang: 'zh-cn',
            visitor: 'true',
            highlight: 'true',
			mathJax: 'false',
			recordIP: 'false',
            enableQQ: 'true',
            requiredFields: requiredFields,
            emojiCDN: 'https://cdn.jsdelivr.net/gh/volantis-x/cdn-emoji/valine/',
            emojiMaps: emojiMaps,
            master: '[fc2c9b067f65c9e2d7057ba797f7cfca]',
            friends: '[e011329178b200bcb5d94f0d0ff7544a,adb7d1cd192658a55c0ad22a3309cecf,104e5bfa98048a2dac66f28ca4d4d846,e399c5e8f4b4b8b86fc88e2b5bd04497,32d39099d6da89788fe3827cb90b1eb7,a5c27d1df34fcd4d8195e7e7d16675d4,09c82fd631755bf5dbb04b4189225637,b548550ae129b82aa01b60e18ccbf141,6a565e6c47127afdd40d5d46089db2c5,4a713ec085a4431f15a8da0942656713&#34;,58bc3a8cecadf26a676e1b8f217698bc,aaf4fe5dd76d0a1390cbd08cdb16c05f,0a106ca9ec8d5e8a2d14f99e5b8bd863,3ecc56d90844b70e49d9f8a61e9cd98c,8a6f99e8ce4af26a93f20c0cbab8a186,5392ad0ec563aa56f6faf597ef966762,6bcf44de7033a4451f38d576fb6e6822,135ae111f8fcfeecc1ea1f06fde149ab]'
        })
	}
	
	$(function () {
		pjax_valine();
		
		dingwei();

	});
	
	function loadScript(src, cb) {
		var HEAD = document.getElementsByTagName('head')[0] || document.documentElement;
		var script = document.createElement('script');
		script.setAttribute('type','text/javascript');
		if (cb) script.onload = cb;
		script.setAttribute('src', src);
		HEAD.appendChild(script);
	  }

	  function loadIssuesJS() {
		if ($("#Post_wysiwyg").find(".issues-api").length == 0) return;
		setTimeout(function() {
		  loadScript('/js/issues.js');
		}, 1);
	  };
	


function dingwei(){
			/*锚点定位*/
if(window.location.hash){
	var checkExist = setInterval(function() {
	   if (typeof jQuery == 'undefined'){return;}
	   if ($("#"+decodeURI(window.location.hash.split("#")[1]).replace(/\ /g,"-")).length) {
		  $('html, body').animate({scrollTop: $("#"+decodeURI(window.location.hash.split("#")[1]).replace(/\ /g,"-")).offset().top-100}, 500);
		  clearInterval(checkExist);
	   }
	}, 100);}
};

var searchFunc = function(path, search_id, content_id) {
    'use strict';
    $.ajax({
        url: path,
        dataType: "xml",
        success: function( xmlResponse ) {
            // get the contents from search data
            var datas = $( "entry", xmlResponse ).map(function() {
                return {
                    title: $( "title", this ).text(),
                    content: $("content",this).text(),
                    url: $( "url" , this).text()
                };
            }).get();

            var $input = document.getElementById(search_id);
            var $resultContent = document.getElementById(content_id);

            $input.addEventListener('input', function(){
                var str='<ul class=\"search-result-list\">';                
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                $resultContent.innerHTML = "";
                if (this.value.trim().length <= 0) {
                    return;
                }
                // perform local searching
                datas.forEach(function(data) {
                    var isMatch = true;
                    var content_index = [];
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                    var data_url = data.url;
                    var index_title = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    // only match artiles with not empty titles and contents
                    if(data_title != '' && data_content != '') {
                        keywords.forEach(function(keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);

                            if( index_title < 0 && index_content < 0 ){
                                isMatch = false;
                            } else {
                                if (index_content < 0) {
                                    index_content = 0;
                                }
                                if (i == 0) {
                                    first_occur = index_content;
                                }
                            }
                        });
                    }
                    // show search results
                    if (isMatch) {
                        str += "<li><a href='/"+ data_url +"' class='search-result-title'>"+ data_title +"</a>";
                        var content = data.content.trim().replace(/<[^>]+>/g,"");
                        if (first_occur >= 0) {
                            // cut out 100 characters
                            var start = first_occur - 20;
                            var end = first_occur + 80;

                            if(start < 0){
                                start = 0;
                            }

                            if(start == 0){
                                end = 100;
                            }

                            if(end > content.length){
                                end = content.length;
                            }

                            var match_content = content.substr(start, end); 

                            // highlight all keywords
                            keywords.forEach(function(keyword){
                                var regS = new RegExp(keyword, "gi");
                                match_content = match_content.replace(regS, "<em class=\"search-keyword\">"+keyword+"</em>");
                            });
                            
                            str += "<p class=\"search-result\">" + match_content +"...</p>"
                        }
                        str += "</li>";
                    }
                });
                str += "</ul>";
                $resultContent.innerHTML = str;
            });
        }
    });
}

var search_path = "search.xml";
var path = "/" + search_path;
searchFunc(path, 'local-search-input', 'local-search-result');


//jquery响应式设计

	$(window).resize(function() {
		var width_resize = $(this).width();
		var device_width = 800 
		if ( width_resize < device_width ) {	
		   $('#forpc').removeClass('d-d').addClass('d-n');
		   $('#formobile,.formobile,.formobilenav').removeClass('d-n').addClass('d-d');
		} else {

			$('#forpc').removeClass('d-n').addClass('d-d');
			$('#formobile,.formobile,.formobilenav').removeClass('d-d').addClass('d-n');

		}
	});

	$(function(){
		var width = $(window).width();
		var device_width = 800 
		if ( width < device_width ) {	
			$('#forpc').addClass('d-n');
			$('#formobile,.formobile').removeClass('d-n').addClass('d-d');

		 } else {
			 $('.formobilenav').removeClass('d-d').addClass('d-n');
		 }
			
		}); 


		
			var now = new Date();
			function createtime() {
			var grt= new Date('2020/07/06 00:00:00');//此处修改你的建站时间或者网站上线时间
			now.setTime(now.getTime()+250);
			days = (now - grt ) / 1000 / 60 / 60 / 24; dnum = Math.floor(days);
			hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum); hnum = Math.floor(hours);
			if(String(hnum).length ==1 ){hnum = "0" + hnum;} minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
			mnum = Math.floor(minutes); if(String(mnum).length ==1 ){mnum = "0" + mnum;}
			seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
			snum = Math.round(seconds); if(String(snum).length ==1 ){snum = "0" + snum;}
			document.getElementById("timeDate").innerHTML = "黑石已于 "+dnum+" 天 ";
			document.getElementById("times").innerHTML = hnum + " 小时 " + mnum + " 分 " + snum + " 秒前重生";
		}
	 setInterval("createtime()",250);
	 
		 $('#hero,#pjax').click(function(){
			
			 $("#mobar").removeClass("leftopen");
			 $("body").removeClass("mobile-nav-open");
			
		 });

function pjax_fancybox(){
		 $('.md').each(function(i){
			$(this).find('img').each(function(){
			  if ($(this).parent().hasClass('isfancybox')) return;
			  var alt = this.alt;
			  $(this).wrap('<a href="' + this.src + '" title="' + alt + '" data-fancybox="gallery" class="isfancybox"></a>');
			});
 })};
 pjax_fancybox();


//鼠标点击效果
var Sketch=function(){"use strict";function e(e){return"[object Array]"==Object.prototype.toString.call(e)}function t(e){return"function"==typeof e}function n(e){return"number"==typeof e}function o(e){return"string"==typeof e}function r(e){return E[e]||String.fromCharCode(e)}function i(e,t,n){for(var o in t)(n||!e.hasOwnProperty(o))&&(e[o]=t[o]);return e}function u(e,t){return function(){e.apply(t,arguments)}}function a(e){var n={};for(var o in e)n[o]=t(e[o])?u(e[o],e):e[o];return n}function c(e){function n(n){t(n)&&n.apply(e,[].splice.call(arguments,1))}function u(e){for(_=0;_<J.length;_++)G=J[_],o(G)?O[(e?"add":"remove")+"EventListener"].call(O,G,k,!1):t(G)?k=G:O=G}function c(){L(T),T=I(c),U||(n(e.setup),U=t(e.setup),n(e.resize)),e.running&&!j&&(e.dt=(B=+new Date)-e.now,e.millis+=e.dt,e.now=B,n(e.update),e.autoclear&&K&&e.clear(),n(e.draw)),j=++j%e.interval}function l(){O=Y?e.style:e.canvas,D=Y?"px":"",e.fullscreen&&(e.height=w.innerHeight,e.width=w.innerWidth),O.height=e.height+D,O.width=e.width+D,e.retina&&K&&X&&(O.height=e.height*X,O.width=e.width*X,O.style.height=e.height+"px",O.style.width=e.width+"px",e.scale(X,X)),U&&n(e.resize)}function s(e,t){return N=t.getBoundingClientRect(),e.x=e.pageX-N.left-w.scrollX,e.y=e.pageY-N.top-w.scrollY,e}function f(t,n){return s(t,e.element),n=n||{},n.ox=n.x||t.x,n.oy=n.y||t.y,n.x=t.x,n.y=t.y,n.dx=n.x-n.ox,n.dy=n.y-n.oy,n}function g(e){if(e.preventDefault(),W=a(e),W.originalEvent=e,W.touches)for(M.length=W.touches.length,_=0;_<W.touches.length;_++)M[_]=f(W.touches[_],M[_]);else M.length=0,M[0]=f(W,V);return i(V,M[0],!0),W}function h(t){for(t=g(t),q=(Q=J.indexOf(z=t.type))-1,e.dragging=/down|start/.test(z)?!0:/up|end/.test(z)?!1:e.dragging;q;)o(J[q])?n(e[J[q--]],t):o(J[Q])?n(e[J[Q++]],t):q=0}function p(t){F=t.keyCode,H="keyup"==t.type,Z[F]=Z[r(F)]=!H,n(e[t.type],t)}function v(t){e.autopause&&("blur"==t.type?b:C)(),n(e[t.type],t)}function C(){e.now=+new Date,e.running=!0}function b(){e.running=!1}function P(){(e.running?b:C)()}function A(){K&&e.clearRect(0,0,e.width,e.height)}function S(){R=e.element.parentNode,_=x.indexOf(e),R&&R.removeChild(e.element),~_&&x.splice(_,1),u(!1),b()}var T,k,O,R,N,_,D,B,G,W,z,F,H,q,Q,j=0,M=[],U=!1,X=w.devicePixelRatio,Y=e.type==m,K=e.type==d,V={x:0,y:0,ox:0,oy:0,dx:0,dy:0},J=[e.element,h,"mousedown","touchstart",h,"mousemove","touchmove",h,"mouseup","touchend",h,"click",y,p,"keydown","keyup",w,v,"focus","blur",l,"resize"],Z={};for(F in E)Z[E[F]]=!1;return i(e,{touches:M,mouse:V,keys:Z,dragging:!1,running:!1,millis:0,now:0/0,dt:0/0,destroy:S,toggle:P,clear:A,start:C,stop:b}),x.push(e),e.autostart&&C(),u(!0),l(),c(),e}for(var l,s,f="E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min".split(" "),g="__hasSketch",h=Math,d="canvas",p="webgl",m="dom",y=document,w=window,x=[],v={fullscreen:!0,autostart:!0,autoclear:!0,autopause:!0,container:y.body,interval:1,globals:!0,retina:!1,type:d},E={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"},C={CANVAS:d,WEB_GL:p,WEBGL:p,DOM:m,instances:x,install:function(t){if(!t[g]){for(var o=0;o<f.length;o++)t[f[o]]=h[f[o]];i(t,{TWO_PI:2*h.PI,HALF_PI:h.PI/2,QUATER_PI:h.PI/4,random:function(t,o){return e(t)?t[~~(h.random()*t.length)]:(n(o)||(o=t||1,t=0),t+h.random()*(o-t))},lerp:function(e,t,n){return e+n*(t-e)},map:function(e,t,n,o,r){return(e-t)/(n-t)*(r-o)+o}}),t[g]=!0}},create:function(e){return e=i(e||{},v),e.globals&&C.install(self),l=e.element=e.element||y.createElement(e.type===m?"div":"canvas"),s=e.context=e.context||function(){switch(e.type){case d:return l.getContext("2d",e);case p:return l.getContext("webgl",e)||l.getContext("experimental-webgl",e);case m:return l.canvas=l}}(),e.container.appendChild(l),C.augment(s,e)},augment:function(e,t){return t=i(t||{},v),t.element=e.canvas||e,t.element.className+=" sketch",i(e,t,!0),c(e)}},b=["ms","moz","webkit","o"],P=self,A=0,S="AnimationFrame",T="request"+S,k="cancel"+S,I=P[T],L=P[k],O=0;O<b.length&&!I;O++)I=P[b[O]+"Request"+S],L=P[b[O]+"Cancel"+T];return P[T]=I=I||function(e){var t=+new Date,n=h.max(0,16-(t-A)),o=setTimeout(function(){e(t+n)},n);return A=t+n,o},P[k]=L=L||function(e){clearTimeout(e)},C}();

if(document.getElementById("clickCanvas")) {
    function Particle(x, y, radius) {
        this.init(x, y, radius);
    }
    Particle.prototype = {
        init : function(x, y, radius) {
            this.alive = true;
            this.radius = radius || 10;
            this.wander = 0.15;
            this.theta = random(TWO_PI);
            this.drag = 0.92;
            this.color = '#ffeb3b';

            this.x = x || 0.0;
            this.y = y || 0.0;
            this.vx = 0.0;
            this.vy = 0.0;
        },
        move : function() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= this.drag;
            this.vy *= this.drag;
            this.theta += random(-0.5, 0.5) * this.wander;
            this.vx += sin(this.theta) * 0.1;
            this.vy += cos(this.theta) * 0.1;
            this.radius *= 0.96;
            this.alive = this.radius > 0.5;
        },
        draw : function(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };
    var MAX_PARTICLES = 50;
    //圆点颜色库
    var COLOURS = [ "#5ee4ff", "#f44033", "#ffeb3b", "#F38630", "#FA6900", "#f403e8", "#F9D423" ];
    var particles = [];
    var pool = [];
    var clickparticle = Sketch.create({
        container : document.getElementById('clickCanvas')
    });
    clickparticle.spawn = function(x, y) {
        if (particles.length >= MAX_PARTICLES)
            pool.push(particles.shift());
        particle = pool.length ? pool.pop() : new Particle();
        particle.init(x, y, random(5, 20));//圆点大小范围
        particle.wander = random(0.5, 2.0);
        particle.color = random(COLOURS);
        particle.drag = random(0.9, 0.99);
        theta = random(TWO_PI);
        force = random(1, 5);
        particle.vx = sin(theta) * force;
        particle.vy = cos(theta) * force;
        particles.push(particle);
    };
    clickparticle.update = function() {
        var i, particle;
        for (i = particles.length - 1; i >= 0; i--) {
            particle = particles[i];
            if (particle.alive)
                particle.move();
            else
                pool.push(particles.splice(i, 1)[0]);
        }
    };
    clickparticle.draw = function() {
        clickparticle.globalCompositeOperation = 'lighter';
        for ( var i = particles.length - 1; i >= 0; i--) {
            particles[i].draw(clickparticle);
        }
    };
    //按下时显示效果，mousedown 或者 click
    document.addEventListener("click", function(e) {
        var max, j;
        //排除一些元素
        "TEXTAREA" !== e.target.nodeName && "INPUT" !== e.target.nodeName && "A" !== e.target.nodeName && "I" !== e.target.nodeName && "IMG" !== e.target.nodeName 
        && function() {
            for (max = random(15, 20), j = 0; j < max; j++) 
            clickparticle.spawn(e.clientX, e.clientY);
        }();
    });
}
