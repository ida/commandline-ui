const rl = require('readline')


/**
Ask user a question on the commandline and pass received answer to a handler.

If the handler does not return true, re-ask until a valid answer was given.


@param {string}   question   - To bee or not to bee?

@param {function} [onAnswer] - Handle received answer.
                               If passed, it must return true,
                               to signal an answer is valid,
                               otherwise question is re-asked
                               until handler returns true.
                               Gets "answer" and "io" passed.

@param {object} [io] - In- and output-interface from readline-package.

@example
let question = 'What is the answer to life, the universe and everything?'

let onAnswer = (answer) => {
  if(answer == '42') return true
  else console.log('Nope, try again.')
}

askQuestion(question, onAnswer)
*/
function askQuestion(question, onAnswer, io) {

  if( ! io) io = rl.createInterface({input:process.stdin,output:process.stdin})

  io.resume()

  io.question(question, answer => {

    io.pause()

    // If onAnswer was passed and does not return true,
    // consider answer as invalid and ask question again:
    if(onAnswer && onAnswer(answer, question, io) !== true) {

      askQuestion(question, onAnswer, io)

    }

  })

}


/**
Perform askQuestion() over an array of questions.

@param {array}   questions    - A list of questions to ask.

@param {function} [onAnswer]  - See description of same param in askQuestion().

@param {function} [onAnswers] - Handle all answers received.
                                Gets "answers" and "io" passed.

@param {object} [io]          - In- and output-interface from readline-package.


@example
let questions = ['What can you know?', 'What should you do?', 'What may you hope?']

let onAnswers = answers => console.log('Thanks! Your answers are:', answers)

askQuestions(questions, onAnswers)

@example
// As example above, adding validation for each answer.
let onAnswer = (answer, question) {
  if(question == 'What can you know?' && answer != 'Nothing') return false
  return true
}

askQuestions(questions, onAnswers, onAnswer)
*/
function askQuestions(questions, onAnswers, onAnswer, io) {

  if(! onAnswers && ! onAnswer) {
    console.log(`
      Info: No answer-handlers were specified, all input is lost in space.
    `)
  }

  let answers = []

  let i = 0

  let onAnswerXt = (answer, question, io) => {

    if( ! onAnswer || onAnswer(answer, question, io) === true) {

      answers.push(answer)

      if(i < questions.length-1) {

        i += 1

        askQuestion(questions[i], onAnswerXt, io)

      }

      else {

        if(onAnswers) onAnswers(answers, io)

        io.close()

        return // end loop

      }

      return true

    }

    return false

  } 

  askQuestion(questions[i], onAnswerXt, io) // start loop

}


module.exports = {
  askQuestion: askQuestion,
  askQuestions: askQuestions
}
