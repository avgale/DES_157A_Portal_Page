( function(){
    'use strict';
    console.log('reading JS');

    const myForm = document.querySelector('#myform');
    const madlib = document.querySelector('#result');
    const formData = document.querySelectorAll("input[type=text]");
    const dropdowns = document.querySelectorAll("select");
    const restartBtn = document.querySelector('#restart-btn');

    myForm.addEventListener('submit', function(event) {
        event.preventDefault();
        processFormData(formData);
    });

    restartBtn.addEventListener('click', function() {
        document.querySelector('#car-body').style.animation = "none";
        document.querySelector('#front-wheel').style.animation = "none";
        document.querySelector('#back-wheel').style.animation = "none";
        document.querySelector('#input').style.animation = "none";
        document.querySelector('#input').style.display = "block";
        document.querySelector('#content').style.display = "";
        document.querySelector('#result').style.display = "none";
        restartBtn.style.display = "none";
    });

    function showResult(){
        document.querySelector('#input').style.display = "none";
        document.querySelector('#content').style.display = "block";
        document.querySelector('#result').style.display = "block";
        restartBtn.style.display = "block";
    }

    function triggerAnimation(){
        document.querySelector('#car-body').style.animation = "driveOut 4s ease-in forwards";
        document.querySelector('#front-wheel').style.animation = "rotateTires 4s ease-in forwards";
        document.querySelector('#back-wheel').style.animation = "rotateTires 4s ease-in forwards";

        document.querySelector('#input').style.animation = "driveOut 4s ease-in forwards";

        setTimeout(function(){
            showResult();
        }, 3000);
    }

    function processFormData(formData){
        const words = [];
        let emptyFields = [];
        let counter = 0;

        for (const word of formData) {
            if (word.value) {
                words.push(word.value);
                word.value = "";
            } else {
                emptyFields.push(counter);
            }
            counter++;
        }
        if (emptyFields.length > 0) {
            showErrors(formData, emptyFields);
        } else {
            triggerAnimation();
            makeMadlib(words);
        }
    }

    function showErrors(formData, emptyFields){
        const errorId = formData[emptyFields[0]].id;
        const errorText = `Please fill out this field: ${errorId}`;
        alert(errorText);
        document.querySelector(`#${errorId}`).focus();
    }

    function makeMadlib(words) {
        const myText = `<p>Exciting news! You and your ${words[0]} friend ${words[1]} are going on a roadtrip from ${dropdowns[0].value} to ${words[2]}. You have ${words[3]} packed your belongings and start your journey, only to realize you forgot your ${words[4]}. Oh well - you can just use a ${words[5]} instead. You can’t wait to send your family photos of the two of you ${words[6]} at the ${dropdowns[1].value}. What a thrilling adventure!</p>`;
        madlib.innerHTML = myText;

        for(const field of formData){
            field.value = '';
        }
    }
} )();