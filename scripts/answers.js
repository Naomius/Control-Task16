(function () {
    const Answers = {
        quiz: null,
        currentQuestIndex: 1,
        questTitleElem: null,
        optionElem: null,
        rightQuizzes: [],
        quizzes: [],
        init() {
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');
            const stringId = url.searchParams.get('answerId').split(',', 6);
            console.log(stringId)
            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);

                    } catch (e) {
                        location.href = 'index.html';
                    }

                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }

            const xhr = new XMLHttpRequest();
            const rightAnswerId = url.searchParams.get('id');
            xhr.open('GET', 'https://testologia.site/get-quiz-right?id=' + testId, false);
            xhr.send();

            if (xhr.status === 200 && xhr.responseText) {
                try {
                    this.quizzes = JSON.parse(xhr.responseText);
                    this.startQuizTest();
                } catch (e) {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
            console.log(this.quizzes)

            const prevPageBtn = document.querySelector('.answerBtn');
            prevPageBtn.onclick = function () {
                location.href = 'result.html' + location.search;
            }
        },
        startQuizTest() {
            document.getElementById('answer-title').innerText = this.quiz.name;
            this.questTitleElem = document.querySelector('.answer-question-title');
            this.optionElem = document.querySelector('.answer-question-options');

            console.log(this.quiz)
            this.showQuestions();

        },
        showQuestions() {
            // console.log(this.quiz.questions)
            this.quiz.questions.forEach((q, i)=> {
                const qWrapper = document.querySelector('.answer-wrapper');
                const questionAnswer = `<div class="answer-question" id="${q.id}">
                                           <div class="answer-question-title" id="title">
                                               <span>Вопрос ${i + 1}:</span> ${q.question}
                                           </div>
                                           <div class="answer-question-options" id="options2">
                                                ${renderAnswers(q.answers, this.quizzes, i)}
                                           </div>
                                       </div>`
                    qWrapper.innerHTML += questionAnswer;

            });


            function renderAnswers (answers, rightAnswers, questionIndex) {


            const getRadio = (answersId) => {
                let className = '';
                const radioHTML = `<input type="radio" id="${answersId}" disabled ='disabled'`;

                const isRight = rightAnswers[questionIndex] === +userAnswers[questionIndex];
                    if (+userAnswers[questionIndex] === answersId) {
                        className = isRight ? 'class="right"' : 'class="wrong"'
                    }

                return `${radioHTML}${className}>`;
            }


                const url = new URL(location.href);
                const testId = url.searchParams.get('id');
                const userAnswers = url.searchParams.get('answerId').split(',', 6);

                const result = answers.map((a) => {
                    const radioHTML = getRadio(a.id)
                    const answer = `<div class="answer-question-option">
                                        ${radioHTML}
                                        <label>${a.answer}</label>
                                    </div>`;
                    return answer;
                });

              return result.join('');
            }

        },

    }
    Answers.init();
})();

