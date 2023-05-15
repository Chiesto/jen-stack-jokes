console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', postJoke);
    getJokes();
}

//send jokes to the server
function postJoke(){
    const whoseJoke = $('#whoseJokeIn').val();
    const jokeQuestion = $('#questionIn').val();
    const punchLine = $('#punchlineIn').val();

    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: {
            whoseJoke,
            jokeQuestion,
            punchLine
        }
    }).then(function (response){
        console.log('postJoke is working');
        getJokes();
        $('#whoseJokeIn').val('');
        $('#questionIn').val('');
        $('#punchlineIn').val('');
    }).catch(function(error){
        console.log('error in our postJoke function =>', error);
    })
}
//get jokes from the server then display on the dom
function getJokes(){
    $.ajax({
        method: 'GET',
        url: '/jokes'
    }).then(function(response){
        console.log('getJokes is working!!! ')
        renderToDom(response);
    }).catch(function(error){
        console.log('problems in our getJokes =>', error);
    })
}

function renderToDom(array){
    console.log('in my renderToDom function')
    $('#outputDiv').empty();
    for(obj of array){
        $('#outputDiv').append(`
        ${obj.whoseJoke}'s joke - Q: ${obj.jokeQuestion}<br>
        A: ${obj.punchLine}<br>
        `)
    }
}