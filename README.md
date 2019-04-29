commandline-ui
==============

A Node.js-package for asking users questions on the commandline.


What
----

A lightweight wrapper for using 'readline' of Node.js, no dependencies.


Why
---

- Took a while to figure out how to chain multiple questions with 'readline'.

- There a more sophisticated packages for this purpose,
  but we want to keep it simple, tilda.



How
---

After installing this package in one of yours, write into e.g. index.js:


    // Import function:
    var askQuestions = require('commandline-ui').askQuestions

    // Preparate arguments. First off the questions:
    var questions = ['What', 'Why', 'How']

    // And an answers-handler to proceed with the retrieved answers:
    var onAnswers = (answers) => console.log(answers)

    // Now call the function:
    askQuestions(questions, onAnswers)


Then execute it with node from the commandline:

	node index.js

That'll walk you through the answers and display all questions afterwards.

Optionally pass a handler for each single answer, too.
It must return true, otherwise the answer is considered
to be invalid, and will be re-asked until it's valid:

    var onAnswer = (answer, question) => {
      if(question == 'What' && answer == 'Faith') return true
      if(question == 'Why'  && answer == 'Love')  return true
      if(question == 'How'  && answer == 'Hope')  return true
    }

    askQuestions(questions, onAnswers, onAnswer)



You can omit the handler for all answers, by passing a falsy value:

    askQuestions(questions, null, onAnswer)



Author
======
Ida Ebkes, 2019.


Contact
=======

For questions, suggestions and bug-reports, please open an issue on
https://github.com/ida/commandline-ui/issues


License
=======
MIT, a copy is attached.
