function initTop(textContent, huiVisible) {
	/*
	 * if(displayType=="image"){
	 * document.getElementById("topPicTd").style.display="block";
	 * document.getElementById("topPic").src=picContent;
	 * document.getElementById("topTextTd").style.display="none";
	 * document.getElementById("topTextTd").innerHTML=""; }
	 * if(displayType=="text"){
	 * document.getElementById("topPicTd").style.display="none";
	 * document.getElementById("topPic").src="image.png";
	 * document.getElementById("topTextTd").style.display="block";
	 * document.getElementById("topTextTd").innerHTML=textContent; }
	 */
	// document.getElementById("topTitleTd").innerHTML=textContent;
	if (!huiVisible) {
		// document.getElementById("topHui").style.display="none";
		document.getElementById("mainTable").style.height = "90%";
	} else {
		// document.getElementById("topHui").style.display="block";
		document.getElementById("mainTable").style.height = "84%";
	}
}
function initXkTop(textContent, huiVisible) {
	document.getElementById("mainTable").style.height = "100%";
}
function initTopNoMain(textContent, huiVisible) {

}
function initTopPart(displayType, displayContent) {

	if (displayType == "text") {

		document.getElementById("SubComtent").innerHTML = displayContent;
	}
}
function showPath(content) {
	document.getElementById("pathTd").innerHTML = content;
}
// ���������
function outa() {
	document.getElementById("lefttd").width = 1;
	document.getElementById("righttd").width = "99%";
	document.getElementById("menu").src = "images/zhjw/tree/menu_out.gif";
	// ����select���
	if (window.tree != null && window.tree.hideSelect != null) {
		window.tree.hideSelect(true);
	}
}
// ��ʾ�����
function expand(leftwidth, rightwidth) {
	var leftt = document.getElementById("lefttd");
	if (leftt.width == 1) {
		leftt.width = leftwidth;
		document.getElementById("righttd").width = rightwidth;
		document.getElementById("menu").src = "images/zhjw/tree/menu_in.gif";
		if (window.tree != null && window.tree.hideSelect != null) {
			window.tree.hideSelect(false);
		}
	} else
		outa();
}

function isShowPath(isShow) {
	if (!isShow) {
		document.getElementById("isShow").style.display = "none";
	} else {
		document.getElementById("isShow").style.display = "block";
	}
}

function truncdata(inputstr, datalen) {
	if (inputstr.length > datalen) {
		document.write(inputstr.substring(0, datalen) + "...");
	} else {
		document.write(inputstr);
	}
}
// show subTitle
