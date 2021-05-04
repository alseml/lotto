// 팁
function createNumberTip(){
    var num = $(".number_box").val();
    
    if(num > 0 && num < 101){
        $(".create_number_count > span").css("display","none");
    }else{
        $(".create_number_count > span").css("display","flex");
        
    }
}


// 최신 회차 번호 업데이트
function titleChange(){
    var titleBox = $(".title > span");
    var lottoN_Number = lottoArray.length;

    titleBox.html(lottoN_Number+"회차 당첨번호");
    drawBallTitle();

    //var titleNumberBox = $(".numbers");
    //var str = `${lottoStr[0]} ${lottoStr[1]} ${lottoStr[2]} ${lottoStr[3]} ${lottoStr[4]} ${lottoStr[5]} ${lottoStr[6]}`;
    //titleNumberBox.html(str);
}

// 시작 버튼을 누르면 호출.
function createStart()
{
    var num = $(".number_box").val();
    var checkd = $("#numberOverlap");


    createNumberTip();

    if(num > 0 && num < 101){
        if(num == 1){
            var overlapNumber = true;
            var arr = createNumber();
    
            while(overlapNumber){
                arr = createNumber();
                sort(arr,arr.length);
                overlapNumber = lottoPrevNumberFilter(arr);
            }
    
            displayTextNumber(arr);
            drawBall(arr);
        }else{
            var list = checkd.is(":checked") == true ? createMultipleNumber(num) : createMultipleNumberOnOverlap(num);
            displayTextNumberMulti(list);
            drawBallAll(list);
        }
    }
    
}

// 하나의 번호를 생성한다.
function createNumber(){
    
    var MAX = 6;
    var arr = new Array(MAX);
    var count = 0;
    

    while(count < MAX)
    {
        var number = Math.floor(Math.random() * 45) + 1;

        for(var i = 0; i < MAX; i++){
            if(arr[i] == null){
                arr[i] = number;
                count++;
                break;
            }else{
                if(arr[i] == number){
                    break;
                }else{
                    if(arr[i] != null){
                        continue;
                    }
                }
            }
        }
    }

    return arr;
}

// 정렬
function sort(arr, size){
    for(var i = 0; i < size; i++){
        for(var j = i + 1; j < size; j++){
            if(parseInt(arr[i]) > parseInt(arr[j]))
            {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

// 텍스트 형태의 번호를 뿌려준다.
function displayTextNumber(arr){
    var pos = $(".lotto_text_list");

    pos.html("");
    pos.append(`<li>${arr}</li>`);
}

// 중복이 있는 여러개의 번호를 만든다.
function createMultipleNumberOnOverlap(size){
    var list = [];

    while(list.length < size)
    {
        var arr = createNumber();
        sort(arr, arr.length);
        list.push(arr);
    }

    return list;
}

// 중복이 없는 여러개의 번호를 만든다.
function createMultipleNumber(size){

    var list = [];

    while(list.length < size)
    {
        var overlapCheck = false;
        var arr = createNumber();
        sort(arr, arr.length);

        var checkd2 = $("#numberOverlap2").is(":checked");
        var overlapFlag = checkd2 == true ? lottoPrevNumberFilter(arr) : false;

        if(overlapFlag != true)
        {
            if(list.length == 0){
                list.push(arr);
            }else{
                
                for(var i = 0; i < list.length; i++){
                    var checkCount = 0;
                    var arrSize = arr.length;
                    for(var j = 0; j < arrSize; j++){
                        var tempArray = list[i];
                        if(tempArray[j] == arr[j]){
                            checkCount++;
                        } 
                    }

                    if(checkCount == arrSize){
                        overlapCheck = true;
                        break;
                    }
                }

                if(overlapCheck == false){
                    list.push(arr);
                }
            }
        }
    }

    return list;
}

// 역대 당첨회차 번호를 걸러준다.
function lottoPrevNumberFilter(arr){

    var overlapFlag = false;
    var arraySize = lottoArray.length;

    for(var i = 0; i < arraySize; i++){
        var temp = lottoArray[i];
        var count = 0;

        for(var j = 0; j < arr.length; j++){
            
            if(arr[j] == temp[j]){
                count++;
            }else{
                break;
            }
        }

        if(count == arr.length){
            overlapFlag = true;
            break;
        }
    }

    return overlapFlag;
}

// 텍스트 형태의 번호를 뿌려준다.
function displayTextNumberMulti(list){
    var pos = $(".lotto_text_list");

    pos.html("");

    for(var i = 0; i < list.length; i++){
        var arr = list[i];
        var str = "<span>" + arr[0] + "</span>";

        for(var j = 1; j < arr.length; j++){
            str += `<span>${arr[j]}</span>`
        }
        pos.append(`<li>${str}</li>`);
    }
}

// 당첨번호의 공을 그려준다.
function drawBallTitle(){

    var pos = $(".numbers ul");
    var list = lottoArray[0];
    var allStr = "";
    pos.html("");
    
    for(var i = 0; i < list.length; i++){
        var ballNumber = Math.floor(Math.random() * 9);
        var str = `<div><div class="title_ball_number">${list[i]}</div><img src="./img/ball_${ballNumber}.png" alt="로또 공 이미지"></div>`;

        if(i == list.length - 1){
            var plus = `<span>+</span>`;
            pos.append(`<li class="title_number_center">${plus}</li>`);
        }
        pos.append(`<li>${str}</li>`);
    }
    
}

// 공을 그려준다.
function drawBall(arr){
    
    var pos = $(".lotto_img_list");
    var allStr = "";
    var colorArr = new Array();

    pos.html("");
    for(var i = 0; i < arr.length; i++){
        var ballNumber = Math.floor(Math.random() * 9);
        var str = `<div><div class="ball_number">${arr[i]}</div><img src="./img/ball_${ballNumber}.png" alt="로또 공 이미지"></div>`;
        allStr += str;
        colorArr.push(ballNumber);
    }
    pos.append(`<li><input class="numberAddBtn" type="button" value="추가" onclick="createToUserNumberAdd('${arr}','${colorArr}');">${allStr}</li>`);
}

// 모든 공을 그려준다.
function drawBallAll(list){

    var pos = $(".lotto_img_list");
    
    pos.html("");

    for(var j = 0; j < list.length; j++)
    {
        var allStr = "";
        var arr = list[j];
        var colorArr = new Array();

        for(var i = 0; i < arr.length; i++){
            var ballNumber = Math.floor(Math.random() * 9);
            var str = `<div><div class="ball_number">${arr[i]}</div><img src="./img/ball_${ballNumber}.png" alt="로또 공 이미지"></div>`;
            colorArr.push(ballNumber);
            allStr += str;
        }
        pos.append(`<li><input class="numberAddBtn" type="button" value="추가" onclick="createToUserNumberAdd('${arr}','${colorArr}');"><span>${j + 1}. </span>${allStr}</li>`);
    }
}


// 로또 홈페이지에 당첨 번호를 가져온다.
function getLottoNumber(){

    var lottoNextNumber = "949";
    $.ajax({
        url : `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${lottoNextNumber}`,
        dataType : "jsonp",
        success: function(data) {
            console.log(data);
            alert(data);
        }
    });
}



// 엑셀 파일을 읽어온다.
function readExcel(){
    let input = event.target;      // input에 들어간 파일을 타겟으로 삼는다.
    let reader = new FileReader(); // 파일을 읽어줄 객체를 하나 만든다.

    reader.onload = function(){    // 
        
        let data = reader.result;   // 파일의 반환값을 받는다.
        let workBook = XLSX.read(data,{type:'binary'}); // 반환값을 바이너리 타입으로 받는다.

        // 열의 첫 번째 값을 키값으로 삼아 JSON 타입의 데이터로 받는다.
        let rows = XLSX.utils.sheet_to_json(workBook.Sheets["Sheet1"]) 

        // workBook.SheetNames.forEach(function(sheetName){
        //     console.log("sheetName: " + sheetName);

        //     let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
        //     console.log(JSON.stringify(rows));

        //     jsonArray = JSON.parse(JSON.stringify(rows));
        // })
        //alert(JSON.stringify(jsonArray[0]));
      
        var sizes = rows.length

        for(var i = 0; i < sizes; i++){
            var MAX = 8;
            var temp = rows[i];
            var miniArray = new Array();

            var str = "lottoArray.push(new Array(";
            var str2 = "";
            for(var j = 1; j < MAX; j++){
                var numbers = temp[j.toString()];
                miniArray.push(numbers);

                if(j != MAX - 1){
                    str2 += numbers + ",";
                }else{
                    str2 += numbers + "));";
                }
            }

            console.log(str + str2);
            lottoArray.push(miniArray);
        }
        console.log(lottoArray);
    };
    reader.readAsBinaryString(input.files[0])
}

// 번호 저장.
function userNumberSave(){

    var indexs = $(".my_number_save ul li");
    var strDate = "";

    for(var i = 0; i < indexs.length; i++){
        var numbers = $(`.my_number_save ul li:nth-child(${i + 1}) > div .user_number_add`);
        var numList = "";
        for(var j = 0; j < numbers.length; j++){

            if(j == numbers.length - 1){
                numList += numbers[j].innerText;
                break;
            }
            numList += numbers[j].innerText + ",";
        }
        strDate += numList + "/";
    }
    localStorage.setItem("myLotto",strDate);
}

// 번호 불러오기
function userNumberLoad(){
    var myLotto = localStorage.getItem("myLotto");

    if(myLotto != null)
    {
        var lottoList = myLotto.split("/");

        for(var i = 0; i < lottoList.length - 1; i++){
            var addNumbers = $(".my_number_save ul");
            var allStr = "";

            var numbers = lottoList[i].split(",");
            
            for(var j = 0; j < numbers.length; j++){
                var ballNumber = Math.floor(Math.random() * 9);
                var str = `<div><div class="user_number_add">${numbers[j]}</div><img class="mini_size" src="./img/ball_${ballNumber}.png" alt="로또 공 이미지"></div>`;
                allStr += str;
            }
            addNumbers.append(`<li><div>${allStr}</div><button id="delete_btn" class="delete_btn">X</button></li>`);
        }
    }
}

// 유저가 번호를 추가한다.
function userNumberCreate(){
    var pass = false;
    var arr = new Array();
    
    $(".addNumberCreate").each(function(){
        var myNumber = $(this).val();

        if(myNumber > 0 && myNumber < 46){
            arr.push($(this).val());
        }else{
            pass = true;
            userNumberInClear();
            alert("1부터 45사이의 숫자를 입력해주세요.");
            return false;
        }
    })

    if(pass == false){

        var check = arrOverlapCheck(arr);

        if(check == false){
            alert("입력한 값중 중복된 값이 있습니다.");
        }else{
            var addNumbers = $(".my_number_save ul");
            var allStr = "";

            sort(arr, arr.length);

            for(var i = 0; i < arr.length; i++){
                var ballNumber = Math.floor(Math.random() * 9);
                var str = `<div><div class="user_number_add">${arr[i]}</div><img class="mini_size" src="./img/ball_${ballNumber}.png" alt="로또 공 이미지"></div>`;
                allStr += str;
            }
            addNumbers.append(`<li><div>${allStr}</div><button id="delete_btn" class="delete_btn">X</button></li>`);
            userNumberInClear();

            userNumberSave();
        }
    }
    
}

// 사용자가 직접 입력한 값의 중복 체크
function arrOverlapCheck(arr){

    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length; j++){

            if(i != j){
                if(arr[i] == arr[j]){
                    return false;
                }
            }
            
        }
    }
    return true;
}

// 사용자 입력칸 클리어.
function userNumberInClear(){
    $(".addNumberCreate").each(function(){
        $(this).val("");
    })
}

// 생성된 번호를 저장할 장소로 추가 시킨다.
function createToUserNumberAdd(arrStr, colorArrStr){

    var arr = arrStr.split(",");
    var colorArr = colorArrStr.split(",");
    var addNumbers = $(".my_number_save ul");
    var allStr = "";

    for(var i = 0; i < arr.length; i++){
        var ballNumber = Math.floor(Math.random() * 9);
        var str = `<div><div class="user_number_add">${arr[i]}</div><img class="mini_size" src="./img/ball_${colorArr[i]}.png" alt="로또 공 이미지"></div>`;
        allStr += str;
    }
    addNumbers.append(`<li><div>${allStr}</div><button class="delete_btn">X</button></li>`);
    userNumberSave();
}


// 삭제 버튼을 통해 저장한 번호를 삭제.
function saveNumberBallToDelete(myButton){
    $(document).on("click",".delete_btn",function(){
        $(this).parent().remove();
        userNumberSave();
    });
}

// 중복체크 제거에 대한 설명 박스 출력
function tipBoxDisplay(){
    $(".tip_1").on("mouseover",function(){
        $(".tip_text").css("display","flex");
    });
    $(".tip_2").on("mouseover",function(){
        $(".tip_text2").css("display","flex");
    });

    $(".tip_1").on("mouseout",function(){
        $(".tip_text").css("display","none");
    });
    $(".tip_2").on("mouseout",function(){
        $(".tip_text2").css("display","none");
    });
}

//getLottoNumber();


var lottoArray = new Array();

function abcd(data){
    console.log("data");
}

// 최신 당첨 번호를 가져온다.
function getLatestWinningNumber(){
    //https://smok95.github.io/lotto/results/latest.json

    $(document).ready(function(){
        $.ajax({
            crossOrigin : true,
            dataType : "json",
            url : "https://smok95.github.io/lotto/results/latest.json?callback=abcd",
            success : function(data) {
                console.log(data);
            }
        })
    })
    // $.ajax({
    //     crossOrigin : true,
    //     dataType : "json",
    //     url : "https://smok95.github.io/lotto/results/latest.json",
    //     success : function(data) {
    //         console.log("test");
    //         alert(data);
    //         console.log(data);
    //     }
    // })

    // $.ajax({
    //     dataType : 'jsonp',
    //     jsonpCallback: "callback",
    //     url: "https://smok95.github.io/lotto/results/latest.json",
    //     success: function(data) {
    //       console.log(data);
    //     }
    //   });
}

// 맨위가 최신 회차임.
lottoArray.push(new Array(11,20,29,31,33,42,43));
lottoArray.push(new Array(2,18,24,30,32,45,14));
lottoArray.push(new Array(1,14,15,24,40,41,35));
lottoArray.push(new Array(2,9,10,16,35,37,1));
lottoArray.push(new Array(4,15,24,35,36,40,1));
lottoArray.push(new Array(10,11,20,21,25,41,40));
lottoArray.push(new Array(4,9,23,26,29,33,8));
lottoArray.push(new Array(1,9,26,28,30,41,32));
lottoArray.push(new Array(7,9,22,27,37,42,34));
lottoArray.push(new Array(4,12,22,24,33,41,38));
lottoArray.push(new Array(2,12,30,31,39,43,38));
lottoArray.push(new Array(3,4,15,22,28,40,10));
lottoArray.push(new Array(14,21,35,36,40,44,30));
lottoArray.push(new Array(13,18,30,31,38,41,5));
lottoArray.push(new Array(3,8,17,20,27,35,26));
lottoArray.push(new Array(9,18,19,30,34,40,20));
lottoArray.push(new Array(9,10,15,30,33,37,26));
lottoArray.push(new Array(2,13,16,19,32,33,42));
lottoArray.push(new Array(1,8,13,36,44,45,39));
lottoArray.push(new Array(10,12,18,35,42,43,39));
lottoArray.push(new Array(12,14,25,27,39,40,35));
lottoArray.push(new Array(3,15,20,22,24,41,11));
lottoArray.push(new Array(4,11,28,39,42,45,6));
lottoArray.push(new Array(4,8,10,16,31,36,9));
lottoArray.push(new Array(2,10,13,22,29,40,26));
lottoArray.push(new Array(7,11,13,17,18,29,43));
lottoArray.push(new Array(4,10,20,32,38,44,18));
lottoArray.push(new Array(1,3,30,33,36,39,12));
lottoArray.push(new Array(23,27,29,31,36,45,37));
lottoArray.push(new Array(1,6,15,36,37,38,5));
lottoArray.push(new Array(14,15,23,25,35,43,32));
lottoArray.push(new Array(8,21,25,38,39,44,28));
lottoArray.push(new Array(7,9,12,15,19,23,4));
lottoArray.push(new Array(3,4,10,20,28,44,30));
lottoArray.push(new Array(4,15,22,38,41,43,26));
lottoArray.push(new Array(10,16,18,20,25,31,6));
lottoArray.push(new Array(13,24,32,34,39,42,4));
lottoArray.push(new Array(3,11,34,42,43,44,13));
lottoArray.push(new Array(3,17,18,23,36,41,26));
lottoArray.push(new Array(2,6,13,17,27,43,36));
lottoArray.push(new Array(5,7,12,22,28,41,1));
lottoArray.push(new Array(2,3,26,33,34,43,29));
lottoArray.push(new Array(9,14,17,18,42,44,35));
lottoArray.push(new Array(7,11,12,31,33,38,5));
lottoArray.push(new Array(1,3,23,24,27,43,34));
lottoArray.push(new Array(6,21,22,32,35,36,17));
lottoArray.push(new Array(2,6,11,13,22,37,14));
lottoArray.push(new Array(16,19,24,33,42,44,27));
lottoArray.push(new Array(6,14,16,21,27,37,40));
lottoArray.push(new Array(5,8,18,21,22,38,10));
lottoArray.push(new Array(4,5,12,14,32,42,35));
lottoArray.push(new Array(1,11,17,27,35,39,31));
lottoArray.push(new Array(7,24,29,30,34,35,33));
lottoArray.push(new Array(3,16,21,22,23,44,30));
lottoArray.push(new Array(21,27,29,38,40,44,37));
lottoArray.push(new Array(2,5,14,28,31,32,20));
lottoArray.push(new Array(3,4,16,27,38,40,20));
lottoArray.push(new Array(2,6,8,26,43,45,11));
lottoArray.push(new Array(2,15,16,21,22,28,45));
lottoArray.push(new Array(7,19,23,24,36,39,30));
lottoArray.push(new Array(5,18,20,23,30,34,21));
lottoArray.push(new Array(7,13,16,18,35,38,14));
lottoArray.push(new Array(8,19,20,21,33,39,37));
lottoArray.push(new Array(18,21,28,35,37,42,17));
lottoArray.push(new Array(6,7,12,22,26,36,29));
lottoArray.push(new Array(5,12,25,26,38,45,23));
lottoArray.push(new Array(16,26,31,38,39,41,23));
lottoArray.push(new Array(19,32,37,40,41,43,45));
lottoArray.push(new Array(1,15,17,23,25,41,10));
lottoArray.push(new Array(4,9,17,18,26,42,36));
lottoArray.push(new Array(9,13,28,31,39,41,19));
lottoArray.push(new Array(1,4,14,18,29,37,6));
lottoArray.push(new Array(3,13,29,38,39,42,26));
lottoArray.push(new Array(3,7,12,31,34,38,32));
lottoArray.push(new Array(8,14,17,27,36,45,10));
lottoArray.push(new Array(19,23,28,37,42,45,2));
lottoArray.push(new Array(1,3,24,27,39,45,31));
lottoArray.push(new Array(4,14,23,28,37,45,17));
lottoArray.push(new Array(9,18,32,33,37,44,22));
lottoArray.push(new Array(18,34,39,43,44,45,23));
lottoArray.push(new Array(4,18,20,26,27,32,9));
lottoArray.push(new Array(7,17,19,23,24,45,38));
lottoArray.push(new Array(1,4,10,14,15,35,20));
lottoArray.push(new Array(2,6,11,16,25,31,3));
lottoArray.push(new Array(5,17,18,22,23,43,12));
lottoArray.push(new Array(5,16,21,26,34,42,24));
lottoArray.push(new Array(19,22,30,34,39,44,36));
lottoArray.push(new Array(1,15,19,23,28,42,32));
lottoArray.push(new Array(3,5,12,13,33,39,38));
lottoArray.push(new Array(2,4,30,32,33,43,29));
lottoArray.push(new Array(2,6,12,26,30,34,38));
lottoArray.push(new Array(21,25,30,32,40,42,31));
lottoArray.push(new Array(2,6,20,27,37,39,4));
lottoArray.push(new Array(12,17,28,41,43,44,25));
lottoArray.push(new Array(14,17,19,22,24,40,41));
lottoArray.push(new Array(9,15,29,34,37,39,12));
lottoArray.push(new Array(3,15,22,32,33,45,2));
lottoArray.push(new Array(3,7,10,13,25,36,32));
lottoArray.push(new Array(16,21,28,35,39,43,12));
lottoArray.push(new Array(10,34,38,40,42,43,32));
lottoArray.push(new Array(11,17,19,21,22,25,24));
lottoArray.push(new Array(4,8,18,25,27,32,42));
lottoArray.push(new Array(8,22,35,38,39,41,24));
lottoArray.push(new Array(9,13,32,38,39,43,23));
lottoArray.push(new Array(6,10,16,28,34,38,43));
lottoArray.push(new Array(10,24,40,41,43,44,17));
lottoArray.push(new Array(8,15,17,19,43,44,7));
lottoArray.push(new Array(20,25,31,32,36,43,3));
lottoArray.push(new Array(2,8,23,26,27,44,13));
lottoArray.push(new Array(11,17,28,30,33,35,9));
lottoArray.push(new Array(14,18,22,26,31,44,40));
lottoArray.push(new Array(16,20,24,28,36,39,5));
lottoArray.push(new Array(5,13,17,29,34,39,3));
lottoArray.push(new Array(1,2,16,22,38,39,34));
lottoArray.push(new Array(12,16,26,28,30,42,22));
lottoArray.push(new Array(5,18,30,41,43,45,13));
lottoArray.push(new Array(1,16,29,33,40,45,6));
lottoArray.push(new Array(7,8,13,15,33,45,18));
lottoArray.push(new Array(19,21,30,33,34,42,4));
lottoArray.push(new Array(14,26,32,36,39,42,38));
lottoArray.push(new Array(5,11,14,30,33,38,24));
lottoArray.push(new Array(2,4,11,28,29,43,27));
lottoArray.push(new Array(3,9,11,12,13,19,35));
lottoArray.push(new Array(9,14,17,33,36,38,20));
lottoArray.push(new Array(2,25,28,30,33,45,6));
lottoArray.push(new Array(1,9,11,14,26,28,19));
lottoArray.push(new Array(9,10,13,28,38,45,35));
lottoArray.push(new Array(6,8,18,35,42,43,3));
lottoArray.push(new Array(12,18,30,39,41,42,19));
lottoArray.push(new Array(13,14,19,26,40,43,30));
lottoArray.push(new Array(3,10,16,19,31,39,9));
lottoArray.push(new Array(5,6,16,18,37,38,17));
lottoArray.push(new Array(4,5,31,35,43,45,29));
lottoArray.push(new Array(4,7,13,29,31,39,18));
lottoArray.push(new Array(5,11,12,29,33,44,14));
lottoArray.push(new Array(13,16,24,25,33,36,42));
lottoArray.push(new Array(8,15,21,31,33,38,42));
lottoArray.push(new Array(7,9,24,29,34,38,26));
lottoArray.push(new Array(12,18,24,26,39,40,15));
lottoArray.push(new Array(9,18,20,24,27,36,12));
lottoArray.push(new Array(1,12,13,24,29,44,16));
lottoArray.push(new Array(10,21,22,30,35,42,6));
lottoArray.push(new Array(16,25,33,38,40,45,15));
lottoArray.push(new Array(14,15,25,28,29,30,3));
lottoArray.push(new Array(3,9,12,13,25,43,34));
lottoArray.push(new Array(12,18,19,29,31,39,7));
lottoArray.push(new Array(17,21,25,26,27,36,4));
lottoArray.push(new Array(2,21,28,38,42,45,30));
lottoArray.push(new Array(11,30,34,35,42,44,27));
lottoArray.push(new Array(1,3,12,14,16,43,10));
lottoArray.push(new Array(8,11,19,21,36,45,25));
lottoArray.push(new Array(5,10,13,21,39,43,11));
lottoArray.push(new Array(6,11,15,17,23,40,39));
lottoArray.push(new Array(15,21,31,32,41,43,24));
lottoArray.push(new Array(6,10,18,25,34,35,33));
lottoArray.push(new Array(14,20,23,31,37,38,27));
lottoArray.push(new Array(3,12,13,18,31,32,42));
lottoArray.push(new Array(1,10,13,26,32,36,9));
lottoArray.push(new Array(5,9,14,26,30,43,2));
lottoArray.push(new Array(10,11,12,18,24,42,27));
lottoArray.push(new Array(17,25,28,37,43,44,2));
lottoArray.push(new Array(1,4,10,12,28,45,26));
lottoArray.push(new Array(12,17,23,34,42,45,33));
lottoArray.push(new Array(2,10,14,22,32,36,41));
lottoArray.push(new Array(5,22,31,32,39,45,36));
lottoArray.push(new Array(1,21,26,36,40,41,5));
lottoArray.push(new Array(3,10,13,26,34,38,36));
lottoArray.push(new Array(6,7,18,19,30,38,13));
lottoArray.push(new Array(10,15,21,35,38,43,31));
lottoArray.push(new Array(2,7,19,25,29,36,16));
lottoArray.push(new Array(2,10,12,31,33,42,32));
lottoArray.push(new Array(3,8,19,27,30,41,12));
lottoArray.push(new Array(2,6,7,12,19,45,38));
lottoArray.push(new Array(2,10,11,19,35,39,29));
lottoArray.push(new Array(5,6,13,16,27,28,9));
lottoArray.push(new Array(12,15,16,20,24,30,38));
lottoArray.push(new Array(4,6,15,25,26,33,40));
lottoArray.push(new Array(3,10,23,24,31,39,22));
lottoArray.push(new Array(14,15,16,17,38,45,36));
lottoArray.push(new Array(6,18,31,34,38,45,20));
lottoArray.push(new Array(11,16,18,19,24,39,43));
lottoArray.push(new Array(15,17,19,21,27,45,16));
lottoArray.push(new Array(6,12,19,24,34,41,4));
lottoArray.push(new Array(6,21,35,36,37,41,11));
lottoArray.push(new Array(6,12,17,21,34,37,18));
lottoArray.push(new Array(8,9,18,21,28,40,20));
lottoArray.push(new Array(11,12,29,33,38,42,17));
lottoArray.push(new Array(12,15,18,28,34,42,9));
lottoArray.push(new Array(8,12,19,21,31,35,44));
lottoArray.push(new Array(5,6,11,14,21,41,32));
lottoArray.push(new Array(6,10,17,18,21,29,30));
lottoArray.push(new Array(1,9,12,23,39,43,34));
lottoArray.push(new Array(5,7,11,16,41,45,4));
lottoArray.push(new Array(7,27,29,30,38,44,4));
lottoArray.push(new Array(5,15,20,31,34,42,22));
lottoArray.push(new Array(9,30,34,35,39,41,21));
lottoArray.push(new Array(1,3,8,12,42,43,33));
lottoArray.push(new Array(7,22,24,31,34,36,15));
lottoArray.push(new Array(3,8,16,32,34,43,10));
lottoArray.push(new Array(1,3,12,21,26,41,16));
lottoArray.push(new Array(4,7,11,24,42,45,30));
lottoArray.push(new Array(10,22,27,31,42,43,12));
lottoArray.push(new Array(9,33,36,40,42,43,32));
lottoArray.push(new Array(5,9,12,30,39,43,24));
lottoArray.push(new Array(6,7,11,17,33,44,1));
lottoArray.push(new Array(10,14,16,18,27,28,4));
lottoArray.push(new Array(13,14,26,28,30,36,37));
lottoArray.push(new Array(2,8,17,24,29,31,32));
lottoArray.push(new Array(2,17,19,24,37,41,3));
lottoArray.push(new Array(4,16,20,33,40,43,7));
lottoArray.push(new Array(3,4,16,20,28,44,17));
lottoArray.push(new Array(1,2,15,19,24,36,12));
lottoArray.push(new Array(12,14,24,26,34,45,41));
lottoArray.push(new Array(3,10,13,22,31,32,29));
lottoArray.push(new Array(7,9,12,14,23,28,17));
lottoArray.push(new Array(3,12,33,36,42,45,25));
lottoArray.push(new Array(1,2,3,9,12,23,10));
lottoArray.push(new Array(10,15,18,21,34,41,43));
lottoArray.push(new Array(15,19,21,34,41,44,10));
lottoArray.push(new Array(8,10,13,36,37,40,6));
lottoArray.push(new Array(5,21,27,34,44,45,16));
lottoArray.push(new Array(4,8,9,16,17,19,31));
lottoArray.push(new Array(7,22,29,33,34,35,30));
lottoArray.push(new Array(23,27,28,38,42,43,36));
lottoArray.push(new Array(13,15,18,24,27,41,11));
lottoArray.push(new Array(2,11,17,18,21,27,6));
lottoArray.push(new Array(5,10,13,27,37,41,4));
lottoArray.push(new Array(6,16,37,38,41,45,18));
lottoArray.push(new Array(11,24,32,33,35,40,13));
lottoArray.push(new Array(2,4,5,17,27,32,43));
lottoArray.push(new Array(2,7,13,25,42,45,39));
lottoArray.push(new Array(4,10,14,15,18,22,39));
lottoArray.push(new Array(11,17,21,26,36,45,16));
lottoArray.push(new Array(3,6,10,30,34,37,36));
lottoArray.push(new Array(7,8,10,19,21,31,20));
lottoArray.push(new Array(1,11,21,23,34,44,24));
lottoArray.push(new Array(6,7,19,21,41,43,38));
lottoArray.push(new Array(2,8,33,35,37,41,14));
lottoArray.push(new Array(20,30,33,35,36,44,22));
lottoArray.push(new Array(12,14,21,30,39,43,45));
lottoArray.push(new Array(1,28,35,41,43,44,31));
lottoArray.push(new Array(1,12,29,34,36,37,41));
lottoArray.push(new Array(4,8,13,19,20,43,26));
lottoArray.push(new Array(4,11,20,23,32,39,40));
lottoArray.push(new Array(2,11,19,25,28,32,44));
lottoArray.push(new Array(2,6,13,16,29,30,21));
lottoArray.push(new Array(2,7,27,33,41,44,10));
lottoArray.push(new Array(1,7,22,33,37,40,20));
lottoArray.push(new Array(2,5,15,18,19,23,44));
lottoArray.push(new Array(17,20,30,31,33,45,19));
lottoArray.push(new Array(11,15,24,35,37,45,42));
lottoArray.push(new Array(3,4,9,24,25,33,10));
lottoArray.push(new Array(10,18,30,36,39,44,32));
lottoArray.push(new Array(2,10,16,19,34,45,1));
lottoArray.push(new Array(2,12,19,24,39,44,35));
lottoArray.push(new Array(3,4,6,10,28,30,37));
lottoArray.push(new Array(1,6,17,22,28,45,23));
lottoArray.push(new Array(1,4,8,23,33,42,45));
lottoArray.push(new Array(10,28,31,33,41,44,21));
lottoArray.push(new Array(3,13,16,24,26,29,9));
lottoArray.push(new Array(3,10,14,16,36,38,35));
lottoArray.push(new Array(11,23,28,29,30,44,13));
lottoArray.push(new Array(4,5,8,16,21,29,3));
lottoArray.push(new Array(3,11,13,21,33,37,18));
lottoArray.push(new Array(2,5,8,11,33,39,31));
lottoArray.push(new Array(1,7,16,18,34,38,21));
lottoArray.push(new Array(4,18,26,33,34,38,14));
lottoArray.push(new Array(7,15,20,25,33,43,12));
lottoArray.push(new Array(1,6,11,28,34,42,30));
lottoArray.push(new Array(3,11,14,15,32,36,44));
lottoArray.push(new Array(15,27,33,35,43,45,16));
lottoArray.push(new Array(24,25,33,34,38,39,43));
lottoArray.push(new Array(7,17,19,30,36,38,34));
lottoArray.push(new Array(5,15,22,23,34,35,2));
lottoArray.push(new Array(1,8,10,13,28,42,45));
lottoArray.push(new Array(7,12,15,24,25,43,13));
lottoArray.push(new Array(6,7,12,28,38,40,18));
lottoArray.push(new Array(1,11,15,17,25,39,40));
lottoArray.push(new Array(6,13,20,27,28,40,15));
lottoArray.push(new Array(17,23,27,35,38,43,2));
lottoArray.push(new Array(21,24,27,29,43,44,7));
lottoArray.push(new Array(4,10,19,29,32,42,30));
lottoArray.push(new Array(3,5,7,14,26,34,35));
lottoArray.push(new Array(4,5,6,12,25,37,45));
lottoArray.push(new Array(12,15,24,36,41,44,42));
lottoArray.push(new Array(1,8,17,34,39,45,27));
lottoArray.push(new Array(1,8,11,15,18,45,7));
lottoArray.push(new Array(9,10,14,25,27,31,11));
lottoArray.push(new Array(7,10,17,29,33,44,5));
lottoArray.push(new Array(8,21,28,31,36,45,43));
lottoArray.push(new Array(7,9,10,13,31,35,24));
lottoArray.push(new Array(11,18,26,27,40,41,25));
lottoArray.push(new Array(7,8,20,29,33,38,9));
lottoArray.push(new Array(12,14,15,24,27,32,3));
lottoArray.push(new Array(15,17,25,37,42,43,13));
lottoArray.push(new Array(2,4,6,11,17,28,16));
lottoArray.push(new Array(5,6,11,17,38,44,13));
lottoArray.push(new Array(10,20,33,36,41,44,5));
lottoArray.push(new Array(3,5,8,19,38,42,20));
lottoArray.push(new Array(5,6,9,11,15,37,26));
lottoArray.push(new Array(2,3,12,20,27,38,40));
lottoArray.push(new Array(4,9,23,33,39,44,14));
lottoArray.push(new Array(7,18,19,27,29,42,45));
lottoArray.push(new Array(8,19,25,28,32,36,37));
lottoArray.push(new Array(10,14,19,39,40,43,23));
lottoArray.push(new Array(3,7,14,16,31,40,39));
lottoArray.push(new Array(7,37,38,39,40,44,18));
lottoArray.push(new Array(16,21,26,31,36,43,6));
lottoArray.push(new Array(5,6,26,27,38,39,1));
lottoArray.push(new Array(3,13,15,40,41,44,20));
lottoArray.push(new Array(11,12,16,26,29,44,18));
lottoArray.push(new Array(3,4,7,11,31,41,35));
lottoArray.push(new Array(3,21,22,33,41,42,20));
lottoArray.push(new Array(13,19,28,37,38,43,4));
lottoArray.push(new Array(5,16,21,23,24,30,29));
lottoArray.push(new Array(2,9,24,41,43,45,30));
lottoArray.push(new Array(1,4,16,26,40,41,31));
lottoArray.push(new Array(5,13,17,23,28,36,8));
lottoArray.push(new Array(15,24,31,32,33,40,13));
lottoArray.push(new Array(8,17,18,24,39,45,32));
lottoArray.push(new Array(11,18,21,36,37,43,12));
lottoArray.push(new Array(14,15,18,21,26,35,23));
lottoArray.push(new Array(6,15,22,23,25,32,40));
lottoArray.push(new Array(7,18,22,24,31,34,6));
lottoArray.push(new Array(3,16,22,37,38,44,23));
lottoArray.push(new Array(6,7,15,16,20,31,26));
lottoArray.push(new Array(11,13,25,26,29,33,32));
lottoArray.push(new Array(4,10,11,12,20,27,38));
lottoArray.push(new Array(9,12,19,20,39,41,13));
lottoArray.push(new Array(15,18,21,32,35,44,6));
lottoArray.push(new Array(1,2,4,23,31,34,8));
lottoArray.push(new Array(8,17,21,24,27,31,15));
lottoArray.push(new Array(19,28,31,38,43,44,1));
lottoArray.push(new Array(1,7,12,15,23,42,11));
lottoArray.push(new Array(2,9,22,25,31,45,12));
lottoArray.push(new Array(13,14,26,33,40,43,15));
lottoArray.push(new Array(3,6,7,20,21,39,13));
lottoArray.push(new Array(1,7,19,26,27,35,16));
lottoArray.push(new Array(7,13,30,39,41,45,25));
lottoArray.push(new Array(9,15,16,21,28,34,24));
lottoArray.push(new Array(1,2,6,16,19,42,9));
lottoArray.push(new Array(2,16,17,32,39,45,40));
lottoArray.push(new Array(6,8,13,30,35,40,21));
lottoArray.push(new Array(8,16,25,30,42,43,15));
lottoArray.push(new Array(4,5,11,12,24,27,28));
lottoArray.push(new Array(5,13,18,23,40,45,3));
lottoArray.push(new Array(10,17,18,19,23,27,35));
lottoArray.push(new Array(8,21,25,39,40,44,18));
lottoArray.push(new Array(7,8,11,16,41,44,35));
lottoArray.push(new Array(6,9,18,19,25,33,40));
lottoArray.push(new Array(2,22,27,33,36,37,14));
lottoArray.push(new Array(14,18,20,23,28,36,33));
lottoArray.push(new Array(4,8,27,34,39,40,13));
lottoArray.push(new Array(4,8,18,19,39,44,41));
lottoArray.push(new Array(8,14,23,36,38,39,13));
lottoArray.push(new Array(1,5,6,14,20,39,22));
lottoArray.push(new Array(1,2,7,9,10,38,42));
lottoArray.push(new Array(2,6,18,21,33,34,30));
lottoArray.push(new Array(2,19,25,26,27,43,28));
lottoArray.push(new Array(13,14,22,27,30,38,2));
lottoArray.push(new Array(2,16,19,31,34,35,37));
lottoArray.push(new Array(5,11,14,27,29,36,44));
lottoArray.push(new Array(5,12,17,29,34,35,27));
lottoArray.push(new Array(4,12,24,33,38,45,22));
lottoArray.push(new Array(8,10,23,24,35,43,37));
lottoArray.push(new Array(3,4,12,14,25,43,17));
lottoArray.push(new Array(8,24,28,35,38,40,5));
lottoArray.push(new Array(2,8,13,25,28,37,3));
lottoArray.push(new Array(9,10,13,24,33,38,28));
lottoArray.push(new Array(2,5,6,13,28,44,43));
lottoArray.push(new Array(8,13,14,30,38,39,5));
lottoArray.push(new Array(20,30,36,38,41,45,23));
lottoArray.push(new Array(6,8,28,33,38,39,22));
lottoArray.push(new Array(2,8,15,22,25,41,30));
lottoArray.push(new Array(14,21,29,31,32,37,17));
lottoArray.push(new Array(2,7,12,15,21,34,5));
lottoArray.push(new Array(6,7,10,16,38,41,4));
lottoArray.push(new Array(7,18,30,39,40,41,36));
lottoArray.push(new Array(8,17,27,33,40,44,24));
lottoArray.push(new Array(2,12,14,33,40,41,25));
lottoArray.push(new Array(3,5,14,20,42,44,33));
lottoArray.push(new Array(5,7,9,11,32,35,33));
lottoArray.push(new Array(5,7,20,22,37,42,39));
lottoArray.push(new Array(5,12,14,32,34,42,16));
lottoArray.push(new Array(16,17,22,31,34,37,33));
lottoArray.push(new Array(10,11,15,25,35,41,13));
lottoArray.push(new Array(2,8,20,30,33,34,6));
lottoArray.push(new Array(14,15,16,19,25,43,2));
lottoArray.push(new Array(2,4,20,34,35,43,14));
lottoArray.push(new Array(3,13,18,33,37,45,1));
lottoArray.push(new Array(11,18,21,26,38,43,29));
lottoArray.push(new Array(1,12,26,27,29,33,42));
lottoArray.push(new Array(3,6,13,23,24,35,1));
lottoArray.push(new Array(1,3,17,20,31,44,40));
lottoArray.push(new Array(1,10,15,16,32,41,28));
lottoArray.push(new Array(4,5,6,25,26,43,41));
lottoArray.push(new Array(4,10,18,27,40,45,38));
lottoArray.push(new Array(14,19,25,26,27,34,2));
lottoArray.push(new Array(5,10,16,17,31,32,21));
lottoArray.push(new Array(4,11,13,17,20,31,33));
lottoArray.push(new Array(5,7,18,37,42,45,20));
lottoArray.push(new Array(1,4,20,23,29,45,28));
lottoArray.push(new Array(11,12,25,32,44,45,23));
lottoArray.push(new Array(12,15,19,26,40,43,29));
lottoArray.push(new Array(4,20,26,28,35,40,31));
lottoArray.push(new Array(12,20,23,28,30,44,43));
lottoArray.push(new Array(11,17,21,24,26,36,12));
lottoArray.push(new Array(13,14,17,32,41,42,6));
lottoArray.push(new Array(2,7,17,28,29,39,37));
lottoArray.push(new Array(1,10,20,32,35,40,43));
lottoArray.push(new Array(3,6,20,24,27,44,25));
lottoArray.push(new Array(1,7,14,20,34,37,41));
lottoArray.push(new Array(29,31,35,38,40,44,17));
lottoArray.push(new Array(1,12,13,21,32,45,14));
lottoArray.push(new Array(6,7,15,22,34,39,28));
lottoArray.push(new Array(8,17,20,27,37,43,6));
lottoArray.push(new Array(4,24,25,27,34,35,2));
lottoArray.push(new Array(5,17,21,25,36,44,10));
lottoArray.push(new Array(13,18,26,31,34,44,12));
lottoArray.push(new Array(5,6,19,26,41,45,34));
lottoArray.push(new Array(8,13,26,28,32,34,43));
lottoArray.push(new Array(3,12,13,15,34,36,14));
lottoArray.push(new Array(3,19,22,31,42,43,26));
lottoArray.push(new Array(6,10,18,31,32,34,11));
lottoArray.push(new Array(12,23,26,30,36,43,11));
lottoArray.push(new Array(7,8,18,32,37,43,12));
lottoArray.push(new Array(11,12,14,15,18,39,34));
lottoArray.push(new Array(10,24,26,29,37,38,32));
lottoArray.push(new Array(9,14,15,17,31,33,23));
lottoArray.push(new Array(16,17,23,24,29,44,3));
lottoArray.push(new Array(1,5,9,21,27,35,45));
lottoArray.push(new Array(16,23,27,29,33,41,22));
lottoArray.push(new Array(18,20,24,27,31,42,39));
lottoArray.push(new Array(5,17,25,31,39,40,10));
lottoArray.push(new Array(1,12,22,32,33,42,38));
lottoArray.push(new Array(7,14,17,20,35,39,31));
lottoArray.push(new Array(11,23,26,29,39,44,22));
lottoArray.push(new Array(10,11,29,38,41,45,21));
lottoArray.push(new Array(1,4,37,38,40,45,7));
lottoArray.push(new Array(4,5,13,14,37,41,11));
lottoArray.push(new Array(3,7,18,29,32,36,19));
lottoArray.push(new Array(4,22,27,28,38,40,1));
lottoArray.push(new Array(6,8,13,16,30,43,3));
lottoArray.push(new Array(14,23,30,32,34,38,6));
lottoArray.push(new Array(1,9,12,28,36,41,10));
lottoArray.push(new Array(2,8,23,41,43,44,30));
lottoArray.push(new Array(2,11,12,15,23,37,8));
lottoArray.push(new Array(1,15,20,26,35,42,9));
lottoArray.push(new Array(5,8,21,23,27,33,12));
lottoArray.push(new Array(4,5,9,13,26,27,1));
lottoArray.push(new Array(3,7,14,23,26,42,24));
lottoArray.push(new Array(12,29,32,33,39,40,42));
lottoArray.push(new Array(12,25,29,35,42,43,24));
lottoArray.push(new Array(5,27,31,34,35,43,37));
lottoArray.push(new Array(12,13,32,33,40,41,4));
lottoArray.push(new Array(6,9,11,22,24,30,31));
lottoArray.push(new Array(7,20,22,25,38,40,44));
lottoArray.push(new Array(6,14,22,26,43,44,31));
lottoArray.push(new Array(1,5,27,30,34,36,40));
lottoArray.push(new Array(6,22,28,32,34,40,26));
lottoArray.push(new Array(1,4,10,17,31,42,2));
lottoArray.push(new Array(3,4,12,20,24,34,41));
lottoArray.push(new Array(5,20,23,27,35,40,43));
lottoArray.push(new Array(13,14,24,32,39,41,3));
lottoArray.push(new Array(19,20,23,24,43,44,13));
lottoArray.push(new Array(4,13,20,29,36,41,39));
lottoArray.push(new Array(4,13,22,27,34,44,6));
lottoArray.push(new Array(5,7,8,15,30,43,22));
lottoArray.push(new Array(20,22,26,33,36,37,25));
lottoArray.push(new Array(22,27,31,35,37,40,42));
lottoArray.push(new Array(8,17,35,36,39,42,4));
lottoArray.push(new Array(2,7,26,29,40,43,42));
lottoArray.push(new Array(2,4,8,15,20,27,11));
lottoArray.push(new Array(2,8,17,30,31,38,25));
lottoArray.push(new Array(4,8,25,27,37,41,21));
lottoArray.push(new Array(1,2,23,25,38,40,43));
lottoArray.push(new Array(17,22,26,27,36,39,20));
lottoArray.push(new Array(1,3,27,28,32,45,11));
lottoArray.push(new Array(12,15,19,22,28,34,5));
lottoArray.push(new Array(1,10,16,24,25,35,43));
lottoArray.push(new Array(3,4,23,29,40,41,20));
lottoArray.push(new Array(3,5,10,17,30,31,16));
lottoArray.push(new Array(8,23,25,27,35,44,24));
lottoArray.push(new Array(18,29,30,37,39,43,8));
lottoArray.push(new Array(14,25,29,32,33,45,37));
lottoArray.push(new Array(9,12,13,15,37,38,27));
lottoArray.push(new Array(1,9,14,16,21,29,3));
lottoArray.push(new Array(4,13,18,31,33,45,43));
lottoArray.push(new Array(8,13,20,22,23,36,34));
lottoArray.push(new Array(16,25,26,31,36,43,44));
lottoArray.push(new Array(6,13,29,37,39,41,43));
lottoArray.push(new Array(10,16,20,39,41,42,27));
lottoArray.push(new Array(4,21,22,34,37,38,33));
lottoArray.push(new Array(8,13,15,28,37,43,17));
lottoArray.push(new Array(2,12,14,17,24,40,39));
lottoArray.push(new Array(4,10,13,23,32,44,20));
lottoArray.push(new Array(1,8,11,13,22,38,31));
lottoArray.push(new Array(6,12,15,34,42,44,4));
lottoArray.push(new Array(23,29,31,33,34,44,40));
lottoArray.push(new Array(3,20,24,32,37,45,4));
lottoArray.push(new Array(11,18,26,31,37,40,43));
lottoArray.push(new Array(8,11,28,30,43,45,41));
lottoArray.push(new Array(4,6,10,14,25,40,12));
lottoArray.push(new Array(4,9,10,32,36,40,18));
lottoArray.push(new Array(8,10,18,23,27,40,33));
lottoArray.push(new Array(1,7,12,18,23,27,44));
lottoArray.push(new Array(4,19,20,26,30,35,24));
lottoArray.push(new Array(13,25,27,34,38,41,10));
lottoArray.push(new Array(12,24,33,38,40,42,30));
lottoArray.push(new Array(8,10,18,30,32,34,27));
lottoArray.push(new Array(12,15,20,24,30,38,29));
lottoArray.push(new Array(6,14,19,21,23,31,13));
lottoArray.push(new Array(3,10,20,26,35,43,36));
lottoArray.push(new Array(3,7,13,27,40,41,36));
lottoArray.push(new Array(2,7,8,9,17,33,34));
lottoArray.push(new Array(1,11,12,14,26,35,6));
lottoArray.push(new Array(13,20,21,30,39,45,32));
lottoArray.push(new Array(11,13,23,35,43,45,17));
lottoArray.push(new Array(4,6,10,19,20,44,14));
lottoArray.push(new Array(25,27,29,36,38,40,41));
lottoArray.push(new Array(1,23,28,30,34,35,9));
lottoArray.push(new Array(10,22,28,34,36,44,2));
lottoArray.push(new Array(17,20,30,31,37,40,25));
lottoArray.push(new Array(6,12,20,26,29,38,45));
lottoArray.push(new Array(11,16,29,38,41,44,21));
lottoArray.push(new Array(9,14,20,22,33,34,28));
lottoArray.push(new Array(8,16,26,30,38,45,42));
lottoArray.push(new Array(3,13,20,24,33,37,35));
lottoArray.push(new Array(19,23,29,33,35,43,27));
lottoArray.push(new Array(2,3,5,11,27,39,33));
lottoArray.push(new Array(18,22,25,31,38,45,6));
lottoArray.push(new Array(1,3,16,18,30,34,44));
lottoArray.push(new Array(3,23,28,34,39,42,16));
lottoArray.push(new Array(12,16,19,22,37,40,8));
lottoArray.push(new Array(6,7,15,24,28,30,21));
lottoArray.push(new Array(4,17,18,27,39,43,19));
lottoArray.push(new Array(8,10,14,27,33,38,3));
lottoArray.push(new Array(10,11,26,31,34,44,30));
lottoArray.push(new Array(1,17,27,28,29,40,5));
lottoArray.push(new Array(8,15,19,21,34,44,12));
lottoArray.push(new Array(6,11,26,27,28,44,30));
lottoArray.push(new Array(4,9,10,29,31,34,27));
lottoArray.push(new Array(2,11,13,14,28,30,7));
lottoArray.push(new Array(11,13,15,26,28,34,31));
lottoArray.push(new Array(4,5,14,20,22,43,44));
lottoArray.push(new Array(5,6,8,11,22,26,44));
lottoArray.push(new Array(7,17,20,26,30,40,24));
lottoArray.push(new Array(2,14,15,22,23,44,43));
lottoArray.push(new Array(2,9,15,23,34,40,3));
lottoArray.push(new Array(4,7,39,41,42,45,40));
lottoArray.push(new Array(11,14,22,35,37,39,5));
lottoArray.push(new Array(1,3,18,32,40,41,16));
lottoArray.push(new Array(6,9,21,31,32,40,38));
lottoArray.push(new Array(9,20,21,22,30,37,16));
lottoArray.push(new Array(6,7,13,16,24,25,1));
lottoArray.push(new Array(7,12,21,24,27,36,45));
lottoArray.push(new Array(1,2,10,25,26,44,4));
lottoArray.push(new Array(5,20,21,24,33,40,36));
lottoArray.push(new Array(10,14,22,24,28,37,26));
lottoArray.push(new Array(5,9,15,19,22,36,32));
lottoArray.push(new Array(6,12,18,31,38,43,9));
lottoArray.push(new Array(9,21,27,34,41,43,2));
lottoArray.push(new Array(1,2,9,17,19,42,20));
lottoArray.push(new Array(10,15,20,23,42,44,7));
lottoArray.push(new Array(12,13,17,22,25,33,8));
lottoArray.push(new Array(18,20,31,34,40,45,30));
lottoArray.push(new Array(11,15,20,26,31,35,7));
lottoArray.push(new Array(1,13,20,22,25,28,15));
lottoArray.push(new Array(9,16,28,40,41,43,21));
lottoArray.push(new Array(1,3,7,8,24,42,43));
lottoArray.push(new Array(10,11,18,22,28,39,30));
lottoArray.push(new Array(16,17,28,37,39,40,15));
lottoArray.push(new Array(7,16,18,20,23,26,3));
lottoArray.push(new Array(1,8,9,17,29,32,45));
lottoArray.push(new Array(1,26,31,34,40,43,20));
lottoArray.push(new Array(4,7,10,19,31,40,26));
lottoArray.push(new Array(7,12,19,21,29,32,9));
lottoArray.push(new Array(11,22,24,32,36,38,7));
lottoArray.push(new Array(4,15,28,33,37,40,25));
lottoArray.push(new Array(10,15,22,24,27,42,19));
lottoArray.push(new Array(1,5,10,12,16,20,11));
lottoArray.push(new Array(1,2,8,17,26,37,27));
lottoArray.push(new Array(6,10,22,31,35,40,19));
lottoArray.push(new Array(5,22,29,31,34,39,43));
lottoArray.push(new Array(6,22,29,37,43,45,23));
lottoArray.push(new Array(1,11,13,24,28,40,7));
lottoArray.push(new Array(4,8,19,25,27,45,7));
lottoArray.push(new Array(11,13,15,17,25,34,26));
lottoArray.push(new Array(15,26,37,42,43,45,9));
lottoArray.push(new Array(8,11,14,16,18,21,13));
lottoArray.push(new Array(7,9,15,26,27,42,18));
lottoArray.push(new Array(16,18,24,42,44,45,17));
lottoArray.push(new Array(17,20,35,36,41,43,21));
lottoArray.push(new Array(11,21,24,30,39,45,26));
lottoArray.push(new Array(3,22,25,29,32,44,19));
lottoArray.push(new Array(5,12,19,26,27,44,38));
lottoArray.push(new Array(5,15,21,25,26,30,31));
lottoArray.push(new Array(2,5,7,14,16,40,4));
lottoArray.push(new Array(11,12,14,21,32,38,6));
lottoArray.push(new Array(2,3,22,27,30,40,29));
lottoArray.push(new Array(5,10,16,24,27,35,33));
lottoArray.push(new Array(4,16,23,25,35,40,27));
lottoArray.push(new Array(1,10,19,20,24,40,23));
lottoArray.push(new Array(1,9,10,12,21,40,37));
lottoArray.push(new Array(10,14,18,21,36,37,5));
lottoArray.push(new Array(2,8,14,25,29,45,24));
lottoArray.push(new Array(5,8,29,30,35,44,38));
lottoArray.push(new Array(14,19,36,43,44,45,1));
lottoArray.push(new Array(11,16,19,22,29,36,26));
lottoArray.push(new Array(5,16,17,20,26,41,24));
lottoArray.push(new Array(5,25,27,29,34,36,33));
lottoArray.push(new Array(1,8,18,24,29,33,35));
lottoArray.push(new Array(5,13,14,20,24,25,36));
lottoArray.push(new Array(3,14,17,20,24,31,34));
lottoArray.push(new Array(3,8,13,27,32,42,10));
lottoArray.push(new Array(5,13,14,22,44,45,33));
lottoArray.push(new Array(15,20,23,29,39,42,2));
lottoArray.push(new Array(1,2,15,28,34,45,38));
lottoArray.push(new Array(1,10,17,29,31,43,15));
lottoArray.push(new Array(1,13,14,33,34,43,25));
lottoArray.push(new Array(1,8,19,34,39,43,41));
lottoArray.push(new Array(18,24,26,29,34,38,32));
lottoArray.push(new Array(6,8,14,21,30,37,45));
lottoArray.push(new Array(2,13,34,38,42,45,16));
lottoArray.push(new Array(1,5,14,18,32,37,4));
lottoArray.push(new Array(3,5,20,34,35,44,16));
lottoArray.push(new Array(5,9,16,23,26,45,21));
lottoArray.push(new Array(13,15,21,29,39,43,33));
lottoArray.push(new Array(5,14,27,30,39,43,35));
lottoArray.push(new Array(16,17,34,36,42,45,3));
lottoArray.push(new Array(4,9,14,26,31,44,39));
lottoArray.push(new Array(3,4,16,17,19,20,23));
lottoArray.push(new Array(9,17,19,30,35,42,4));
lottoArray.push(new Array(1,6,9,16,17,28,24));
lottoArray.push(new Array(6,12,13,17,32,44,24));
lottoArray.push(new Array(16,23,25,33,36,39,40));
lottoArray.push(new Array(7,17,20,32,44,45,33));
lottoArray.push(new Array(2,4,21,25,33,36,17));
lottoArray.push(new Array(10,14,15,32,36,42,3));
lottoArray.push(new Array(9,18,29,32,38,43,20));
lottoArray.push(new Array(12,18,20,21,25,34,42));
lottoArray.push(new Array(16,19,23,25,41,45,3));
lottoArray.push(new Array(5,8,22,28,33,42,37));
lottoArray.push(new Array(2,17,19,20,34,45,21));
lottoArray.push(new Array(3,10,11,22,36,39,8));
lottoArray.push(new Array(10,11,21,27,31,39,43));
lottoArray.push(new Array(1,13,33,35,43,45,23));
lottoArray.push(new Array(15,17,19,34,38,41,2));
lottoArray.push(new Array(9,17,34,35,43,45,2));
lottoArray.push(new Array(2,3,5,6,12,20,25));
lottoArray.push(new Array(4,12,24,27,28,32,10));
lottoArray.push(new Array(1,5,19,28,34,41,16));
lottoArray.push(new Array(1,2,5,11,18,36,22));
lottoArray.push(new Array(14,15,17,19,37,45,40));
lottoArray.push(new Array(5,15,21,23,25,45,12));
lottoArray.push(new Array(4,18,23,30,34,41,19));
lottoArray.push(new Array(7,8,18,21,23,39,9));
lottoArray.push(new Array(4,10,16,26,33,41,38));
lottoArray.push(new Array(2,14,17,30,38,45,43));
lottoArray.push(new Array(13,19,20,32,38,42,4));
lottoArray.push(new Array(7,11,13,33,37,43,26));
lottoArray.push(new Array(7,9,10,12,26,38,39));
lottoArray.push(new Array(1,3,20,25,36,45,24));
lottoArray.push(new Array(5,9,27,29,37,40,19));
lottoArray.push(new Array(6,11,19,20,28,32,34));
lottoArray.push(new Array(3,8,15,27,30,45,44));
lottoArray.push(new Array(1,4,12,16,18,38,8));
lottoArray.push(new Array(6,10,17,30,37,38,40));
lottoArray.push(new Array(1,9,17,21,29,33,24));
lottoArray.push(new Array(17,18,31,32,33,34,10));
lottoArray.push(new Array(3,7,8,18,20,42,45));
lottoArray.push(new Array(8,13,18,32,39,45,7));
lottoArray.push(new Array(3,14,33,37,38,42,10));
lottoArray.push(new Array(1,12,17,28,35,41,10));
lottoArray.push(new Array(6,12,24,27,35,37,41));
lottoArray.push(new Array(1,15,19,40,42,44,17));
lottoArray.push(new Array(13,33,37,40,41,45,2));
lottoArray.push(new Array(2,7,15,24,30,45,28));
lottoArray.push(new Array(6,8,18,31,38,45,42));
lottoArray.push(new Array(2,5,10,18,31,32,30));
lottoArray.push(new Array(1,3,4,6,14,41,12));
lottoArray.push(new Array(10,11,23,24,36,37,35));
lottoArray.push(new Array(7,16,31,36,37,38,11));
lottoArray.push(new Array(3,11,37,39,41,43,13));
lottoArray.push(new Array(10,12,13,15,25,29,20));
lottoArray.push(new Array(4,15,21,33,39,41,25));
lottoArray.push(new Array(14,19,20,35,38,40,26));
lottoArray.push(new Array(13,14,15,26,35,39,25));
lottoArray.push(new Array(1,8,24,31,34,44,6));
lottoArray.push(new Array(7,9,12,27,39,43,28));
lottoArray.push(new Array(3,8,9,27,29,40,36));
lottoArray.push(new Array(5,9,12,20,21,26,27));
lottoArray.push(new Array(5,18,20,36,42,43,32));
lottoArray.push(new Array(3,10,19,24,32,45,12));
lottoArray.push(new Array(7,8,24,34,36,41,1));
lottoArray.push(new Array(3,4,9,11,22,42,37));
lottoArray.push(new Array(5,9,34,37,38,39,12));
lottoArray.push(new Array(9,16,27,36,41,44,5));
lottoArray.push(new Array(1,27,28,32,37,40,18));
lottoArray.push(new Array(9,12,24,25,29,31,36));
lottoArray.push(new Array(6,11,16,18,31,43,2));
lottoArray.push(new Array(7,12,15,24,37,40,43));
lottoArray.push(new Array(4,5,14,35,42,45,34));
lottoArray.push(new Array(14,27,30,31,38,40,17));
lottoArray.push(new Array(6,13,27,31,32,37,4));
lottoArray.push(new Array(4,11,14,21,23,43,32));
lottoArray.push(new Array(1,5,6,24,27,42,32));
lottoArray.push(new Array(1,5,19,20,24,30,27));
lottoArray.push(new Array(8,19,25,31,34,36,33));
lottoArray.push(new Array(14,23,26,31,39,45,28));
lottoArray.push(new Array(6,7,19,25,28,38,45));
lottoArray.push(new Array(19,23,30,37,43,45,38));
lottoArray.push(new Array(3,8,27,31,41,44,11));
lottoArray.push(new Array(3,8,17,23,38,45,13));
lottoArray.push(new Array(12,15,28,36,39,40,13));
lottoArray.push(new Array(13,18,21,23,26,39,15));
lottoArray.push(new Array(9,11,27,31,32,38,22));
lottoArray.push(new Array(13,16,25,36,37,38,19));
lottoArray.push(new Array(2,12,17,19,28,42,34));
lottoArray.push(new Array(4,19,20,21,32,34,43));
lottoArray.push(new Array(2,16,24,27,28,35,21));
lottoArray.push(new Array(6,10,16,40,41,43,21));
lottoArray.push(new Array(11,15,24,39,41,44,7));
lottoArray.push(new Array(2,4,15,28,31,34,35));
lottoArray.push(new Array(1,11,17,21,24,44,33));
lottoArray.push(new Array(1,4,8,13,37,39,7));
lottoArray.push(new Array(21,22,26,27,31,37,8));
lottoArray.push(new Array(13,21,22,24,26,37,4));
lottoArray.push(new Array(4,6,13,17,28,40,39));
lottoArray.push(new Array(8,9,10,12,24,44,35));
lottoArray.push(new Array(5,10,19,31,44,45,27));
lottoArray.push(new Array(5,11,14,29,32,33,12));
lottoArray.push(new Array(4,5,9,11,23,38,35));
lottoArray.push(new Array(17,25,35,36,39,44,23));
lottoArray.push(new Array(4,5,15,16,22,42,2));
lottoArray.push(new Array(2,6,8,14,21,22,34));
lottoArray.push(new Array(5,11,13,19,31,36,7));
lottoArray.push(new Array(4,19,26,27,30,42,7));
lottoArray.push(new Array(1,3,18,20,26,27,38));
lottoArray.push(new Array(5,7,28,29,39,43,44));
lottoArray.push(new Array(2,20,33,35,37,40,10));
lottoArray.push(new Array(5,11,19,21,34,43,31));
lottoArray.push(new Array(4,11,20,26,35,37,16));
lottoArray.push(new Array(1,8,14,18,29,44,20));
lottoArray.push(new Array(16,20,27,33,35,39,38));
lottoArray.push(new Array(7,16,17,33,36,40,1));
lottoArray.push(new Array(2,3,7,15,43,44,4));
lottoArray.push(new Array(5,7,20,25,28,37,32));
lottoArray.push(new Array(2,3,4,5,20,24,42));
lottoArray.push(new Array(11,12,18,21,31,38,8));
lottoArray.push(new Array(12,13,17,20,33,41,8));
lottoArray.push(new Array(10,19,22,23,25,37,39));
lottoArray.push(new Array(2,7,18,20,24,33,37));
lottoArray.push(new Array(14,25,31,34,40,44,24));
lottoArray.push(new Array(3,11,14,31,32,37,38));
lottoArray.push(new Array(1,2,3,15,20,25,43));
lottoArray.push(new Array(1,3,21,29,35,37,30));
lottoArray.push(new Array(3,12,14,35,40,45,5));
lottoArray.push(new Array(1,3,11,24,30,32,7));
lottoArray.push(new Array(12,14,27,33,39,44,17));
lottoArray.push(new Array(3,11,24,38,39,44,26));
lottoArray.push(new Array(5,6,13,14,17,20,7));
lottoArray.push(new Array(14,21,22,25,30,36,43));
lottoArray.push(new Array(12,19,20,25,41,45,2));
lottoArray.push(new Array(7,12,16,34,42,45,4));
lottoArray.push(new Array(35,36,37,41,44,45,30));
lottoArray.push(new Array(7,10,19,22,35,40,31));
lottoArray.push(new Array(15,20,23,26,39,44,28));
lottoArray.push(new Array(6,14,18,26,36,39,13));
lottoArray.push(new Array(4,8,11,18,37,45,33));
lottoArray.push(new Array(5,6,24,25,32,37,8));
lottoArray.push(new Array(8,14,18,30,31,44,15));
lottoArray.push(new Array(8,14,32,35,37,45,28));
lottoArray.push(new Array(19,24,27,30,31,34,36));
lottoArray.push(new Array(1,2,8,18,29,38,42));
lottoArray.push(new Array(4,10,14,19,21,45,9));
lottoArray.push(new Array(1,2,4,8,19,38,14));
lottoArray.push(new Array(1,2,6,16,20,33,41));
lottoArray.push(new Array(2,18,24,34,40,42,5));
lottoArray.push(new Array(13,15,27,29,34,40,35));
lottoArray.push(new Array(14,21,23,32,40,45,44));
lottoArray.push(new Array(2,15,20,21,29,34,22));
lottoArray.push(new Array(5,9,17,25,39,43,32));
lottoArray.push(new Array(1,5,11,12,18,23,9));
lottoArray.push(new Array(1,10,13,16,37,43,6));
lottoArray.push(new Array(4,17,30,32,33,34,15));
lottoArray.push(new Array(19,26,28,31,33,36,17));
lottoArray.push(new Array(13,14,18,22,35,39,16));
lottoArray.push(new Array(3,9,24,30,33,34,18));
lottoArray.push(new Array(4,19,21,24,26,41,35));
lottoArray.push(new Array(4,16,25,29,34,35,1));
lottoArray.push(new Array(2,11,13,15,31,42,10));
lottoArray.push(new Array(16,27,35,37,43,45,19));
lottoArray.push(new Array(3,10,31,40,42,43,30));
lottoArray.push(new Array(24,27,28,30,36,39,4));
lottoArray.push(new Array(9,12,27,36,39,45,14));
lottoArray.push(new Array(5,13,18,19,22,42,31));
lottoArray.push(new Array(6,9,10,11,39,41,27));
lottoArray.push(new Array(7,11,26,28,29,44,16));
lottoArray.push(new Array(1,5,21,25,38,41,24));
lottoArray.push(new Array(22,34,36,40,42,45,44));
lottoArray.push(new Array(3,7,8,34,39,41,1));
lottoArray.push(new Array(1,18,30,41,42,43,32));
lottoArray.push(new Array(4,9,13,18,21,34,7));
lottoArray.push(new Array(19,26,30,33,35,39,37));
lottoArray.push(new Array(5,18,28,30,42,45,2));
lottoArray.push(new Array(16,19,20,32,33,41,4));
lottoArray.push(new Array(6,19,21,35,40,45,20));
lottoArray.push(new Array(3,8,11,12,13,36,33));
lottoArray.push(new Array(1,5,13,26,29,34,43));
lottoArray.push(new Array(1,2,10,13,18,19,15));
lottoArray.push(new Array(2,18,25,28,37,39,16));
lottoArray.push(new Array(2,11,21,34,41,42,27));
lottoArray.push(new Array(21,25,33,34,35,36,17));
lottoArray.push(new Array(4,6,13,21,40,42,36));
lottoArray.push(new Array(2,19,27,35,41,42,25));
lottoArray.push(new Array(2,3,13,20,27,44,9));
lottoArray.push(new Array(4,15,17,26,36,37,43));
lottoArray.push(new Array(26,27,28,42,43,45,8));
lottoArray.push(new Array(12,16,30,34,40,44,19));
lottoArray.push(new Array(8,12,29,31,42,43,2));
lottoArray.push(new Array(3,13,17,18,19,28,8));
lottoArray.push(new Array(9,11,15,20,28,43,13));
lottoArray.push(new Array(10,11,27,28,37,39,19));
lottoArray.push(new Array(7,9,20,25,36,39,15));
lottoArray.push(new Array(2,16,30,36,41,42,11));
lottoArray.push(new Array(6,14,22,28,35,39,16));
lottoArray.push(new Array(3,12,20,23,31,35,43));
lottoArray.push(new Array(4,7,15,18,23,26,13));
lottoArray.push(new Array(3,17,23,34,41,45,43));
lottoArray.push(new Array(8,10,11,14,15,21,37));
lottoArray.push(new Array(7,19,24,27,42,45,31));
lottoArray.push(new Array(19,23,25,28,38,42,17));
lottoArray.push(new Array(12,30,34,36,37,45,39));
lottoArray.push(new Array(3,5,10,29,32,43,35));
lottoArray.push(new Array(7,20,22,27,40,43,1));
lottoArray.push(new Array(2,8,32,33,35,36,18));
lottoArray.push(new Array(4,16,23,25,29,42,1));
lottoArray.push(new Array(7,17,18,28,30,45,27));
lottoArray.push(new Array(1,11,16,17,36,40,8));
lottoArray.push(new Array(12,28,30,34,38,43,9));
lottoArray.push(new Array(4,6,10,11,32,37,30));
lottoArray.push(new Array(3,11,13,14,17,21,38));
lottoArray.push(new Array(3,4,10,17,19,22,38));
lottoArray.push(new Array(5,10,22,34,36,44,35));
lottoArray.push(new Array(2,4,25,31,34,37,17));
lottoArray.push(new Array(1,2,6,9,25,28,31));
lottoArray.push(new Array(11,14,19,26,28,41,2));
lottoArray.push(new Array(4,9,28,33,36,45,26));
lottoArray.push(new Array(26,29,30,33,41,42,43));
lottoArray.push(new Array(7,18,31,33,36,40,27));
lottoArray.push(new Array(7,20,22,23,29,43,1));
lottoArray.push(new Array(1,5,34,36,42,44,33));
lottoArray.push(new Array(7,18,22,23,29,44,12));
lottoArray.push(new Array(1,4,5,6,9,31,17));
lottoArray.push(new Array(4,10,12,22,24,33,29));
lottoArray.push(new Array(8,10,20,34,41,45,28));
lottoArray.push(new Array(17,32,33,34,42,44,35));
lottoArray.push(new Array(5,14,15,27,30,45,10));
lottoArray.push(new Array(17,22,24,26,35,40,42));
lottoArray.push(new Array(1,3,17,32,35,45,8));
lottoArray.push(new Array(1,7,11,23,37,42,6));
lottoArray.push(new Array(1,3,10,27,29,37,11));
lottoArray.push(new Array(6,9,16,23,24,32,43));
lottoArray.push(new Array(6,7,14,15,20,36,3));
lottoArray.push(new Array(1,3,8,21,22,31,20));
lottoArray.push(new Array(8,17,27,31,34,43,14));
lottoArray.push(new Array(5,32,34,40,41,45,6));
lottoArray.push(new Array(6,22,24,36,38,44,19));
lottoArray.push(new Array(3,14,24,33,35,36,17));
lottoArray.push(new Array(1,21,24,26,29,42,27));
lottoArray.push(new Array(17,20,29,35,38,44,10));
lottoArray.push(new Array(4,26,28,29,33,40,37));
lottoArray.push(new Array(1,17,20,24,30,41,27));
lottoArray.push(new Array(4,12,16,23,34,43,26));
lottoArray.push(new Array(2,12,37,39,41,45,33));
lottoArray.push(new Array(6,8,13,23,31,36,21));
lottoArray.push(new Array(16,23,27,34,42,45,11));
lottoArray.push(new Array(6,10,15,17,19,34,14));
lottoArray.push(new Array(1,2,3,14,27,42,39));
lottoArray.push(new Array(5,7,11,13,20,33,6));
lottoArray.push(new Array(17,18,24,25,26,30,1));
lottoArray.push(new Array(3,12,24,27,30,32,14));
lottoArray.push(new Array(10,13,25,29,33,35,38));
lottoArray.push(new Array(2,18,29,32,43,44,37));
lottoArray.push(new Array(1,3,15,22,25,37,43));
lottoArray.push(new Array(2,5,24,32,34,44,28));
lottoArray.push(new Array(6,15,17,18,35,40,23));
lottoArray.push(new Array(3,12,18,32,40,43,38));
lottoArray.push(new Array(2,4,11,17,26,27,1));
lottoArray.push(new Array(5,9,12,16,29,41,21));
lottoArray.push(new Array(5,19,22,25,28,43,26));
lottoArray.push(new Array(5,8,14,15,19,39,35));
lottoArray.push(new Array(10,12,15,16,26,39,38));
lottoArray.push(new Array(3,7,10,15,36,38,33));
lottoArray.push(new Array(2,3,7,17,22,24,45));
lottoArray.push(new Array(4,25,33,36,40,43,39));
lottoArray.push(new Array(14,15,18,21,26,36,39));
lottoArray.push(new Array(3,20,23,36,38,40,5));
lottoArray.push(new Array(3,8,15,27,29,35,21));
lottoArray.push(new Array(14,15,19,30,38,43,8));
lottoArray.push(new Array(2,8,25,36,39,42,11));
lottoArray.push(new Array(6,29,36,39,41,45,13));
lottoArray.push(new Array(10,24,25,33,40,44,1));
lottoArray.push(new Array(7,10,16,25,29,44,6));
lottoArray.push(new Array(10,14,30,31,33,37,19));
lottoArray.push(new Array(17,21,31,37,40,44,7));
lottoArray.push(new Array(1,8,21,27,36,39,37));
lottoArray.push(new Array(7,8,14,32,33,39,42));
lottoArray.push(new Array(2,4,15,16,20,29,1));
lottoArray.push(new Array(2,3,11,16,26,44,35));
lottoArray.push(new Array(2,10,12,15,22,44,1));
lottoArray.push(new Array(4,7,16,19,33,40,30));
lottoArray.push(new Array(6,10,18,26,37,38,3));
lottoArray.push(new Array(14,17,26,31,36,45,27));
lottoArray.push(new Array(8,13,15,23,31,38,39));
lottoArray.push(new Array(1,10,20,27,33,35,17));
lottoArray.push(new Array(3,11,21,30,38,45,39));
lottoArray.push(new Array(6,31,35,38,39,44,1));
lottoArray.push(new Array(17,18,19,21,23,32,1));
lottoArray.push(new Array(13,20,23,35,38,43,34));
lottoArray.push(new Array(7,13,18,19,25,26,6));
lottoArray.push(new Array(6,7,13,15,21,43,8));
lottoArray.push(new Array(16,17,22,30,37,43,36));
lottoArray.push(new Array(7,27,30,33,35,37,42));
lottoArray.push(new Array(1,10,23,26,28,40,31));
lottoArray.push(new Array(2,3,11,26,37,43,39));
lottoArray.push(new Array(9,26,35,37,40,42,2));
lottoArray.push(new Array(4,7,32,33,40,41,9));
lottoArray.push(new Array(6,14,19,25,34,44,11));
lottoArray.push(new Array(7,9,18,23,28,35,32));
lottoArray.push(new Array(8,17,20,35,36,44,4));
lottoArray.push(new Array(1,5,13,34,39,40,11));
lottoArray.push(new Array(9,18,23,25,35,37,1));
lottoArray.push(new Array(1,20,26,28,37,43,27));
lottoArray.push(new Array(4,5,7,18,20,25,31));
lottoArray.push(new Array(2,4,21,26,43,44,16));
lottoArray.push(new Array(7,8,27,29,36,43,6));
lottoArray.push(new Array(5,13,17,18,33,42,44));
lottoArray.push(new Array(4,5,6,8,17,39,25));
lottoArray.push(new Array(6,12,17,18,31,32,21));
lottoArray.push(new Array(10,14,18,20,23,30,41));
lottoArray.push(new Array(6,30,38,39,40,43,26));
lottoArray.push(new Array(3,12,13,19,32,35,29));
lottoArray.push(new Array(3,4,9,17,32,37,1));
lottoArray.push(new Array(6,7,24,37,38,40,33));
lottoArray.push(new Array(3,4,16,30,31,37,13));
lottoArray.push(new Array(2,6,12,31,33,40,15));
lottoArray.push(new Array(22,23,25,37,38,42,26));
lottoArray.push(new Array(2,11,21,25,39,45,44));
lottoArray.push(new Array(1,7,36,37,41,42,14));
lottoArray.push(new Array(9,25,30,33,41,44,6));
lottoArray.push(new Array(2,4,16,17,36,39,14));
lottoArray.push(new Array(8,19,25,34,37,39,9));
lottoArray.push(new Array(2,9,16,25,26,40,42));
lottoArray.push(new Array(14,15,26,27,40,42,34));
lottoArray.push(new Array(16,24,29,40,41,42,3));
lottoArray.push(new Array(14,27,30,31,40,42,2));
lottoArray.push(new Array(11,16,19,21,27,31,30));
lottoArray.push(new Array(9,13,21,25,32,42,2));
lottoArray.push(new Array(10,23,29,33,37,40,16));

titleChange();
createNumberTip();
saveNumberBallToDelete();
userNumberLoad();
tipBoxDisplay();
getLatestWinningNumber();