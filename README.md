# Code-Quiz-04

## PseudoCode

### Variables

create an array of objects, one object for each question.

QuestionI: {
    Question: "This is a question about js"
    A: button 1 text
    AData: button 1 data attribute correct/incorrect
    B: button 1 text
    BData: button 1 data attribute correct/incorrect
    C: button 1 text
    CData: button 1 data attribute correct/incorrect
    D: button 1 text
    DData: button 1 data attribute correct/incorrect
}

### Functions
add remaining seconds to score at end of quiz

stop timer at zero seconds

display end screen
    display score
    add form for name
    on submit, store score and name into local storage

reset timer at loading end screen

add event listener to high scores div to display high scores page

create high score screen
    call scores from local storage, ordered based on highest score
