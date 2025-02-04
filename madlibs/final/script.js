( function(){
    'use strict';
    console.log('Reading JS');

    const myForm = document.querySelector('#myform');
    const madlib = document.querySelector('#result');
    const formData = document.querySelectorAll("input[type=text]");
    const restartBtn = document.querySelector('#restart-btn');

    console.log(myForm);
    myForm.addEventListener('submit', function(event) {
        event.preventDefault();
        processFormData(formData);

        document.querySelector('#car-body').style.animation = "driveOut 4s ease-in forwards;";

        setTimeout(function(){
            document.querySelector('#input').style.display = "none";
            document.querySelector('#content').style.display = "block";
            document.querySelector('#result').style.display = "block";
            restartBtn.style.display = "block";
        }, 1000);
    });

    restartBtn.addEventListener('click', function() {
        document.querySelector('#input').style.display = "block";
        document.querySelector('#content').style.display = "";
        document.querySelector('#result').style.display = "none";
        restartBtn.style.display = "none";
    });

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
            makeMadlib(words);
        }
    }

    function showErrors(formData, emptyFields){
        const errorId = formData[emptyFields[0]].id;
        const errorText = `Please fill out this field: ${errorId}`;
        madlib.innerHTML = errorText;
        document.querySelector(`#${errorId}`).focus();
    }

    function makeMadlib(words) {
        const myText = `<p>Exciting news! You and your ${words[0]} friend ${words[1]} are going on a roadtrip from [location] to ${words[2]}. You have ${words[3]} packed your belongings and start your journey, only to realize you forgot your ${words[4]}. Oh well - you can just use a ${words[5]} instead. You can’t wait to send your family photos of the two of you ${words[6]} at the [location]. What a thrilling adventure!</p>`;
        madlib.innerHTML = myText;

        for(const field of formData){
            field.value = '';
        }
    }
} )();