/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

    /* Back to Top
    * ------------------------------------------------------ */

    
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

var get_ocid;
var api_key = "test_02623554ef843dbcfc123dd4da641b021390670490c415561c29676c50ef5a4fb1cf4e9d24e21ddee71643e81e700659";
let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate() - 1;  // 날짜
var today_date = year + '-' + month + '-' + date;

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
                })
                .done(function (msg) {
                    console.log(msg);
                    $('.character_name').empty().append(msg.character_name);
                    $('.world_name').empty().append(msg.world_name);
                    $('.character_level').empty().append(msg.character_level);
                    $('.character_class').empty().append(msg.character_class);
                    $('.character_guild_name').empty().append(msg.character_guild_name);
                    $('.character_image').empty().append('<img src="' + msg.character_image + '" style="width: 115%;"/>');
                    $('.character_exp_rate').empty().append(msg.character_exp_rate); 
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
                })
                .done(function (msg) {
                    console.log(msg);
                    $('.dojang_best_floor').empty().append(msg.dojang_best_floor + '층');
                    $('.dojang_best_time').empty().append(Math.floor(msg.dojang_best_time / 60) + '분');
                    $('.dojang_best_time_sec').empty().append(msg.dojang_best_time % 60 + '초');
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
                })
                .done(function (msg) {
                    console.log(msg);
                    $('.popularity').empty().append(msg.popularity);
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
                })
                .done(function (msg) {
                    console.log(msg);
                    $('.union_level').empty().append(msg.union_level);
                    $('.union_grade').empty().append(msg.union_grade);
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
                })
                .done(function (msg) {
                    console.log(msg);
                    $('.trophy_score').empty().append(msg.ranking[0].trophy_score);
                    $('.trophy_grade').empty().append(msg.ranking[0].trophy_grade);
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
                })
                .done(function (msg) {
                    $('.theseed_floor').empty().append(msg.ranking[0].theseed_floor + '층');
                    $('.theseed_time_record').empty().append(Math.floor(msg.ranking[0].theseed_time_record / 60) + '분');
                    $('.theseed_time_record_sec').empty().append(msg.ranking[0].theseed_time_record % 60 + '초');
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
                })
                .done(function (msg) {
                    $('.stat_value42').empty().append(msg.final_stat[42].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    $('.stat_value0').empty().append(msg.final_stat[0].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    $('.stat_value1').empty().append(msg.final_stat[1].stat_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                });
            }
        })

        
    }


