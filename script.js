turn = 0;

function changeColor(color){
    let spanTurn = document.getElementsByClassName("turn")[0];
    spanTurn.style.color = color;
    spanTurn.innerHTML = color;
}


function checkWinner() {
    return new Promise(resolve => {
        setTimeout(() => {
            var boxes = document.getElementsByClassName("box");
            const solutions = [[0,1,2], [0,3,6], [1,4,7], [2,5,8], [6,7,8], [0,4,8], [2,4,6], [3,4,5]];
            for(let solution in solutions)
            {
                console.log(solution);
                var win = boxes[solutions[solution][0]].classList.value === boxes[solutions[solution][1]].classList.value && boxes[solutions[solution][2]].classList.value === boxes[solutions[solution][1]].classList.value
                if(win == true && boxes[solutions[solution][0]].classList.contains("circle"))
                    resolve("Red won!");
                else if(win == true && boxes[solutions[solution][0]].classList.contains("ics"))
                    resolve("Black won!");
            }
            for(let x of boxes){
                if(x.classList.contains("empty"));
                    resolve("Not over");
            }
            resolve("No one won!");
        }, 200);
    });
}

window.onload = function(){

    const container = document.getElementsByClassName("container")[0];
    changeColor("red");
    for(let i = 0; i<=8; i++)
    {
        let element = document.createElement("div");
        element.classList.add("box");
        element.classList.add("empty");
        container.appendChild(element);
    }

    var boxes = document.getElementsByClassName("box");
    for (let i=0; i<boxes.length; i++)
    {
        boxes[i].onclick = async function(e){
            if(turn == 0){
                this.classList.add("circle");
                turn = 1;
                changeColor("black");
            }
            else
            {
                this.classList.add("ics");
                turn = 0;
                changeColor("red");
            }
            this.onclick = undefined;
            const check = await checkWinner();
            if(check !== "Not over")
            {
                let result = confirm(check);
                if(result == true)
                    location.reload();
                else
                    {
                        for (let i=0; i<boxes.length; i++)
                        {
                            boxes[i].onclick = undefined;
                            boxes[i].style.cursor = "not-allowed";
                        }
                        let finalMessage1 = "Reload the page to play again!";
                        let finalHeader = document.createElement('h2');
                        finalHeader.innerHTML = finalMessage1;
                        let buttonMessage = "Or click here!";
                        let buttonReload = document.createElement('button');
                        buttonReload.innerHTML = buttonMessage;
                        buttonReload.onclick = function(){
                            location.reload();
                        }
                        $('body').append(finalHeader);
                        $('body').append(buttonReload);
                    }
            }
        }
    }


}





