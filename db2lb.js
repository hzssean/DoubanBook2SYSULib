/*	DoubanBook2SYSULib
 * This chrome extensions is created by irachex (Huayi Zhang)<irachex@gmail.com>
 * firstly which works in Fudan University Library. And then it is made to work 
 * for the GDUFS Library by David Chen<chendahui007@gmail.com> and his fellow
 * Piandan Zheng<zhengpiaodan@gmail.com>. And then, zhchbin develop it to work for
 * SYSU guys. And, I'm will.
 */

(function() {

	if(navigator.appVersion.indexOf("MSIE 6")>-1){
		window.open("http://iqshu.com/Other/noIE6");
		return false;
	}
	// change this to make it suitable for your school Library
	var base_search_url = "http://202.116.64.108:8991/F/?func=find-b&find_base=GWD01&find_code=WRD&request={{data}}";

	function getLibraryButton(keyword) {
		var search_url = base_search_url.replace("{{data}}", keyword);
		var buttonHTML = "<a id='library_button' href='" + search_url + "' style='float:left;display: inline-block;background: #33A057;border: 1px solid #2F7B4B;color: white;padding: 1px 10px;border-radius:3px;margin-right: 8px;' target='_blank'>\u501f\u9605</a>";
		var button = document.createElement("span");
		button.innerHTML = buttonHTML;
		return button
	}

	function _(id) {
		return document.getElementById(id)
	}

	function _c(searchClass, node, tag) {
		if (document.getElementsByClassName && node == null && tag == null) {
			return document.getElementsByClassName(searchClass)
		} else {
			node = node || document;
			tag = tag || "*";
			var returnElements = [];
			var els = tag === "*" && node.all ? node.all : node.getElementsByTagName(tag);
			var i = els.length;
			searchClass = searchClass.replace(/\-/g, "\\-");
			var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
			while (--i >= 0) {
				if (pattern.test(els[i].className)) {
					returnElements.push(els[i])
				}
			}
			return returnElements
		}
	}

	function fireClick(el) {
		if (el.click) {
			el.click();
		} else {
			try {
				var evt = document.createEvent('Event');
				evt.initEvent('click', true, true);
				el.dispatchEvent(evt);
			} catch (e) {
				alert(e)
			};
		}
	}

	function lastChildElm(node, elm) {
		var length = node.getElementsByTagName(elm).length;
		if (length > 0) {
			return node.getElementsByTagName(elm)[length - 1]
		} else {
			return false
		}
	}
	var url = window.location.toString();
	if (url.indexOf("subject") != -1) {
		var keyword;
		var ISBNElm = lastChildElm(_("info"), "span");
		if (ISBNElm.innerHTML.indexOf("ISBN") != -1) {
			keyword = ISBNElm.nextSibling.nodeValue
		} else {
			keyword = _("mainpic").getElementsByTagName("img")[0].getAttribute("alt")
		}
		_("interest_sect_level").insertBefore(getLibraryButton(keyword), _c("a_stars", document, "div")[0]);
		fireClick(_("library_button"));
	} else {
		if (url.indexOf("mine") != -1 || url.indexOf("people") != -1) {
			var uls = _c("list-s", document, "ul");
			for (var i = uls.length - 1; i >= 0; i--) {
				var links = uls[i].getElementsByTagName("li");
				for (var j = links.length - 1; j >= 0; j--) {
					var keyword = links[j].getElementsByTagName("img")[0].getAttribute("alt");
					var button = getLibraryButton(keyword);
					button.getElementsByTagName("a")[0].style.cssText += " float:none;";
					links[j].appendChild(button)
				}
			}
		} else {
			if (url.indexOf("doulist") != -1) {
				var tables = _c("article", document, "div")[0].getElementsByTagName("table");
				for (var i = tables.length - 1; i >= 0; i--) {
					var keyword = _c("pl2", tables[i], "div")[0].getElementsByTagName("a")[0].innerHTML;
					var span = _c("rr", tables[i].getElementsByTagName("td")[1], "span")[0];
					var stardiv = tables[i].getElementsByTagName("div")[1];
					if (span) {
						span.insertBefore(getLibraryButton(keyword), span.getElementsByTagName("a")[0])
					} else {
						var button = getLibraryButton(keyword);
						button.getElementsByTagName("a")[0].style.cssText += " float:none;";
						stardiv.appendChild(button)
					}
				}
			} else {
				if (url.indexOf("tag") != -1) {
					var tables = _("subject_list").getElementsByTagName("table");
					for (var i = tables.length - 1; i >= 0; i--) {
						var keyword_html = _c("pl2", tables[i], "div")[0].getElementsByTagName("a")[0].innerHTML.toLowerCase();
						var keyword = keyword_html.split("<span")[0];
						var span = _c("rr", tables[i].getElementsByTagName("td")[1], "span")[0];
						var stardiv = tables[i].getElementsByTagName("div")[1];
						if (span) {
							span.insertBefore(getLibraryButton(keyword), span.getElementsByTagName("a")[0])
						} else {
							var button = getLibraryButton(keyword);
							button.getElementsByTagName("a")[0].style.cssText += " float:none;";
							stardiv.appendChild(button)
						}
					}
				}
			}
		}
	}
})();