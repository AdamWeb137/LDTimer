window.addEventListener("load",(event)=>{
    const left_arrow = document.querySelector("#left_arrow");
    const right_arrow = document.querySelector("#right_arrow");
    const SPEECH = new_struct(["name","string"],["time","number"]);
    const speeches = [
        SPEECH("AC",360),
        SPEECH("ACX",180),
        SPEECH("NC",7*60),
        SPEECH("NCX",180),
        SPEECH("1AR",4*60),
        SPEECH("NR",6*60),
        SPEECH("2AR",3*60),
    ];
    let current_speech = 0;

    const speech_div = document.querySelector("#speech");
    const speech_time = document.querySelector("#speech_time");
    const prep_time = document.querySelector("#prep_time");
    prep_time.setup(4*60);

    const change_speech = (i)=>{
        if(!speech_time.paused) return;
        current_speech = (current_speech + i);
        if(current_speech < 0) current_speech = speeches.length-1;
        if(current_speech >= speeches.length) current_speech = 0;
        speech_time.setup(speeches[current_speech].time);
        speech_div.children[0].innerHTML = speeches[current_speech].name;
    };

    change_speech(0);

    left_arrow.addEventListener("click",()=>{
        change_speech(-1);
    });

    right_arrow.addEventListener("click",()=>{
        change_speech(1);
    });


});