(function(html) {
    const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if(!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop

    (function ssInit() {

        ssBackToTop();

    })();


    /* 다크모드 */
    document.addEventListener('DOMContentLoaded', function(){

        function checkDarkMode() {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        //다크모드 토글
        if(document.querySelector('.darkmode')){
            if(checkDarkMode()){
                //다크모드 켜기
                document.body.dataset.darkmode='on';
                document.querySelector('#toggle-radio-dark').checked = true;
            }
            
            //다크모드 이벤트 핸들러
            document.querySelector('.darkmode').addEventListener("click", e=>{
                if(e.target.classList.contains('todark')){
                    document.body.dataset.darkmode='on';
                    localStorage.setItem("darkmode", "on");
                }else if(e.target.classList.contains('tolight')){
                    document.body.dataset.darkmode='off';
                    localStorage.setItem("darkmode", "off");
                }
            },false);
        }else{
            localStorage.removeItem("darkmode");
        }

    })
    /*
    jQuery(function($) {
        $("body").css("display", "none");
        $("body").fadeIn(2000);
        $("a.transition").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(1000, redirectPage);
        });
        function redirectPage() {
        window.location = linkLocation;
        }
        });
    document.oncontextmenu = function(){return false;}*/
    
/* 모달팝업 
    const modalOpenButton = document.getElementById('modalOpenButton');
    const modalCloseButton = document.getElementById('modalCloseButton');
    const modal = document.getElementById('modalContainer');
    const modalcontent = document.getElementById('modalContent');

    modalOpenButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modalcontent.classList.remove('hidden');
    modalOpenButton.classList.add('hidden');
    modalCloseButton.classList.remove('hidden');
    });

    modalCloseButton.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalcontent.classList.add('hidden');
    modalOpenButton.classList.remove('hidden');
    modalCloseButton.classList.add('hidden');
    });
*/
})(document.documentElement);

var api_key = "test_02623554ef843dbcfc123dd4da641b0225249931619f55507a400bf6fbb4792dbe3a3b0696a809d9323a7d9008270455";

var get_ocid;
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1; 
var hours = today.getHours();
var date;
if (hours >= 1) {
    date = today.getDate() - 1;
} else {
    date = today.getDate() - 2;
}
var today_date = year+"-"+(("00"+month.toString()).slice(-2))+"-"+(("00"+date.toString()).slice(-2));

function chrsearch(){
    $.ajax({
            method: "GET",
            url: "https://open.api.nexon.com/maplestory/v1/id",
            data: {
                character_name: input_name,
            },
            headers: {
                "x-nxopen-api-key": api_key
            },
            success: function (data) {
                get_ocid = data.ocid;
                console.log(data.ocid);
            },
            error: function() {
                alert("캐릭터를 찾을 수 없습니다 ! \r\n12월 21일 이후 접속 이력이 있는 캐릭터만 조회가 가능합니다.");
            },
            complete: function() {
                $.ajax({
                    method: "GET",
                    url: "https://open.api.nexon.com/maplestory/v1/character/basic",
                    data: {
                        ocid: get_ocid,
                        date: today_date
                    },
                    headers: {
                        "x-nxopen-api-key": api_key
                    },
                    success: function(msg) {
                        $('.character_name').empty().append(msg.character_name);
                        $('.world_name').empty().append(msg.world_name);
                        $('.world_ico').empty().append('<img src="images/world/' + msg.world_name + '.gif"/>');
                        $('.character_level').empty().append(msg.character_level);
                        $('.character_class').empty().append(msg.character_class);
                        $('#class_back').empty().append('<img src="images/jobs/' + msg.character_class + '.png"/>');
                        $('.character_guild_name').empty().append(msg.character_guild_name);
                        $('.character_image').empty().append('<img src="' + msg.character_image + '" style="width: 180px;"/>');
                        $('.character_exp_rate').empty().append(msg.character_exp_rate); 
                    },
                    error: function(msg) {
                        alert("API 오류: " + msg.message);
                    }
                });
                $.ajax({
                    method: "GET",
                    url: "https://open.api.nexon.com/maplestory/v1/character/dojang",
                    data: {
                        ocid: get_ocid,
                        date: today_date
                    },
                    headers: {
                        "x-nxopen-api-key": api_key
                    },
                    success: function (msg) {
                        $('.dojang_best_floor').empty().append(msg.dojang_best_floor + '층');
                        $('.dojang_best_time').empty().append(Math.floor(msg.dojang_best_time / 60) + '분');
                        $('.dojang_best_time_sec').empty().append(msg.dojang_best_time % 60 + '초');
                    }
                });
                $.ajax({
                    method: "GET",
                    url: "https://open.api.nexon.com/maplestory/v1/character/popularity",
                    data: {
                        ocid: get_ocid,
                        date: today_date
                    },
                    headers: {
                        "x-nxopen-api-key": api_key
                    },
                    success: function (msg) {
                        $('.popularity').empty().append(msg.popularity);
                    }
                });
                $.ajax({
                    method: "GET",
                    url: "https://open.api.nexon.com/maplestory/v1/user/union",
                    data: {
                        ocid: get_ocid,
                        date: today_date
                    },
                    headers: {
                        "x-nxopen-api-key": api_key
                    },
                    success: function (msg) {
                        $('.union_level').empty().append(msg.union_level);
                        let union_grade_replace = msg.union_grade.replace('유니온 ', '');
                        $('.union_grade').empty().append(union_grade_replace);
                    }
                });
                $.ajax({
                    method: "GET",
                    url: "https://open.api.nexon.com/maplestory/v1/ranking/achievement",
                    data: {
                        ocid: get_ocid,
                        date: today_date
                    },
                    headers: {
                        "x-nxopen-api-key": api_key
                    },
                    success: function (msg) {
                        $('.trophy_score').empty().append(msg.ranking[0].trophy_score);
                        $('.trophy_grade').empty().append(msg.ranking[0].trophy_grade);
                    }
                });
                $.ajax({
                    method: "GET",
                    url: "https://open.api.nexon.com/maplestory/v1/ranking/theseed",
                    data: {
                        ocid: get_ocid,
                        date: today_date
                    },
                    headers: {
                        "x-nxopen-api-key": api_key
                    },
                    success: function(msg) {
                        if (msg.ranking.length === 0)
                        {
                            $('.theseed_floor').empty().append('-');
                            $('.theseed_time_record').empty().append('-');
                        } else {
                            $('.theseed_floor').empty().append(msg.ranking[0].theseed_floor + '층');
                            $('.theseed_time_record').empty().append(Math.floor(msg.ranking[0].theseed_time_record / 60) + '분');
                            $('.theseed_time_record_sec').empty().append(msg.ranking[0].theseed_time_record % 60 + '초');
                        }
                    },
                });
                $.ajax({
                    method: "GET",
                    url: "https://open.api.nexon.com/maplestory/v1/character/stat",
                    data: {
                        ocid: get_ocid,
                        date: today_date
                    },
                    headers: {
                        "x-nxopen-api-key": api_key
                    },
                    success: function(msg){
                        $('.stat_value42').empty().append(msg.final_stat[42].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        $('.stat_spawn_use_plus').empty().append(msg.final_stat[43].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_value0').empty().append(msg.final_stat[0].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        $('.stat_value1').empty().append(msg.final_stat[1].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        $('.stat_dmg').empty().append(msg.final_stat[2].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_bossdmg').empty().append(msg.final_stat[3].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_finaldmg').empty().append(msg.final_stat[4].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_atk_shield').empty().append(msg.final_stat[5].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_criper').empty().append(msg.final_stat[6].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_cridmg').empty().append(msg.final_stat[7].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_bufftime').empty().append(msg.final_stat[30].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_nordmg').empty().append(msg.final_stat[32].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_reusem').empty().append(msg.final_stat[33].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '초');
                        $('.stat_reusemper').empty().append(msg.final_stat[34].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_now_reuse').empty().append(msg.final_stat[35].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_no_attr').empty().append(msg.final_stat[36].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_dbuffdmg').empty().append(msg.final_stat[37].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%');
                        $('.stat_ad').empty().append(msg.final_stat[40].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        $('.stat_ap').empty().append(msg.final_stat[41].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        $('.stat_hp').empty().append(msg.final_stat[20].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        if (msg.final_stat[21].stat_value === null) {
                            $('.stat_mp').empty().append("-");
                        } else {
                            $('.stat_mp').empty().append(msg.final_stat[21].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        }
                        //
                        $('.stat_str').empty().append(msg.final_stat[16].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        $('.stat_dex').empty().append(msg.final_stat[17].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        $('.stat_int').empty().append(msg.final_stat[18].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        $('.stat_luk').empty().append(msg.final_stat[19].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    }
                });
            }
        }) 
    }