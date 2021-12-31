customElements.define("timer-div",class TimerDiv extends HTMLElement {
    constructor(){
        super();
        this.init();
    }

    init(){
        this.shadow = this.attachShadow({mode:'open'});
        this.holder = document.createElement("div");

        this.holder.innerHTML = `<style>
            div.card {
                background-color: white;
                border-radius: 25px;
                padding: 4px;
                margin:8px;
                color:black;
            }
            div.time {
                display:flex;
                justify-content:center;
            }
            p{
                font-size:5rem;
                margin: 1px 8px;
                user-select:none;
            }
            img {
                padding:4px;
                width:100px;
                image-rendering: pixelated;
                image-rendering: crisp-edges;
            }
            img:hover {
                cursor:pointer;
            }
        </style>`;

        this.holder.style.display = "flex";
        this.holder.style.flexWrap = "nowrap";
        this.holder.style.justifyContent = "center";

        this.time_div = document.createElement("DIV");
        this.time_div.classList.add("card");
        this.time_div.classList.add("time");
        this.time_text = document.createElement("P");
        this.time_div.appendChild(this.time_text);

        this.paused = true;
        this.pause_div = document.createElement("DIV");
        this.pause_div.classList.add("card");
        this.pause_img = document.createElement("IMG");
        this.pause_img.src = "src/right.png";
        this.pause_div.appendChild(this.pause_img);

        let pause = (e)=>{
            this.paused = !this.paused;
            this.pause_img.src = (this.paused) ? "src/right.png" : "src/pause.png";
        };
        let reset = (e)=>{
            this.setup(this.start_time);
        }
        this.pause_div.addEventListener("click",pause);
        this.time_div.addEventListener("dblclick",reset);

        this.fps = 50;
        this.canboom = true;
        let time_loop = (scope)=>{
            if(scope.paused) return;
            this.time -= 1/this.fps;
            if(this.time <= 0 && this.canboom){
                let boom = new Audio("src/boom.mp3");
                boom.play();
                this.canboom = false;
                this.time = 0;
                this.paused = true;
                this.pause_img.src = "src/right.png";
            }
            scope.render_time();
        };
        setInterval(time_loop,Math.floor(1000/this.fps),this);

        this.holder.appendChild(this.time_div);
        this.holder.appendChild(this.pause_div);
        this.shadow.appendChild(this.holder);

        this.setup(120);

    }

    get_time(){
        return {
            minutes:Math.floor(this.time/60),
            seconds:Math.floor(this.time) % 60,
            centis:Math.floor((this.time % 1) * 10)
        };
    }

    render_time(){
        let time_info = this.get_time();
        this.time_text.innerHTML=`${time_info.minutes}:${(time_info.seconds < 10) ? "0" : ""}${time_info.seconds}:${time_info.centis}`;
    }

    setup(seconds){
        this.canboom = true;
        this.start_time = seconds;
        this.time = seconds;
        this.paused = true;
        this.pause_img.src = "src/right.png";
        this.render_time();
    }

});